import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

function mustExist(rel) {
  const fp = path.join(ROOT, rel);
  assert.ok(fs.existsSync(fp), `Expected file: ${rel}`);
}

test("01_FORGE contracts exist per Module 01", () => {
  mustExist("01_FORGE/contracts/prd.schema.json");
  mustExist("01_FORGE/contracts/acceptance-criteria.schema.json");
  mustExist("01_FORGE/contracts/ia.schema.json");
  mustExist("01_FORGE/contracts/nav-decision.schema.json");
  mustExist("01_FORGE/templates/prd.template.md");
});

test("02_INSIGHT contracts exist per Module 16", () => {
  mustExist("02_INSIGHT/contracts/event-taxonomy.schema.json");
  mustExist("02_INSIGHT/contracts/ab-testing-plan.schema.json");
  mustExist("02_INSIGHT/contracts/cro-checklist.schema.json");
});

