import test from "node:test";
import assert from "node:assert/strict";
import { cavemanCompress } from "../0P_PLUGINS/native-lite/caveman-lite.mjs";

test("R17: native-lite caveman compress resolves without crashing", async () => {
  const x = await cavemanCompress("a  \na\n\n\nb");
  const lines = x.trim().split(/\r?\n/).filter(Boolean);
  assert.ok(lines.includes("a"));
});
