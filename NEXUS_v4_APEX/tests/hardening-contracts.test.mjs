import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

function mustExist(rel) {
  assert.ok(fs.existsSync(path.join(ROOT, rel)), `Expected file: ${rel}`);
}

test("15_SECURE contracts exist", () => {
  mustExist("15_SECURE/contracts/security-headers.schema.json");
  mustExist("15_SECURE/contracts/csp.schema.json");
  mustExist("15_SECURE/contracts/file-upload.schema.json");
  mustExist("15_SECURE/templates/csp.template.txt");
});

test("16_PERFORM contracts exist", () => {
  mustExist("16_PERFORM/contracts/cwv-budget.schema.json");
  mustExist("16_PERFORM/contracts/caching.schema.json");
  mustExist("16_PERFORM/contracts/speculation-rules.schema.json");
  mustExist("16_PERFORM/templates/lighthouse-budgets.json");
});

test("18_TEST contracts exist", () => {
  mustExist("18_TEST/contracts/testing-trophy.schema.json");
  mustExist("18_TEST/contracts/ci-gates.schema.json");
  mustExist("18_TEST/templates/ci-checklist.md");
});

