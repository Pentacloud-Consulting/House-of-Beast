import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

const execFileAsync = promisify(execFile);

test("round-trip validation passes for fixture", async () => {
  const script = path.join(ROOT, "scripts", "round-trip-validate.mjs");
  const fixture = path.join(ROOT, "tests", "fixtures", "roundtrip-source.md");
  const { stdout } = await execFileAsync(process.execPath, [script, fixture]);
  const parsed = JSON.parse(stdout);
  assert.equal(parsed.ok, true);
});

