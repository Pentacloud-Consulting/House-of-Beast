#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { parseYaml } from "./lib/yaml.mjs";
import { ROOT } from "./lib/root.mjs";

const p = path.join(ROOT, "0H_HERMES", "contracts", "improvement-proposals.yaml");
let items = [];
if (fs.existsSync(p)) items = parseYaml(fs.readFileSync(p, "utf8"), { filename: p }) ?? [];

process.stdout.write(
  JSON.stringify({
    proposals: Array.isArray(items) ? items : [],
    menu: "[a] Approve  [e] Edit  [s] Skip  [r] Reject  [d] Discuss",
    apply: "node scripts/hermes-apply.mjs <proposal-id>"
  },
  null,
  2) + "\n"
);
