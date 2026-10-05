import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

const execFileAsync = promisify(execFile);

test("final-validate bundle runs", async () => {
  const script = path.join(ROOT, "scripts", "final-validate.mjs");
  const { stdout } = await execFileAsync(process.execPath, [script]);
  assert.ok(stdout.includes("[final-validate] OK"));
});

