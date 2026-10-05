#!/usr/bin/env node
/**
 * Shows contract-chain edges involving one engine (Pass 1: emit→consume contract graph).
 */
import { execFileSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { ROOT } from "./lib/root.mjs";

function parseArgs(argv) {
  let engine = null;
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--engine") engine = String(argv[++i] || "");
    else if (!argv[i].startsWith("-") && !engine) engine = argv[i];
  }
  return engine;
}

const engine = parseArgs(process.argv);
const script = path.join(ROOT, "scripts", "contract-chain.mjs");
const out = execFileSync(process.execPath, [script], { encoding: "utf8", cwd: ROOT });
const chain = JSON.parse(out);
const edges = chain.edges || [];
if (!engine) {
  process.stdout.write(JSON.stringify({ edges, note: "pass --engine <ID> to filter" }, null, 2) + "\n");
  process.exit(0);
}
const filtered = edges.filter((e) => e[0] === engine || e[1] === engine);
process.stdout.write(JSON.stringify({ engine, edges: filtered, missingProducers: chain.missingProducers }, null, 2) + "\n");
