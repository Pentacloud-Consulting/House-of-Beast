#!/usr/bin/env node
/**
 * Prints contract dependency DAG as Mermaid.
 * Wrapper around `contract-chain.mjs`.
 */
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { ROOT } from "./lib/root.mjs";

const script = path.join(ROOT, "scripts", "contract-chain.mjs");
const out = execFileSync(process.execPath, [script], { encoding: "utf8" });
const chain = JSON.parse(out);

process.stdout.write("```mermaid\n");
process.stdout.write("graph TD\n");
for (const [from, to] of chain.edges.map((e) => [e[0], e[1]])) {
  process.stdout.write(`  ${from}-->${to}\n`);
}
process.stdout.write("```\n");

