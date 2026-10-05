import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "../scripts/lib/root.mjs";

test("CHANGELOG.md contains Pattern provenance + BMAD split", () => {
  const txt = fs.readFileSync(path.join(ROOT, "CHANGELOG.md"), "utf8");
  assert.match(txt, /Pattern provenance/i);
  assert.match(txt, /BMAD Layer 2/i);
  assert.match(txt, /BMAD Layer 1/i);
});
