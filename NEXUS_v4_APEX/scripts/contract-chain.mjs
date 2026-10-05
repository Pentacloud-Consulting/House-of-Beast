#!/usr/bin/env node
/**
 * Contract chain builder (Phase 6).
 * Builds emit→consume DAG across selected engines.
 *
 * - Orphans: contracts emitted but never consumed → WARN
 * - Missing producers: contracts consumed but never emitted → FAIL
 */
import path from "node:path";
import process from "node:process";
import { discoverEngines } from "./lib/engine-discovery.mjs";
import { readText, writeText } from "./lib/fs.mjs";
import { parseYaml } from "./lib/yaml.mjs";
import { ROOT } from "./lib/root.mjs";

function parseArgs(argv) {
  const out = { engines: null, out: path.join(ROOT, ".nexus", "contract-chain.json") };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--engines") out.engines = String(argv[++i] || "").split(",").filter(Boolean);
    else if (a === "--out") out.out = path.resolve(ROOT, String(argv[++i] || ""));
  }
  return out;
}

function topoSort(nodes, edges) {
  const indeg = new Map(nodes.map((n) => [n, 0]));
  const adj = new Map(nodes.map((n) => [n, []]));
  for (const [a, b] of edges) {
    if (!adj.has(a)) adj.set(a, []);
    adj.get(a).push(b);
    indeg.set(b, (indeg.get(b) || 0) + 1);
  }
  const q = [];
  for (const [n, d] of indeg.entries()) if (d === 0) q.push(n);
  q.sort();
  const out = [];
  while (q.length) {
    const n = q.shift();
    out.push(n);
    for (const m of adj.get(n) || []) {
      indeg.set(m, indeg.get(m) - 1);
      if (indeg.get(m) === 0) {
        q.push(m);
        q.sort();
      }
    }
  }
  return out.length === nodes.length ? out : null;
}

const args = parseArgs(process.argv);
const all = discoverEngines({ rootDir: ROOT });
const selected = args.engines ? all.filter((e) => args.engines.includes(e.name)) : all;

const genomes = {};
for (const e of selected) {
  const genomePath = path.join(e.dir, "_genome.yaml");
  const genome = parseYaml(readText(genomePath), { filename: genomePath });
  genomes[e.name] = genome;
}

const emittedBy = new Map(); // contract -> engine
const consumedBy = new Map(); // contract -> set(engines)
for (const [engine, g] of Object.entries(genomes)) {
  for (const o of g.outputs || []) {
    const c = o.contract;
    if (!c) continue;
    if (!emittedBy.has(c)) emittedBy.set(c, new Set());
    emittedBy.get(c).add(engine);
  }
  for (const i of g.inputs || []) {
    const c = i.contract;
    if (!c) continue;
    if (!consumedBy.has(c)) consumedBy.set(c, new Set());
    consumedBy.get(c).add(engine);
  }
}

const missingProducers = [];
for (const [c, engines] of consumedBy.entries()) {
  if (!emittedBy.has(c)) missingProducers.push({ contract: c, consumedBy: [...engines].sort() });
}

const orphans = [];
for (const [c, engines] of emittedBy.entries()) {
  if (!consumedBy.has(c)) orphans.push({ contract: c, emittedBy: [...engines].sort() });
}

const edges = [];
for (const [contract, producers] of emittedBy.entries()) {
  const consumers = consumedBy.get(contract);
  if (!consumers) continue;
  for (const p of producers) for (const c of consumers) edges.push([p, c, contract]);
}

const nodes = Object.keys(genomes).sort();
const edgePairs = edges.map(([a, b]) => [a, b]);
const order = topoSort(nodes, edgePairs);

const dag = {
  note: "contract-chain",
  selectedEngines: nodes,
  order,
  edges,
  orphans,
  missingProducers
};

writeText(args.out, JSON.stringify(dag, null, 2) + "\n");
process.stdout.write(JSON.stringify(dag, null, 2) + "\n");

if (missingProducers.length) process.exitCode = 2;
