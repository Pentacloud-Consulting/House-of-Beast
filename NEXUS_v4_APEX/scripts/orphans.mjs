#!/usr/bin/env node
/**
 * Prints orphans from `contract-chain.mjs` (contracts emitted but not consumed).
 */
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { ROOT } from "./lib/root.mjs";

const script = path.join(ROOT, "scripts", "contract-chain.mjs");
const out = execFileSync(process.execPath, [script], { encoding: "utf8" });
const chain = JSON.parse(out);

process.stdout.write(JSON.stringify({ orphans: chain.orphans }, null, 2) + "\n");

