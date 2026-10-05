#!/usr/bin/env node
/**
 * Code-review-graph adapter (innovation #22) — plugin path + native fallback.
 *
 * Env:
 *   CGR_COMMAND  — explicit CLI (default: `cgr`). If absent or non-zero exit, falls back.
 *   CGR_DISABLE=1 — skip plugin, use native-lite only.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "../../scripts/lib/root.mjs";

/**
 * Native-lite blast radius: delegate to scripts/graph.mjs (same directory heuristic).
 * @param {string} relToRoot — path relative to NEXUS_v4_APEX root
 */
export function nativeBlastRadius(relToRoot) {
  const graphScript = path.join(ROOT, "scripts", "graph.mjs");
  const r = spawnSync(process.execPath, [graphScript, relToRoot], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024
  });
  if (r.status !== 0) {
    return { ok: false, source: "native-lite", error: r.stderr?.slice(0, 500) || "graph failed" };
  }
  try {
    return { ok: true, source: "native-lite", data: JSON.parse(r.stdout) };
  } catch {
    return { ok: false, source: "native-lite", error: "invalid JSON from graph.mjs" };
  }
}

/**
 * Try optional CGR / user command, then native-lite.
 */
export function analyzeFile(relToRoot) {
  if (process.env.CGR_DISABLE === "1") {
    return nativeBlastRadius(relToRoot);
  }
  const cmd = process.env.CGR_COMMAND || "cgr";
  const r = spawnSync(cmd, ["blast-radius", relToRoot], {
    cwd: ROOT,
    encoding: "utf8",
    shell: true,
    timeout: 15_000
  });
  if (!r.error && r.status === 0 && r.stdout?.trim()) {
    try {
      return { ok: true, source: "plugin", pluginCommand: cmd, data: JSON.parse(r.stdout) };
    } catch {
      /* fall through */
    }
  }
  return nativeBlastRadius(relToRoot);
}

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  const rel = process.argv[2] || "README.md";
  const out = analyzeFile(rel);
  process.stdout.write(JSON.stringify(out, null, 2) + "\n");
}
