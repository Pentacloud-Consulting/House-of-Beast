import test from "node:test";
import assert from "node:assert/strict";
import { mergeEngineConfig } from "../scripts/lib/config-merge.mjs";

test("innovation #25: 4-layer merge - scalars latest wins, arrays append", () => {
  const schema = { overridable: { scalars: ["foo"], "arrays-append": ["persistent-facts"] } };
  const base = { foo: 1, arrays: { "persistent-facts": ["a"] } };
  const userBase = { foo: 2, arrays: { "persistent-facts": ["b"] } };
  const team = { foo: 3, arrays: { "persistent-facts": ["c"] } };
  const user = { foo: 4, arrays: { "persistent-facts": ["d"] } };

  const out = mergeEngineConfig({ base, userBase, team, user, schema });
  assert.equal(out.foo, 4);
  assert.deepEqual(out.arrays["persistent-facts"], ["a", "b", "c", "d"]);
});

