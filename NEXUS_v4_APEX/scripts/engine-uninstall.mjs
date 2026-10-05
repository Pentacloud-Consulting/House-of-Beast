#!/usr/bin/env node
/**
 * Disables an engine in local overlay (does not delete engine folder).
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROOT } from "./lib/root.mjs";
import { parseYaml, stringifyYaml } from "./lib/yaml.mjs";

const id = process.argv[2];
if (!id || id.startsWith("-")) {
  process.stderr.write("usage: node scripts/engine-uninstall.mjs <ENGINE_ID>\n");
  process.exit(2);
}

const outFile = path.join(ROOT, ".nexus", "engine-overlay.yaml");
if (!fs.existsSync(outFile)) {
  process.stdout.write("no engine-overlay.yaml yet — nothing to remove.\n");
  process.exit(0);
}

const doc = parseYaml(fs.readFileSync(outFile, "utf8"), { filename: outFile });
doc.include = (Array.isArray(doc.include) ? doc.include : []).filter((x) => x !== id);
doc.exclude = Array.isArray(doc.exclude) ? doc.exclude : [];
if (!doc.exclude.includes(id)) doc.exclude.push(id);
doc.exclude.sort();

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, stringifyYaml(doc), "utf8");
process.stdout.write(`removed from include / added to exclude: ${id}\n`);
