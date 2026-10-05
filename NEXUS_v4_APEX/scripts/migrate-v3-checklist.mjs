#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROOT } from "./lib/root.mjs";

const v3Root = path.resolve(ROOT, "..", "NEXUS_v3_FINAL", "NEXUS_v3");

const map = [
  ["00_ORCHESTRATE", "00_CORE + META split"],
  ["01_FORGE", "01_FORGE"],
  ["02_DESIGN", "03_PALETTE + 04_TYPE (split)"],
  ["03_MOTION", "05_MOTION"],
  ["04_BUILD", "09_BUILD"],
  ["05_DATA", "11_DATA"],
  ["06_CONTENT", "distributed (21_SEO / 02_INSIGHT / 01_FORGE)"],
  ["07_SHIP", "19_SHIP"],
  ["08_GOVERN", "17_GOVERN"],
  ["09_AI", "13_AI"],
  ["10_MOBILE", "93_MOBILE (operator)"],
  ["11_MEMORY", "90_MEMORY"],
  ["12_PORTFOLIO", "91_PORTFOLIO (operator)"],
  ["13_FREELANCE", "92_FREELANCE (operator)"]
];

function main() {
  let v3Engines = [];
  if (fs.existsSync(v3Root)) {
    v3Engines = fs
      .readdirSync(v3Root, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();
  }
  const checklist = {
    v3Root: path.relative(process.cwd(), v3Root),
    v4Root: path.relative(process.cwd(), ROOT),
    foundV3Engines: v3Engines,
    suggestedMappings: Object.fromEntries(map),
    migratedOperators: ["91_PORTFOLIO", "92_FREELANCE", "93_MOBILE"],
    notes: ["Review 06_CONTENT split manually", "META layer (0A/0H/0P) is new in v4"]
  };
  process.stdout.write(JSON.stringify(checklist, null, 2) + "\n");
}

main();
