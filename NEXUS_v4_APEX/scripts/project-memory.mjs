#!/usr/bin/env node
// Phase 1 minimal memory command: validate that nexus.project.yaml.example matches schema.
import path from "node:path";
import process from "node:process";
import { readFileSync } from "node:fs";
import { parseYaml } from "./lib/yaml.mjs";
import { ROOT } from "./lib/root.mjs";

function main() {
  const p = path.join(ROOT, "nexus.project.yaml.example");
  const obj = parseYaml(readFileSync(p, "utf8"), { filename: p });
  process.stdout.write(JSON.stringify({ ok: true, file: p, project: obj.project?.name ?? null }, null, 2) + "\n");
}

main();

