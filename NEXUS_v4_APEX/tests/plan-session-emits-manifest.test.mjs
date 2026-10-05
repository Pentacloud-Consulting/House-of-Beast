import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";
import { exists, readText } from "../scripts/lib/fs.mjs";

const execFileAsync = promisify(execFile);

test("plan-session emits .nexus-session.md", async () => {
  const script = path.join(ROOT, "scripts", "plan-session.mjs");
  await execFileAsync(process.execPath, [script, "Build me a landing page"]);
  const outPath = path.join(ROOT, ".nexus", ".nexus-session.md");
  assert.equal(await exists(outPath), true);
  const text = await readText(outPath);
  assert.ok(text.includes("## Session Manifest —"));
  assert.ok(text.includes("### Request"));
  assert.ok(text.includes("### Maturity heat-map"));
});

