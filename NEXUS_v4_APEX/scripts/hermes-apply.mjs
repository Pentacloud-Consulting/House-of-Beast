#!/usr/bin/env node
/**
 * Apply a HERMES proposal unified-diff to its target file and append audit log entry.
 * This is file-based and deterministic; it does not generate proposals.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { applyPatch } from "diff";
import { parseYaml, stringifyYaml } from "./lib/yaml.mjs";
import { ROOT } from "./lib/root.mjs";

const proposalId = process.argv[2];
if (!proposalId) {
  process.stderr.write("usage: node scripts/hermes-apply.mjs <proposal-id>\n");
  process.exit(2);
}

const proposalsPath = path.join(ROOT, "0H_HERMES", "contracts", "improvement-proposals.yaml");
const auditPath = path.join(ROOT, "0H_HERMES", "contracts", "audit-log.jsonl");

const proposals = parseYaml(fs.readFileSync(proposalsPath, "utf8"), { filename: proposalsPath }) ?? [];
if (!Array.isArray(proposals)) throw new Error("improvement-proposals.yaml must be a YAML array");

const idx = proposals.findIndex((p) => p?.["proposal-id"] === proposalId);
if (idx < 0) {
  process.stderr.write(`proposal not found: ${proposalId}\n`);
  process.exit(1);
}

const proposal = proposals[idx];
if (proposal.status !== "approved" && proposal.status !== "pending") {
  process.stderr.write(`proposal status must be pending/approved to apply, got: ${proposal.status}\n`);
  process.exit(1);
}

const diffText = proposal["unified-diff"];
const targetFile = proposal["target-file"];
if (typeof diffText !== "string" || typeof targetFile !== "string") {
  process.stderr.write("proposal missing unified-diff or target-file\n");
  process.exit(1);
}

const absTarget = path.join(ROOT, targetFile);
if (!fs.existsSync(absTarget)) {
  process.stderr.write(`target file missing: ${targetFile}\n`);
  process.exit(1);
}
const before = fs.readFileSync(absTarget, "utf8");
const after = applyPatch(before, diffText);
if (after === false) {
  process.stderr.write("patch failed to apply cleanly\n");
  process.exit(1);
}
fs.writeFileSync(absTarget, after, "utf8");

const auditId = `AUD-${new Date().toISOString().replace(/[:.]/g, "-")}`;
const entry = {
  "audit-id": auditId,
  "applied-at": new Date().toISOString(),
  "proposal-id": proposalId,
  "approval-mode": "manual",
  "target-file": targetFile,
  "diff-applied": diffText,
  "reverter": `node scripts/hermes-revert.mjs ${auditId}`
};
fs.appendFileSync(auditPath, JSON.stringify(entry) + "\n", "utf8");

proposals[idx] = { ...proposal, status: "applied" };
fs.writeFileSync(proposalsPath, stringifyYaml(proposals), "utf8");

process.stdout.write(JSON.stringify({ ok: true, auditId, targetFile }, null, 2) + "\n");

