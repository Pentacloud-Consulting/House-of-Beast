#!/usr/bin/env node
import path from "node:path";
import process from "node:process";
import { discoverEngines } from "./lib/engine-discovery.mjs";
import { exists, listFilesRecursive, posixPath, readText } from "./lib/fs.mjs";
import { ROOT } from "./lib/root.mjs";

function parseArgs(argv) {
  const args = { strict: false, json: false, engine: null, phase: "phase1", requireFull: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--strict") args.strict = true;
    else if (a === "--json") args.json = true;
    else if (a === "--phase") args.phase = argv[++i] ?? args.phase;
    else if (a === "--require-full") args.requireFull.push(argv[++i]);
    else if (!a.startsWith("-") && !args.engine) args.engine = a;
  }
  return args;
}

function addFinding(findings, f) {
  findings.push({
    rule: f.rule,
    severity: f.severity,
    file: f.file,
    detail: f.detail,
    fix: f.fix ?? null
  });
}

function severityRank(s) {
  return { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }[s] ?? 0;
}

function runDeterministicChecks({ engine, rootDir, requireFull }) {
  const findings = [];
  const requireAll = requireFull.has(engine.name);
  const requiredFiles = requireAll
    ? ["SKILL.md", "_genome.yaml", "_capability.yaml", "customize.yaml"]
    : ["SKILL.md"];
  for (const rf of requiredFiles) {
    const p = path.join(engine.dir, rf);
    if (!exists(p)) {
      addFinding(findings, {
        rule: "CONTRACT-01",
        severity: "CRITICAL",
        file: posixPath(path.relative(rootDir, engine.dir)),
        detail: `Missing required file: ${rf}`,
        fix: `Add ${rf} to ${engine.name}/`
      });
    }
  }

  // PATH-05: no cross-engine internal file references: forbid "../<ENGINE>/" patterns.
  // This is a deterministic safety net; it intentionally errs on the strict side.
  const allTextFiles = listFilesRecursive(engine.dir).filter((p) =>
    /\.(md|yaml|yml|json|mjs|ts|tsx|js)$/.test(p)
  );
  const crossEngineRegex = /\.\.\/(0A_ANTISLOP|0H_HERMES|0P_PLUGINS|00_CORE|0\d_|1\d_|2\d_|3\d_|4\d_|5\d_|6\d_|7\d_|8\d_|9\d_)/g;
  for (const fp of allTextFiles) {
    const rel = posixPath(path.relative(rootDir, fp));
    const txt = readText(fp);
    const m = txt.match(crossEngineRegex);
    if (m) {
      addFinding(findings, {
        rule: "PATH-05",
        severity: "HIGH",
        file: rel,
        detail: `Cross-engine internal path reference(s) detected: ${Array.from(new Set(m)).join(", ")}`,
        fix: "Replace with engine invocation via 00_CORE or move shared exemplar into _style-reference/"
      });
    }
  }

  // REF-03: invoke language only — forbid "read <engine>" / "follow <engine>" / "execute <engine>" phrases.
  const invokeBad = /\b(read|follow|execute)\s+`?(00_CORE|0A_ANTISLOP|0H_HERMES|0P_PLUGINS|0[1-9]_[A-Z0-9_]+|1[0-9]_[A-Z0-9_]+|2[0-2]_[A-Z0-9_]+|9[0-3]_[A-Z0-9_]+)`?\b/gi;
  const skillPath = path.join(engine.dir, "SKILL.md");
  if (exists(skillPath)) {
    const txt = readText(skillPath);
    if (invokeBad.test(txt)) {
      addFinding(findings, {
        rule: "REF-03",
        severity: "HIGH",
        file: posixPath(path.relative(rootDir, skillPath)),
        detail: "Found forbidden invocation language (read/follow/execute). Use 'invoke' language.",
        fix: "Replace with 'invoke <engine>'"
      });
    }
  }

  // CONTRACT-REF: referenced contract files in _genome.yaml must exist (deterministic).
  if (requireAll) {
    const genomePath = path.join(engine.dir, "_genome.yaml");
    if (exists(genomePath)) {
      const txt = readText(genomePath);
      const contractLines = [...txt.matchAll(/^\s*contract:\s*(.+)\s*$/gm)].map((m) => m[1].trim());
      for (const ref of contractLines) {
        // Ignore non-path refs
        if (!ref.includes("/")) continue;
        const fp = path.join(rootDir, ref);
        if (!exists(fp)) {
          addFinding(findings, {
            rule: "CONTRACT-REF-01",
            severity: "CRITICAL",
            file: posixPath(path.relative(rootDir, genomePath)),
            detail: `Referenced contract missing: ${ref}`,
            fix: `Create ${ref} or fix the contract reference`
          });
        }
      }
    }
  }

  return findings;
}

async function main() {
  const args = parseArgs(process.argv);
  const rootDir = ROOT;
  const engines = discoverEngines({ rootDir });
  const targetEngines = args.engine ? engines.filter((e) => e.name === args.engine) : engines;
  const requireFull = new Set(
    (args.requireFull.length
      ? args.requireFull
      : args.phase === "phase2" || args.phase === "phase3"
        ? engines.map((e) => e.name)
        : ["00_CORE", "0A_ANTISLOP", "0H_HERMES", "0P_PLUGINS", "90_MEMORY", "03_PALETTE"]
    ).filter(Boolean)
  );

  const report = [];
  for (const engine of targetEngines) {
    const findings = runDeterministicChecks({ engine, rootDir, requireFull });
    const summary = findings.reduce(
      (acc, f) => ((acc[f.severity] = (acc[f.severity] ?? 0) + 1), acc),
      { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 }
    );
    report.push({
      engine: engine.name,
      files_scanned: undefined,
      summary,
      findings
    });
  }

  const worst = report
    .flatMap((r) => r.findings)
    .reduce((w, f) => Math.max(w, severityRank(f.severity)), 0);

  if (args.json) {
    process.stdout.write(JSON.stringify({ root: posixPath(rootDir), report }, null, 2));
  } else {
    for (const r of report) {
      const count = r.findings.length;
      if (!count) continue;
      process.stdout.write(`\n[${r.engine}] findings=${count} CRIT=${r.summary.CRITICAL} HIGH=${r.summary.HIGH} MED=${r.summary.MEDIUM} LOW=${r.summary.LOW}\n`);
      for (const f of r.findings) {
        process.stdout.write(`- ${f.severity} ${f.rule} ${f.file}\n  ${f.detail}\n`);
      }
    }
    if (!report.some((r) => r.findings.length)) process.stdout.write("No deterministic findings.\n");
  }

  if (args.strict && worst >= severityRank("HIGH")) process.exit(1);
}

main().catch((e) => {
  console.error(e?.stack || String(e));
  process.exit(1);
});

