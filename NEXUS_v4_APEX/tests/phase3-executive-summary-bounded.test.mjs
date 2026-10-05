import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

test("R1: EXECUTIVE_SUMMARY is ~one page by line count heuristic", () => {
  const lines = fs.readFileSync(path.join(ROOT, "EXECUTIVE_SUMMARY.md"), "utf8").split(/\r?\n/);
  const substantive = lines.filter((l) => l.trim()).length;
  assert.ok(substantive <= 80, `Executive summary substantive lines=${substantive}`);
});
