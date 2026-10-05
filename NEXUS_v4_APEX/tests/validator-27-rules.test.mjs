import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";
import { readText } from "../scripts/lib/fs.mjs";

test("validator rule catalog includes STEP-10 and PATH-05", async () => {
  const p = path.join(ROOT, "00_CORE", "resources", "validator-rules.md");
  const text = await readText(p);
  assert.ok(text.includes("PATH-05"));
  assert.ok(text.includes("STEP-10"));
});

