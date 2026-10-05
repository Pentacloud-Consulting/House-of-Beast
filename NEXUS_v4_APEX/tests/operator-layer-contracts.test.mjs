import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";
import { exists } from "../scripts/lib/fs.mjs";

function p(...parts) {
  return path.join(ROOT, ...parts);
}

test("91_PORTFOLIO contracts exist", async () => {
  assert.equal(await exists(p("91_PORTFOLIO/contracts/portfolio-config.schema.json")), true);
  assert.equal(await exists(p("91_PORTFOLIO/contracts/case-study.schema.json")), true);
});

test("92_FREELANCE contracts exist", async () => {
  assert.equal(await exists(p("92_FREELANCE/contracts/client-brief.schema.json")), true);
  assert.equal(await exists(p("92_FREELANCE/contracts/proposal.schema.json")), true);
});

test("93_MOBILE contracts exist", async () => {
  assert.equal(await exists(p("93_MOBILE/contracts/mobile-config.schema.json")), true);
  assert.equal(await exists(p("93_MOBILE/contracts/eas-release.schema.json")), true);
});

