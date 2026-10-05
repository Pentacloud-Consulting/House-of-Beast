#!/usr/bin/env node
import path from "node:path";
import process from "node:process";
import { exists, readText } from "./lib/fs.mjs";
import { parseYaml } from "./lib/yaml.mjs";
import { ROOT } from "./lib/root.mjs";

function which(cmd) {
  const exts = process.platform === "win32" ? [".cmd", ".exe", ".bat", ""] : [""];
  for (const p of (process.env.PATH || "").split(path.delimiter)) {
    for (const ext of exts) {
      const full = path.join(p, cmd + ext);
      if (exists(full)) return full;
    }
  }
  return null;
}

function main() {
  const regPath = path.join(ROOT, "plugin-registry.yaml.example");
  const y = parseYaml(readText(regPath), { filename: regPath });
  const plugins = y.plugins || {};
  const out = { checkedAt: new Date().toISOString(), plugins: {} };

  for (const [name, meta] of Object.entries(plugins)) {
    const enabled = true;
    let status = "missing";
    let detail = "";
    if (meta.kind === "npm") {
      const npm = which("npm");
      if (!npm) {
        status = "missing";
        detail = "Missing npm on PATH";
      } else if (meta.commands && Object.keys(meta.commands).length) {
        const anyCmd = Object.values(meta.commands)[0];
        const found = which(anyCmd);
        if (found) status = "ok";
        else {
          status = "missing";
          detail = `Missing npm command: ${anyCmd}`;
        }
      } else {
        status = "ok";
        detail = "npm present; command-level checks deferred";
      }
    } else if (meta.kind === "pip") {
      // For Phase 1 we only detect presence of python.
      const py = which("python");
      if (py) status = "ok";
      else detail = "Missing python on PATH (required for pip plugin)";
    } else {
      detail = "Unknown plugin kind";
    }
    out.plugins[name] = { enabled, status, detail: detail || undefined };
  }

  process.stdout.write(JSON.stringify(out, null, 2) + "\n");
}

main();

