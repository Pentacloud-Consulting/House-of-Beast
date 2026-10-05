import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { ROOT } from "../scripts/lib/root.mjs";
import { parseYaml } from "../scripts/lib/yaml.mjs";

const execFileAsync = promisify(execFile);

test("HERMES baseline-improvements.yaml has at least 30 seeded patterns", () => {
  const p = path.join(ROOT, "0H_HERMES", "contracts", "baseline-improvements.yaml");
  const doc = parseYaml(fs.readFileSync(p, "utf8"), { filename: p });
  const list = doc.baselineImprovements;
  assert.ok(Array.isArray(list));
  assert.ok(list.length >= 30);
  assert.ok(list.some((x) => x.id === "B001"));
});

test("validate-contracts-inference --strict exits 0", async () => {
  const script = path.join(ROOT, "scripts", "validate-contracts-inference.mjs");
  const r = await execFileAsync(process.execPath, [script, "--strict"]);
  assert.ok(r.signal == null, "process was not killed by signal");
});

test("cgr-adapter nativeBlastRadius returns JSON for README.md", async () => {
  const { nativeBlastRadius } = await import("../00_CORE/graph/cgr-adapter.mjs");
  const out = nativeBlastRadius("README.md");
  assert.equal(out.ok, true);
  assert.equal(out.source, "native-lite");
  assert.ok(out.data && typeof out.data === "object");
});

test("engine-deps filters contract edges for an engine", async () => {
  const script = path.join(ROOT, "scripts", "engine-deps.mjs");
  const { stdout } = await execFileAsync(process.execPath, [script, "--engine", "90_MEMORY"]);
  const j = JSON.parse(stdout);
  assert.equal(j.engine, "90_MEMORY");
  assert.ok(Array.isArray(j.edges));
  assert.ok(j.edges.length > 0);
});
