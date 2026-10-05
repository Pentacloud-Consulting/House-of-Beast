import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

const execFileAsync = promisify(execFile);

test("score-complexity returns JSON with suggestedMode", async () => {
  const script = path.join(ROOT, "scripts", "score-complexity.mjs");
  const { stdout } = await execFileAsync(process.execPath, [script, "Add user auth and payments"]);
  const parsed = JSON.parse(stdout);
  assert.equal(parsed.note, "complexity-score");
  assert.equal(typeof parsed.suggestedMode, "string");
  assert.ok(["lite", "pro", "apex"].includes(parsed.suggestedMode));
});

