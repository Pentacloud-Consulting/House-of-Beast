#!/usr/bin/env node
/** BMAD-derived index-docs: summarize folder Markdown files with first heading line */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const dir = process.argv[2];
if (!dir) {
  process.stderr.write("usage: node scripts/index.mjs <folder>\n");
  process.exit(2);
}

const root = path.resolve(dir);
const lines = [];

for (const ent of fs.readdirSync(root, { withFileTypes: true })) {
  if (!ent.isFile()) continue;
  const full = path.join(root, ent.name);
  if (!/\.md$/i.test(ent.name)) continue;
  const txt = fs.readFileSync(full, "utf8");
  const m = txt.match(/^#\s+(.+)$/m) || txt.match(/^##\s+(.+)$/m);
  let desc = (m ? m[1] : ent.name).slice(0, 80);
  const words = desc.split(/\s+/).filter(Boolean);
  const short = words.slice(0, 10).join(" ");
  lines.push(`- ${ent.name} — ${short}`);
}
lines.sort();

process.stdout.write(`# Index\n\n${lines.join("\n")}\n`);
