#!/usr/bin/env node
/**
 * Innovation #27 stub: verifies native-lite compress is idempotent on stdin.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const file = process.argv[2];
if (!file) {
  process.stderr.write("usage: node scripts/round-trip-validate.mjs <file>\n");
  process.exit(2);
}
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const compressJs = path.join(scriptDir, "compress.mjs");
const abs = path.resolve(file);
const before = fs.readFileSync(abs, "utf8");
const once = spawnSync(process.execPath, [compressJs], { input: before, encoding: "utf8" });
if (once.status !== 0) process.exit(1);
const twice = spawnSync(process.execPath, [compressJs], { input: once.stdout, encoding: "utf8" });
if (twice.stdout !== once.stdout) {
  process.stderr.write("Compress not idempotent.\n");
  process.exit(1);
}
process.stdout.write(JSON.stringify({ ok: true, note: "idempotent-lite compress" }) + "\n");
