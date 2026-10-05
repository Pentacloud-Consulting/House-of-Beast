#!/usr/bin/env node
/**
 * Thin wrapper: emits plugin-registry.yaml.example parsed keys (Phase 3).
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { parseYaml } from "./lib/yaml.mjs";
import { ROOT } from "./lib/root.mjs";

const reg = path.join(ROOT, "plugin-registry.yaml.example");
const doc = parseYaml(fs.readFileSync(reg, "utf8"), { filename: reg });
for (const name of Object.keys(doc.plugins ?? {})) {
  process.stdout.write(name + "\n");
}
