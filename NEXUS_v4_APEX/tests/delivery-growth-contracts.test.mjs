import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";
import { exists } from "../scripts/lib/fs.mjs";

function p(...parts) {
  return path.join(ROOT, ...parts);
}

test("19_SHIP contracts exist per Module 15", async () => {
  assert.equal(await exists(p("19_SHIP/contracts/cicd.schema.json")), true);
  assert.equal(await exists(p("19_SHIP/contracts/deploy.schema.json")), true);
});

test("20_OBSERVE contracts exist per Module 15.2", async () => {
  assert.equal(await exists(p("20_OBSERVE/contracts/observability.schema.json")), true);
  assert.equal(await exists(p("20_OBSERVE/contracts/rum.schema.json")), true);
  assert.equal(await exists(p("20_OBSERVE/contracts/error-monitoring.schema.json")), true);
});

test("21_SEO contracts exist per Module 10", async () => {
  assert.equal(await exists(p("21_SEO/contracts/sitemaps.schema.json")), true);
  assert.equal(await exists(p("21_SEO/contracts/hreflang.schema.json")), true);
  assert.equal(await exists(p("21_SEO/contracts/structured-data.schema.json")), true);
});

test("22_GEO contracts exist per Module 11", async () => {
  assert.equal(await exists(p("22_GEO/contracts/ai-crawlers.schema.json")), true);
  assert.equal(await exists(p("22_GEO/contracts/llms-txt.schema.json")), true);
  assert.equal(await exists(p("22_GEO/contracts/entities.schema.json")), true);
});

