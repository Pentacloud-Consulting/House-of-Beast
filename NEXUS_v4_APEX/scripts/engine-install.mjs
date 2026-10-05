#!/usr/bin/env node
/**
 * Enables an engine in local overlay (additive to nexus.installed.yaml.example).
 * Writes `.nexus/engine-overlay.yaml` (merge-friendly).
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROOT } from "./lib/root.mjs";
import { parseYaml, stringifyYaml } from "./lib/yaml.mjs";

const id = process.argv[2];
if (!id || id.startsWith("-")) {
  process.stderr.write("usage: node scripts/engine-install.mjs <ENGINE_ID>\n");
  process.exit(2);
}

const outDir = path.join(ROOT, ".nexus");
const outFile = path.join(outDir, "engine-overlay.yaml");
fs.mkdirSync(outDir, { recursive: true });

let doc = { include: [], exclude: [] };
if (fs.existsSync(outFile)) {
  try {
    doc = parseYaml(fs.readFileSync(outFile, "utf8"), { filename: outFile });
  } catch {
    /* fresh */
  }
}
doc.include = Array.isArray(doc.include) ? doc.include : [];
if (!doc.include.includes(id)) doc.include.push(id);
doc.include.sort();

fs.writeFileSync(outFile, stringifyYaml(doc), "utf8");
process.stdout.write(`engine-overlay updated: ${path.relative(ROOT, outFile)}\nincluded: ${id}\n`);
