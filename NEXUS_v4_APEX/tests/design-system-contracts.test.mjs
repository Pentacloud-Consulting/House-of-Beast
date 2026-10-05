import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

function mustExist(rel) {
  const fp = path.join(ROOT, rel);
  assert.ok(fs.existsSync(fp), `Expected file: ${rel}`);
}

test("03_PALETTE contracts exist per Module 02", () => {
  mustExist("03_PALETTE/contracts/color-tokens.schema.json");
  mustExist("03_PALETTE/contracts/contrast-report.schema.json");
  mustExist("03_PALETTE/contracts/harmony-plan.schema.json");
  mustExist("03_PALETTE/contracts/gradient-rules.schema.json");
});

test("04_TYPE contracts exist per Module 03", () => {
  mustExist("04_TYPE/contracts/type-tokens.schema.json");
  mustExist("04_TYPE/contracts/font-loading.schema.json");
  mustExist("04_TYPE/templates/tokens-type.css");
});

test("05_MOTION contracts exist per Module 06", () => {
  mustExist("05_MOTION/contracts/motion-tokens.schema.json");
  mustExist("05_MOTION/contracts/reduced-motion.schema.json");
  mustExist("05_MOTION/contracts/view-transitions.schema.json");
  mustExist("05_MOTION/templates/motion-tokens.css");
});

