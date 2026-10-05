#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROOT } from "./lib/root.mjs";

const logPath = path.join(ROOT, ".nexus", "hermes-reconcile.log");
fs.mkdirSync(path.dirname(logPath), { recursive: true });
const line =
  JSON.stringify({
    at: new Date().toISOString(),
    event: "reconcile-scan",
    note: "Orchestration-time predictor vs actual reconciliation"
  }) + "\n";
fs.appendFileSync(logPath, line, "utf8");
process.stdout.write(`appended ${logPath}\n`);
