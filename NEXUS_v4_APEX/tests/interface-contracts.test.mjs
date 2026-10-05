import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

function mustExist(rel) {
  const fp = path.join(ROOT, rel);
  assert.ok(fs.existsSync(fp), `Expected file: ${rel}`);
}

test("06_LAYOUT contracts exist per Module 04", () => {
  mustExist("06_LAYOUT/contracts/viewport-units.schema.json");
  mustExist("06_LAYOUT/contracts/zones.schema.json");
  mustExist("06_LAYOUT/contracts/print.schema.json");
  mustExist("06_LAYOUT/templates/print.css");
});

test("07_COMPONENTS contracts exist per Module 05", () => {
  mustExist("07_COMPONENTS/contracts/component-architecture.schema.json");
  mustExist("07_COMPONENTS/contracts/state-model.schema.json");
  mustExist("07_COMPONENTS/contracts/state-matrices.schema.json");
});

test("08_A11Y contracts exist per Module 07", () => {
  mustExist("08_A11Y/contracts/a11y-checklist.schema.json");
  mustExist("08_A11Y/contracts/focus-management.schema.json");
  mustExist("08_A11Y/contracts/aria-patterns.schema.json");
});

