#!/usr/bin/env node
/**
 * Phase 3 "validate" bundle (deterministic).
 * Intended to be run by `nexus-gate` as the last step.
 */
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { discoverEngines } from "./lib/engine-discovery.mjs";
import { exists, listFilesRecursive } from "./lib/fs.mjs";
import { ROOT } from "./lib/root.mjs";

function run(cmd, args, name) {
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: "inherit", shell: false });
  if (r.status !== 0) {
    process.stderr.write(`\n[final-validate] failed: ${name}\n`);
    process.exit(r.status ?? 1);
  }
}

function hasNonReadmeTemplate(engineDir) {
  const tdir = path.join(engineDir, "templates");
  if (!exists(tdir)) return false;
  const files = listFilesRecursive(tdir)
    .map((p) => path.basename(p))
    .filter((f) => f && f !== "README.md");
  return files.length > 0;
}

function checkEngineFootprints() {
  const engines = discoverEngines({ rootDir: ROOT });
  const missing = [];
  for (const e of engines) {
    const req = [
      path.join(e.dir, "resources", "failure-modes.md"),
      path.join(e.dir, "resources", "anti-patterns.md"),
      path.join(e.dir, "customize.yaml")
    ];
    for (const p of req) if (!exists(p)) missing.push(path.relative(ROOT, p));
    if (!hasNonReadmeTemplate(e.dir)) missing.push(path.relative(ROOT, path.join(e.dir, "templates")) + " (no non-README template)");
  }
  if (missing.length) {
    process.stderr.write("[final-validate] missing required engine footprint items:\n" + missing.map((m) => `- ${m}`).join("\n") + "\n");
    process.exit(2);
  }
}

checkEngineFootprints();
run(process.execPath, ["scripts/validate-contracts.mjs", "--strict", "--phase", "phase3"], "validate-contracts");
run(process.execPath, ["scripts/validate-contracts-inference.mjs", "--strict"], "validate-contracts-inference");
run(process.execPath, ["scripts/contract-chain.mjs"], "contract-chain (no missing producers)");
run(process.execPath, ["--test"], "node --test (full suite)");
process.stdout.write("[final-validate] OK\n");

