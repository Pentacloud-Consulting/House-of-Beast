#!/usr/bin/env node
/**
 * Phase 7 session manifest emission (minimal deterministic implementation).
 *
 * Inputs:
 * - free-text query via argv
 *
 * Outputs:
 * - `.nexus/.nexus-session.md` (manifest)
 * - `.nexus/contract-chain.json` (via contract-chain)
 * - `.nexus/maturity-snapshot.json` (via score-maturity)
 */
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { ROOT } from "./lib/root.mjs";
import { writeText } from "./lib/fs.mjs";

function nowIso() {
  return new Date().toISOString();
}

const query = process.argv.slice(2).join(" ").trim() || "<no-query-provided>";

const nodePath = process.execPath;
function runJson(scriptRel, args = []) {
  const script = path.join(ROOT, scriptRel);
  const out = execFileSync(nodePath, [script, ...args], { encoding: "utf8" });
  return JSON.parse(out);
}

const maturity = runJson("scripts/score-maturity.mjs");
const complexity = runJson("scripts/score-complexity.mjs", [query]);
const chain = runJson("scripts/contract-chain.mjs");

function tokenEstimate({ maturitySnap, chainDag, suggestedMode }) {
  const byEngine = maturitySnap.byEngine || {};
  // Very rough: use 0-10 maturity score to scale a base cost per engine.
  // Suggested mode inflates cost: lite=1, pro=1.8, apex=3
  const mult = suggestedMode === "lite" ? 1 : suggestedMode === "pro" ? 1.8 : 3;
  const engines = chainDag.selectedEngines || [];
  let base = 0;
  for (const e of engines) {
    const m = typeof byEngine[e] === "number" ? byEngine[e] : 5;
    base += 80 + (10 - m) * 10; // lower maturity → higher read/verification cost
  }
  return Math.round(base * mult);
}

function mermaidDag(chainDag) {
  const lines = ["graph TD"];
  for (const [from, to] of chainDag.edges.map((e) => [e[0], e[1]])) lines.push(`  ${from}-->${to}`);
  return lines.join("\n");
}

const estTokens = tokenEstimate({ maturitySnap: maturity, chainDag: chain, suggestedMode: complexity.suggestedMode });

const manifest = `## Session Manifest — ${nowIso()}

### Request
${query}

### Maturity heat-map (0–10)
\`\`\`json
${JSON.stringify(maturity.byLayer, null, 2)}
\`\`\`

### Complexity score + suggested mode
\`\`\`json
${JSON.stringify(complexity, null, 2)}
\`\`\`

### Contract Chain DAG (edges)
\`\`\`mermaid
${mermaidDag(chain)}
\`\`\`

### Estimated token cost
~${estTokens} tokens (rough estimate)
`;

const outPath = path.join(ROOT, ".nexus", ".nexus-session.md");
writeText(outPath, manifest);
process.stdout.write(outPath + "\n");
