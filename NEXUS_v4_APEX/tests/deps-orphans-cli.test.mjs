import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

const execFileAsync = promisify(execFile);

test("deps prints mermaid code fence", async () => {
  const script = path.join(ROOT, "scripts", "deps.mjs");
  const { stdout } = await execFileAsync(process.execPath, [script]);
  assert.ok(stdout.includes("```mermaid"));
  assert.ok(stdout.includes("graph TD"));
});

test("orphans prints JSON", async () => {
  const script = path.join(ROOT, "scripts", "orphans.mjs");
  const { stdout } = await execFileAsync(process.execPath, [script]);
  const parsed = JSON.parse(stdout);
  assert.ok(parsed && typeof parsed === "object");
  assert.ok(Array.isArray(parsed.orphans));
});

