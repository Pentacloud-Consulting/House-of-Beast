#!/usr/bin/env node
/** Native-lite blast radius: files in the same directory as target (Phase 3 surrogate). */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { posixPath } from "./lib/fs.mjs";
import { ROOT } from "./lib/root.mjs";

const targetArg = process.argv[2];
if (!targetArg) {
  process.stderr.write(
    "usage: node scripts/graph.mjs <relative-or-absolute-file>\nLists sibling files + target (deterministic surrogate).\n"
  );
  process.exit(2);
}

let abs = path.isAbsolute(targetArg) ? path.normalize(targetArg) : path.normalize(path.join(process.cwd(), targetArg));
if (!abs.startsWith(path.normalize(ROOT))) {
  const candidate = path.normalize(path.join(ROOT, targetArg));
  if (fs.existsSync(candidate)) abs = candidate;
}
if (!fs.existsSync(abs)) {
  process.stderr.write("file not found: " + abs + "\n");
  process.exit(1);
}

const baseDir = path.dirname(abs);
const related = [];
for (const ent of fs.readdirSync(baseDir, { withFileTypes: true })) {
  if (ent.isFile()) {
    const full = path.join(baseDir, ent.name);
    related.push(posixPath(path.relative(ROOT, full)));
  }
}
related.sort();

const targetRel = posixPath(path.relative(ROOT, abs));

process.stdout.write(
  JSON.stringify(
    { target: targetRel, directory: posixPath(path.relative(ROOT, baseDir)), count: related.length, related },
    null,
    2
  ) + "\n"
);
