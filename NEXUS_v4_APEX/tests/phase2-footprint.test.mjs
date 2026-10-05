import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const SKIP_DIRS = new Set([".nexus", "scripts", "tests", "_style-reference", "nexus.custom", "node_modules"]);

function listEngineDirs() {
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((n) => !SKIP_DIRS.has(n));
}

function mustExist(p) {
  assert.ok(fs.existsSync(p), `Expected file to exist: ${p}`);
}

test("phase2: every engine has full footprint", () => {
  const engines = listEngineDirs().filter((n) => fs.existsSync(path.join(ROOT, n, "SKILL.md")));
  assert.ok(engines.length >= 25, "Expected at least 25 engines with SKILL.md");

  for (const e of engines) {
    const dir = path.join(ROOT, e);
    for (const f of ["SKILL.md", "_genome.yaml", "_capability.yaml", "customize.yaml"]) {
      mustExist(path.join(dir, f));
    }
    mustExist(path.join(dir, "contracts", "primary.schema.json"));
    mustExist(path.join(dir, "resources", "failure-modes.md"));
    mustExist(path.join(dir, "resources", "anti-patterns.md"));
    mustExist(path.join(dir, "templates", "README.md"));
  }
});

