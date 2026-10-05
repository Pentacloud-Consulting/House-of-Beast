import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

function mustExist(p) {
  assert.ok(fs.existsSync(p), `Expected file to exist: ${p}`);
}

test("phase1: vertical-slice engines have required footprint", () => {
  const required = [
    ["00_CORE", ["SKILL.md", "_genome.yaml", "_capability.yaml", "customize.yaml"]],
    ["0A_ANTISLOP", ["SKILL.md", "_genome.yaml", "_capability.yaml", "customize.yaml"]],
    ["0H_HERMES", ["SKILL.md", "_genome.yaml", "_capability.yaml", "customize.yaml"]],
    ["0P_PLUGINS", ["SKILL.md", "_genome.yaml", "_capability.yaml", "customize.yaml"]],
    ["90_MEMORY", ["SKILL.md", "_genome.yaml", "_capability.yaml", "customize.yaml"]],
    ["03_PALETTE", ["SKILL.md", "_genome.yaml", "_capability.yaml", "customize.yaml"]]
  ];

  for (const [engine, files] of required) {
    for (const f of files) mustExist(path.join(ROOT, engine, f));
  }
});

test("phase1: example configs present", () => {
  for (const f of [
    "nexus.lock.yaml.example",
    "nexus.standards.yaml.example",
    "nexus.installed.yaml.example",
    "nexus.project.yaml.example",
    "tier-policy.yaml",
    "plugin-registry.yaml.example"
  ]) {
    mustExist(path.join(ROOT, f));
  }
});

