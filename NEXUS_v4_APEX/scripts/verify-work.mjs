#!/usr/bin/env node
/**
 * Verify-Work UAT (innovation #23) — prints 5-step concern-ordered checklist.
 * Full interactive flow is orchestration-time; this CLI is the deterministic anchor.
 */
import process from "node:process";

const phase = process.argv[2] ?? "current";

const steps = [
  "1. Orientation — one-line intent + surface-area stats",
  "2. Walkthrough by CONCERN (not by file) — why this approach",
  "3. Detail pass — 2–5 highest blast-radius spots tag [auth]/[schema]/[security]/[billing]",
  "4. Testing — 2–5 manual observations no suite covers",
  "5. Wrap-up — Approve [a] / Edit [e] / Skip [s] / Rework [r] / Discuss [d]"
];

process.stdout.write(`# Verify-work — phase: ${phase}\n\n`);
for (const s of steps) process.stdout.write(`- ${s}\n`);
process.stdout.write(
  "\nSkip records `verified-deferred` and queues a blocking proposal (see CONVENTIONS).\n"
);
