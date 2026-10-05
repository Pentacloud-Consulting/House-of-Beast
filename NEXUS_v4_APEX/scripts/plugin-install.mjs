#!/usr/bin/env node
/**
 * Records intended plugin activation in `.nexus/plugin-overlay.yaml`.
 * Does not run npm install — shows install hint from plugin-registry.yaml.example.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROOT } from "./lib/root.mjs";
import { parseYaml, stringifyYaml } from "./lib/yaml.mjs";

const pluginId = process.argv[2];
if (!pluginId) {
  process.stderr.write("usage: node scripts/plugin-install.mjs <plugin-key>\nExample keys: caveman | codeReviewGraph | claudeCapsuleKit\n");
  process.exit(2);
}

const regPath = path.join(ROOT, "plugin-registry.yaml.example");
const reg = parseYaml(fs.readFileSync(regPath, "utf8"), { filename: regPath });
const entry = reg.plugins?.[pluginId];
if (!entry) {
  process.stderr.write(`unknown plugin key: ${pluginId}\nsee plugin-registry.yaml.example\n`);
  process.exit(1);
}

const outDir = path.join(ROOT, ".nexus");
const outFile = path.join(outDir, "plugin-overlay.yaml");
fs.mkdirSync(outDir, { recursive: true });

let doc = { enabled: {} };
if (fs.existsSync(outFile)) {
  try {
    doc = parseYaml(fs.readFileSync(outFile, "utf8"), { filename: outFile });
  } catch {
    /* fresh */
  }
}
doc.enabled = doc.enabled && typeof doc.enabled === "object" ? doc.enabled : {};
doc.enabled[pluginId] = true;

fs.writeFileSync(outFile, stringifyYaml(doc), "utf8");
process.stdout.write(`recorded in ${path.relative(ROOT, outFile)}\n`);
process.stdout.write(`hint: install tool per 0P_PLUGINS / plugin-registry — kind: ${entry.kind || "npm"}\n`);
