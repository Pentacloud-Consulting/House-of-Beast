#!/usr/bin/env node
/**
 * Maturity heat-map (innovation #12)
 * Deterministic, filesystem-driven snapshot. Produces a layer + engine view.
 */
import path from "node:path";
import process from "node:process";
import { discoverEngines } from "./lib/engine-discovery.mjs";
import { exists, writeText } from "./lib/fs.mjs";
import { ROOT } from "./lib/root.mjs";

function hasAnyTemplate(dir) {
  // README.md exists everywhere; require at least one non-README template
  return (
    exists(path.join(dir, "templates", "README.md")) &&
    (exists(path.join(dir, "templates", "template.md")) ||
      exists(path.join(dir, "templates", "template.json")) ||
      exists(path.join(dir, "templates", "template.yaml")) ||
      exists(path.join(dir, "templates", "template.yml")) ||
      exists(path.join(dir, "templates", "template.txt")))
  );
}

const engines = discoverEngines({ rootDir: ROOT });
const byEngine = {};
for (const e of engines) {
  let s = 0;
  if (exists(path.join(e.dir, "_genome.yaml"))) s += 2;
  if (exists(path.join(e.dir, "_capability.yaml"))) s += 1;
  if (exists(path.join(e.dir, "customize.yaml"))) s += 1;
  if (exists(path.join(e.dir, "resources", "failure-modes.md"))) s += 2;
  if (exists(path.join(e.dir, "resources", "anti-patterns.md"))) s += 2;
  if (hasAnyTemplate(e.dir)) s += 2;
  byEngine[e.name] = Math.min(10, s);
}

const layers = {
  meta: ["00_CORE", "0A_ANTISLOP", "0H_HERMES", "0P_PLUGINS"],
  intelligence: ["01_FORGE", "02_INSIGHT"],
  designSystem: ["03_PALETTE", "04_TYPE", "05_MOTION"],
  interface: ["06_LAYOUT", "07_COMPONENTS", "08_A11Y"],
  engine: ["09_BUILD", "10_API", "11_DATA", "12_SYNC", "13_AI", "14_EVAL"],
  hardening: ["15_SECURE", "16_PERFORM", "17_GOVERN", "18_TEST"],
  delivery: ["19_SHIP", "20_OBSERVE"],
  growth: ["21_SEO", "22_GEO"],
  operator: ["91_PORTFOLIO", "92_FREELANCE", "93_MOBILE"]
};

function avg(ids) {
  const vals = ids.map((id) => byEngine[id]).filter((v) => typeof v === "number");
  if (!vals.length) return 0;
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}

const byLayer = {};
for (const [k, ids] of Object.entries(layers)) byLayer[k] = avg(ids);

const snapshot = {
  note: "maturity-snapshot",
  scale: "0-10",
  byLayer,
  byEngine,
  rubricPath: "00_CORE/resources/maturity-rubric.md"
};

// Write to .nexus/ for persistence; still print to stdout for CLI use.
const outPath = path.join(ROOT, ".nexus", "maturity-snapshot.json");
await writeText(outPath, JSON.stringify(snapshot, null, 2) + "\n");
process.stdout.write(JSON.stringify(snapshot, null, 2) + "\n");
