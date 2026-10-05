import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";
import { readText } from "../scripts/lib/fs.mjs";

test("subagent doctrine forbids single-model roleplay", async () => {
  const p = path.join(ROOT, "0A_ANTISLOP", "resources", "subagent-doctrine.md");
  const text = await readText(p);
  assert.ok(/roleplay multiple reviewer perspectives/i.test(text));
});

