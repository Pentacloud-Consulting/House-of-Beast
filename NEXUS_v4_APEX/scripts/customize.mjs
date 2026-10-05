#!/usr/bin/env node
/**
 * Engine customization (innovation #25) — resolves 4-layer merge and persistent-facts.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROOT } from "./lib/root.mjs";
import { loadYamlIfExists, mergeEngineConfig, resolvePersistentFacts } from "./lib/config-merge.mjs";

const engine = process.argv[2];
if (!engine) {
  process.stderr.write("usage: node scripts/customize.mjs <ENGINE> [--resolved]\n");
  process.exit(2);
}

const wantResolved = process.argv.includes("--resolved");

const installBasePath = path.join(ROOT, engine, "customize.yaml");
const userBasePath = path.join(process.env.USERPROFILE || "", ".nexus", `${engine}.user.yaml`);
const teamPath = path.join(ROOT, "nexus.custom", `${engine}.yaml`);
const userPath = path.join(ROOT, "nexus.custom", `${engine}.user.yaml`);

const base = loadYamlIfExists(installBasePath) ?? {};
const userBase = loadYamlIfExists(userBasePath) ?? null;
const team = loadYamlIfExists(teamPath) ?? null;
const user = loadYamlIfExists(userPath) ?? null;

const merged = mergeEngineConfig({ base, userBase, team, user, schema: base });

const facts = merged["persistent-facts"] ?? merged.arrays?.["persistent-facts"] ?? [];
const resolvedFacts = resolvePersistentFacts({ rootDir: ROOT, facts: Array.isArray(facts) ? facts : [] });

const out = {
  engine,
  paths: {
    installBase: path.relative(ROOT, installBasePath),
    userBase: userBasePath ? userBasePath : null,
    team: path.relative(ROOT, teamPath),
    user: path.relative(ROOT, userPath)
  },
  resolved: merged,
  persistentFactsResolvedCount: resolvedFacts.length
};

if (wantResolved) process.stdout.write(JSON.stringify(out, null, 2) + "\n");
else {
  process.stdout.write(`# customize — ${engine}\n\n`);
  process.stdout.write(`Merge order:\n`);
  process.stdout.write(`1. Install-base: ${out.paths.installBase}\n`);
  process.stdout.write(`2. User-base: ${out.paths.userBase}\n`);
  process.stdout.write(`3. Team: ${out.paths.team}\n`);
  process.stdout.write(`4. User: ${out.paths.user}\n\n`);
  process.stdout.write(`Persistent facts resolved: ${resolvedFacts.length}\n`);
  process.stdout.write(`Use --resolved for full merged JSON.\n`);
}
