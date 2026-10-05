#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROOT } from "./lib/root.mjs";

const logPath = path.join(ROOT, "0H_HERMES", "contracts", "audit-log.jsonl");
if (!fs.existsSync(logPath)) {
  process.stdout.write("(empty)\n");
  process.exit(0);
}
process.stdout.write(fs.readFileSync(logPath, "utf8"));
