#!/usr/bin/env node
/**
 * Human-readable summary of _genome.yaml + _capability.yaml.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { parseYaml } from "./lib/yaml.mjs";
import { ROOT } from "./lib/root.mjs";

const id = process.argv[2];
if (!id) {
  process.stderr.write("usage: node scripts/engine-describe.mjs <ENGINE_ID>\n");
  process.exit(2);
}

const dir = path.join(ROOT, id);
const gPath = path.join(dir, "_genome.yaml");
const cPath = path.join(dir, "_capability.yaml");
if (!fs.existsSync(gPath)) {
  process.stderr.write(`unknown engine or missing _genome: ${id}\n`);
  process.exit(1);
}

const genome = parseYaml(fs.readFileSync(gPath, "utf8"), { filename: gPath });
let capability = null;
if (fs.existsSync(cPath)) {
  capability = parseYaml(fs.readFileSync(cPath, "utf8"), { filename: cPath });
}

process.stdout.write(
  JSON.stringify({ engine: id, genome, capability }, null, 2) + "\n"
);
