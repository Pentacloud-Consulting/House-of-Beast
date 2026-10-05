#!/usr/bin/env node
/** Seeds (innovation #24) — append JSONL line to .nexus/captures.jsonl */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROOT } from "./lib/root.mjs";

const text = process.argv.slice(2).join(" ").trim();
if (!text) {
  process.stderr.write("usage: node scripts/seed.mjs <text>\n");
  process.exit(2);
}
const p = path.join(ROOT, ".nexus", "captures.jsonl");
fs.mkdirSync(path.dirname(p), { recursive: true });
fs.appendFileSync(p, JSON.stringify({ at: new Date().toISOString(), kind: "seed", text }) + "\n", "utf8");
process.stdout.write("ok\n");
