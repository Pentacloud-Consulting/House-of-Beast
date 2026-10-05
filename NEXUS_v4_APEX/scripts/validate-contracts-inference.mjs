#!/usr/bin/env node
/**
 * Innovation #26 — Pass 2 (inference / heuristic rules).
 * Complements deterministic validate-contracts.mjs; does not replace it.
 */
import path from "node:path";
import process from "node:process";
import { discoverEngines } from "./lib/engine-discovery.mjs";
import { exists, posixPath, readText } from "./lib/fs.mjs";
import { parseYaml } from "./lib/yaml.mjs";
import { ROOT } from "./lib/root.mjs";

function parseArgs(argv) {
  const args = { strict: false, json: false };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--strict") args.strict = true;
    else if (argv[i] === "--json") args.json = true;
  }
  return args;
}

function severityRank(s) {
  return { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }[s] ?? 0;
}

/** @type {{ rule: string, severity: string, engine: string, detail: string, fix?: string }[]} */
const findings = [];

function add(f) {
  findings.push(f);
}

function runInference({ engine, rootDir }) {
  const rel = (p) => posixPath(path.relative(rootDir, p));
  const skillPath = path.join(engine.dir, "SKILL.md");
  if (exists(skillPath)) {
    const txt = readText(skillPath);
    if (!/^---\r?\n/.test(txt)) {
      add({
        rule: "INF-SKILL-01",
        severity: "MEDIUM",
        engine: engine.name,
        detail: "SKILL.md should start with YAML frontmatter (---)",
        fix: "Add --- name / description block at top of SKILL.md"
      });
    }
    if (!/\bname\s*:/i.test(txt.slice(0, 400))) {
      add({
        rule: "INF-SKILL-02",
        severity: "MEDIUM",
        engine: engine.name,
        detail: "SKILL.md frontmatter likely missing `name:`",
        fix: "Add name: under frontmatter"
      });
    }
  }

  const genomePath = path.join(engine.dir, "_genome.yaml");
  if (!exists(genomePath)) return;
  let g;
  try {
    g = parseYaml(readText(genomePath), { filename: genomePath });
  } catch (e) {
    add({
      rule: "INF-GENOME-01",
      severity: "HIGH",
      engine: engine.name,
      detail: `_genome.yaml parse error: ${e?.message || e}`,
      fix: "Fix YAML syntax"
    });
    return;
  }

  for (const inp of g.inputs || []) {
    if (!inp?.id || !inp?.contract) {
      add({
        rule: "INF-INPUT-01",
        severity: "HIGH",
        engine: engine.name,
        detail: "Each genome input must have id + contract",
        fix: "Add id and contract to _genome.yaml inputs"
      });
      break;
    }
  }
  for (const out of g.outputs || []) {
    if (!out?.id || !out?.contract) {
      add({
        rule: "INF-OUTPUT-01",
        severity: "HIGH",
        engine: engine.name,
        detail: "Each genome output must have id + contract",
        fix: "Add id and contract to _genome.yaml outputs"
      });
      break;
    }
  }

  const tb = g.tokenBudget;
  if (typeof tb !== "number" || tb < 1 || tb > 2000) {
    add({
      rule: "INF-TOKEN-01",
      severity: "MEDIUM",
      engine: engine.name,
      detail: `tokenBudget should be a number 1..2000 (got ${tb})`,
      fix: "Set tokenBudget in _genome.yaml"
    });
  }
}

function main() {
  const args = parseArgs(process.argv);
  const engines = discoverEngines({ rootDir: ROOT });
  const emitters = new Map();

  for (const e of engines) runInference({ engine: e, rootDir: ROOT });

  for (const e of engines) {
    const genomePath = path.join(e.dir, "_genome.yaml");
    if (!exists(genomePath)) continue;
    let g;
    try {
      g = parseYaml(readText(genomePath), { filename: genomePath });
    } catch {
      continue;
    }
    for (const out of g.outputs || []) {
      const c = out?.contract;
      if (typeof c !== "string" || !c.includes("/")) continue;
      if (!emitters.has(c)) emitters.set(c, []);
      emitters.get(c).push(e.name);
    }
  }

  /** Intentional shared schema emits (META + MEMORY) — not a design error. */
  const sharedEmitOk = new Set(["00_CORE/contracts/decision-log.schema.json"]);

  for (const [contractPath, names] of emitters.entries()) {
    if (names.length > 1 && !sharedEmitOk.has(contractPath)) {
      add({
        rule: "INF-DUP-EMIT-01",
        severity: "HIGH",
        engine: names.join(", "),
        detail: `Same contract emitted by multiple engines: ${contractPath} -> ${names.join(", ")}`,
        fix: "Deduplicate contract ownership or merge engines (design choice)"
      });
    }
  }

  const worst = findings.reduce((w, f) => Math.max(w, severityRank(f.severity)), 0);

  if (args.json) {
    process.stdout.write(
      JSON.stringify(
        { pass: "inference", root: posixPath(ROOT), findings, count: findings.length },
        null,
        2
      ) + "\n"
    );
  } else {
    if (!findings.length) process.stdout.write("No inference findings.\n");
    else {
      for (const f of findings) {
        process.stdout.write(`[${f.severity}] ${f.rule} (${f.engine})\n  ${f.detail}\n`);
      }
    }
  }

  if (args.strict && worst >= severityRank("HIGH")) process.exit(1);
}

try {
  main();
} catch (e) {
  console.error(e?.stack || String(e));
  process.exit(1);
}
