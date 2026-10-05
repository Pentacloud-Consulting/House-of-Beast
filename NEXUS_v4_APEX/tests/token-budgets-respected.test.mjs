import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { discoverEngines } from "../scripts/lib/engine-discovery.mjs";
import { ROOT } from "../scripts/lib/root.mjs";
import { readText } from "../scripts/lib/fs.mjs";
import { parseYaml } from "../scripts/lib/yaml.mjs";

test("token budgets exist and stay bounded", async () => {
  const engines = discoverEngines({ rootDir: ROOT });
  for (const e of engines) {
    const genomePath = path.join(e.dir, "_genome.yaml");
    const raw = await readText(genomePath);
    const genome = parseYaml(raw);
    assert.equal(typeof genome.tokenBudget, "number", true, `${e.name}: tokenBudget missing`);
    assert.ok(genome.tokenBudget > 0, `${e.name}: tokenBudget must be > 0`);
    assert.ok(genome.tokenBudget <= 1500, `${e.name}: tokenBudget too high (${genome.tokenBudget})`);
  }
});

