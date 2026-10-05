#!/usr/bin/env node
/** BMAD-derived shard-doc: split markdown file by ## headers into ./<stem>-shards/ */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const src = process.argv[2];
if (!src) {
  process.stderr.write(
    "usage: node scripts/shard.mjs <doc.md>\nWrites sibling folder <stem>-shards/part-NN.md\n"
  );
  process.exit(2);
}

const abs = path.resolve(src);
let text = fs.readFileSync(abs, "utf8");

const stem = path.basename(abs, path.extname(abs));
const outDir = path.join(path.dirname(abs), `${stem}-shards`);

const lines = text.split(/\r?\n/);
const parts = [];
let cur = [];

function flush() {
  const body = cur.join("\n").trim();
  if (body) parts.push(body);
  cur = [];
}

for (const line of lines) {
  if (/^##\s+/.test(line)) {
    flush();
    cur.push(line);
  } else cur.push(line);
}
flush();

fs.mkdirSync(outDir, { recursive: true });

for (let i = 0; i < parts.length; i++) {
  const fp = path.join(outDir, `part-${String(i + 1).padStart(2, "0")}.md`);
  fs.writeFileSync(fp, parts[i].trim() + "\n", "utf8");
}

fs.writeFileSync(path.join(outDir, "INDEX.md"), parts.map((_, i) => `- part-${String(i + 1).padStart(2, "0")}.md`).join("\n") + "\n");

process.stdout.write(JSON.stringify({ ok: true, outDir: path.relative(process.cwd(), outDir), parts: parts.length }) + "\n");
