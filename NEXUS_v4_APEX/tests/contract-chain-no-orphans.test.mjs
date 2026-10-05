import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

const execFileAsync = promisify(execFile);

test("contract chain: no missing producers", async () => {
  const script = path.join(ROOT, "scripts", "contract-chain.mjs");
  const { stdout } = await execFileAsync(process.execPath, [script]);
  const parsed = JSON.parse(stdout);
  assert.equal(Array.isArray(parsed.missingProducers), true);
  assert.equal(parsed.missingProducers.length, 0, `missing producers: ${JSON.stringify(parsed.missingProducers)}`);
});

