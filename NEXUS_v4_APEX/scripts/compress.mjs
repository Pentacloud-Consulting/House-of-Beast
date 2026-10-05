#!/usr/bin/env node
/** Native-lite compress: trim lines, collapse blank runs (caveman fallback). */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const file = process.argv[2];
const write = process.argv.includes("--write");

let text = "";
let abs = null;
if (file) {
  abs = path.resolve(file);
  text = fs.readFileSync(abs, "utf8");
} else {
  // stdin mode (used by round-trip-validate)
  text = fs.readFileSync(0, "utf8");
}

const lines = text.split(/\r?\n/).map((l) => l.trimEnd());
const out = [];
let blanks = 0;
for (const l of lines) {
  if (!l.trim()) {
    blanks++;
    if (blanks <= 1) out.push("");
    continue;
  }
  blanks = 0;
  out.push(l.trim());
}
const result = out.join("\n").trim() + "\n";

if (write) {
  if (!abs) {
    process.stderr.write("compress: --write requires a file path argument\n");
    process.exit(2);
  }
  fs.writeFileSync(abs, result, "utf8");
} else {
  process.stdout.write(result);
}
