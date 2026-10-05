#!/usr/bin/env node
// Minimal token audit: counts characters and rough token estimate (chars/4).
import path from "node:path";
import process from "node:process";
import { discoverEngines } from "./lib/engine-discovery.mjs";
import { exists, posixPath, readText } from "./lib/fs.mjs";
import { ROOT } from "./lib/root.mjs";

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

function loadBudget(engineDir) {
  const p = path.join(engineDir, "_genome.yaml");
  if (!exists(p)) return null;
  const txt = readText(p);
  const m = txt.match(/tokenBudget:\s*(\d+)/);
  return m ? Number(m[1]) : null;
}

function main() {
  const engines = discoverEngines({ rootDir: ROOT });
  const rows = [];
  for (const e of engines) {
    const skill = path.join(e.dir, "SKILL.md");
    if (!exists(skill)) continue;
    const content = readText(skill);
    const est = estimateTokens(content);
    const budget = loadBudget(e.dir);
    rows.push({ engine: e.name, estTokens: est, budget: budget ?? "n/a", file: posixPath(path.relative(ROOT, skill)) });
  }
  rows.sort((a, b) => String(a.engine).localeCompare(String(b.engine)));
  for (const r of rows) {
    process.stdout.write(`${r.engine}\t${r.estTokens}\tbudget=${r.budget}\t${r.file}\n`);
  }
}

main();

