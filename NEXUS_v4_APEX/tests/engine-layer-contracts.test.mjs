import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

function mustExist(rel) {
  assert.ok(fs.existsSync(path.join(ROOT, rel)), `Expected file: ${rel}`);
}

test("09_BUILD contracts exist", () => {
  mustExist("09_BUILD/contracts/app-architecture.schema.json");
  mustExist("09_BUILD/contracts/build-plan.schema.json");
  mustExist("09_BUILD/templates/next-app-structure.md");
});

test("10_API contracts exist per Module 12", () => {
  mustExist("10_API/contracts/rest-api.schema.json");
  mustExist("10_API/contracts/error-envelope.schema.json");
  mustExist("10_API/contracts/graphql-security.schema.json");
  mustExist("10_API/templates/openapi.template.yaml");
});

test("11_DATA contracts exist per Module 13", () => {
  mustExist("11_DATA/contracts/data-model.schema.json");
  mustExist("11_DATA/contracts/indexing.schema.json");
  mustExist("11_DATA/contracts/scaling.schema.json");
});

test("12_SYNC contracts exist", () => {
  mustExist("12_SYNC/contracts/sync-strategy.schema.json");
  mustExist("12_SYNC/contracts/webhook-reliability.schema.json");
});

test("13_AI contracts exist", () => {
  mustExist("13_AI/contracts/tool-contracts.schema.json");
  mustExist("13_AI/contracts/rag-plan.schema.json");
});

test("14_EVAL contracts exist", () => {
  mustExist("14_EVAL/contracts/eval-plan.schema.json");
  mustExist("14_EVAL/contracts/golden-set.schema.json");
});

