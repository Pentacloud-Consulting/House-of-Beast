import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { discoverEngines } from "../scripts/lib/engine-discovery.mjs";
import { ROOT } from "../scripts/lib/root.mjs";

const FORBIDDEN = [
  /\b(?:Mary|John|Winston|Amelia|Sally|Paige)\b/,
  /\bparty\b\s+mode\b/i,
  /\bnexus\s+next\b/i,
  /\bNBB\b/i,
  /\bmad\b\s+builder\b/i,
  /\bengine\s+builder\b/i,
  /\bmodule\s+marketplace\b/i
];

function* walkEngineTextFiles(engineDir) {
  for (const rel of ["SKILL.md", "_capability.yaml", "_genome.yaml", "customize.yaml"]) {
    const fp = path.join(engineDir, rel);
    if (fs.existsSync(fp)) yield fp;
  }
  for (const d of ["contracts", "_subagents"]) {
    const base = path.join(engineDir, d);
    if (!fs.existsSync(base)) continue;
    for (const ent of fs.readdirSync(base, { withFileTypes: true })) {
      const full = path.join(base, ent.name);
      if (ent.isFile() && /\.(md|yaml|yml|json)$/i.test(ent.name)) yield full;
    }
  }
}

test("R11: forbidden BMAD Layer-1 leakage not present under engine footprints", () => {
  const engines = discoverEngines({ rootDir: ROOT });
  const hits = [];
  for (const { dir } of engines) {
    for (const fp of walkEngineTextFiles(dir)) {
      const txt = fs.readFileSync(fp, "utf8");
      for (const re of FORBIDDEN) {
        re.lastIndex = 0;
        if (re.test(txt)) hits.push(`${path.relative(ROOT, fp)} matched ${String(re)}`);
      }
    }
  }
  assert.equal(hits.length, 0, hits.join("\n"));
});
