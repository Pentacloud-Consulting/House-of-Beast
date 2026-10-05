#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import process from "node:process";
import { ROOT } from "./lib/root.mjs";

function run(cmd, args, { name }) {
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: "inherit", shell: false });
  if (r.status !== 0) {
    process.stderr.write(`\n[nexus-gate] failed: ${name}\n`);
    process.exit(r.status ?? 1);
  }
}

function main() {
  run(process.execPath, ["scripts/validate-contracts.mjs", "--strict", "--phase", "phase3"], {
    name: "validate-contracts (phase3 — all engines)"
  });
  run(process.execPath, ["scripts/plugin-health.mjs"], { name: "plugin-health (non-fatal check)" });
  run(process.execPath, ["--test"], { name: "node:test" });
  run(process.execPath, ["scripts/final-validate.mjs"], { name: "final-validate bundle" });
  process.stdout.write("\n[nexus-gate] OK\n");
}

main();

