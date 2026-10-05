#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { parseYaml } from "./lib/yaml.mjs";
import { ROOT } from "./lib/root.mjs";

const p = path.join(ROOT, "0H_HERMES", "contracts", "effectiveness-tracker.yaml");
const doc = fs.existsSync(p) ? parseYaml(fs.readFileSync(p, "utf8"), { filename: p }) : [];
process.stdout.write(JSON.stringify({ tracked: doc }, null, 2) + "\n");
