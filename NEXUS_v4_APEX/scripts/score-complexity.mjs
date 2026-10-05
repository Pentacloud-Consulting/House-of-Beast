#!/usr/bin/env node
/**
 * Deterministic complexity scoring helper (Phase 4).
 * Reads a free-text query and emits score buckets + suggested mode.
 */
import process from "node:process";

const query = process.argv.slice(2).join(" ").trim();

function hasAny(s, terms) {
  return terms.some((t) => s.includes(t));
}

function clamp10(n) {
  return Math.max(0, Math.min(10, n));
}

function mode(score) {
  if (score <= 2) return "lite";
  if (score <= 6) return "pro";
  return "apex";
}

const q = query.toLowerCase();
let fci = 0;
if (hasAny(q, ["auth", "login", "roles", "session"])) fci += 2;
if (hasAny(q, ["payment", "checkout", "stripe", "pii"])) fci += 2;
if (hasAny(q, ["migration", "schema change", "database", "prisma"])) fci += 2;
if (hasAny(q, ["webhook", "integration", "third party", "api"])) fci += 2;
if (hasAny(q, ["offline", "realtime", "crdt", "optimistic"])) fci += 1;
if (hasAny(q, ["lcp", "performance", "search", "home"])) fci += 1;

let bfri = 0;
if (hasAny(q, ["incident", "outage", "prod", "production"])) bfri += 3;
if (hasAny(q, ["security", "auth", "payment", "checkout"])) bfri += 2;
if (hasAny(q, ["cache", "invalidation", "race", "concurrency"])) bfri += 2;
if (hasAny(q, ["no tests", "unknown repro", "flaky"])) bfri += 2;
if (hasAny(q, ["backfill", "data fix"])) bfri += 1;

let mfri = 0;
if (hasAny(q, ["react native", "expo", "ios", "android"])) mfri += 1;
if (hasAny(q, ["offline", "sync"])) mfri += 3;
if (hasAny(q, ["push", "notification", "deep link"])) mfri += 2;
if (hasAny(q, ["flatlist", "flashlist", "animation", "jank"])) mfri += 2;
if (hasAny(q, ["secure store", "keychain", "keystore", "biometric"])) mfri += 2;

let cri = 0;
if (hasAny(q, ["study", "benchmark", "data", "report"])) cri += 3;
if (hasAny(q, ["compliance", "gdpr", "hipaa", "legal"])) cri += 2;
if (hasAny(q, ["entity", "knowledge graph", "nap"])) cri += 2;
if (hasAny(q, ["ai overviews", "geo", "llms.txt", "citation"])) cri += 2;
if (hasAny(q, ["hreflang", "international", "locale"])) cri += 1;

fci = clamp10(fci);
bfri = clamp10(bfri);
mfri = clamp10(mfri);
cri = clamp10(cri);

const max = Math.max(fci, bfri, mfri, cri);
const out = {
  note: "complexity-score",
  query,
  scores: { fci, bfri, mfri, cri },
  suggestedMode: mode(max)
};

process.stdout.write(JSON.stringify(out, null, 2) + "\n");

