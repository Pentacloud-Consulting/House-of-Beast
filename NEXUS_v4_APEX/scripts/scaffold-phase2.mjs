#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib/root.mjs";

const SKIP_DIRS = new Set([".nexus", "scripts", "tests", "_style-reference", "nexus.custom", "node_modules"]);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(p, content) {
  if (fs.existsSync(p)) return false;
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, "utf8");
  return true;
}

function enginePurpose(name) {
  const map = {
    "01_FORGE": "UX/IA/JTBD engine: produces PRD, acceptance criteria, IA, navigation decisions.",
    "02_INSIGHT": "Analytics + CRO engine: event taxonomy, funnels, experiments, privacy-first measurement.",
    "03_PALETTE": "Design tokens (color): OKLCH palette, harmony rules, elevation/shadows, gradients, data-viz colors.",
    "04_TYPE": "Design tokens (type): modular scale, fluid type, font pairing, loading/perf, readability/kerning.",
    "05_MOTION": "Motion system: principles, reduced motion, View Transitions, choreography patterns.",
    "06_LAYOUT": "Layout engine: responsive zones, viewport units, print, foldables, density, breakpoints.",
    "07_COMPONENTS": "Component system: anatomy, slots, states, loading/error designs, token integration.",
    "08_A11Y": "Accessibility engine: WCAG 2.2, keyboard/focus, ARIA patterns, live regions, a11y CI guidance.",
    "09_BUILD": "Implementation engine: Next.js 15 App Router/RSC patterns, commerce/email/i18n/monorepo guidance.",
    "10_API": "API engine: REST/GraphQL/tRPC design, versioning, error envelopes, security integration.",
    "11_DATA": "Data engine: schema design, indexing strategy, N+1 mitigation, scaling, pools, migrations.",
    "12_SYNC": "Sync engine: realtime vs async decision tree, offline queues, webhooks reliability, background jobs.",
    "13_AI": "AI engine: RAG/agents/tool contracts, safety constraints, cost routing interfaces.",
    "14_EVAL": "Evaluation engine: golden sets, eval harness, hallucination checks, regression tracking.",
    "15_SECURE": "Security engine: 11-layer security model, CSP, upload protocol, encryption, audit logs.",
    "16_PERFORM": "Performance engine: Core Web Vitals, caching layers, edge strategy, bundle budgets, rendering decisions.",
    "17_GOVERN": "Governance engine: retention, DSAR, evidence debugging, compliance-as-code.",
    "18_TEST": "Testing engine: testing trophy, static analysis, visual regression, a11y tests, CI gates.",
    "19_SHIP": "Shipping engine: CI/CD, deployment strategies, IaC, secrets, rollback doctrine, feature flags.",
    "20_OBSERVE": "Observability engine: OTel, RUM, synthetics, SLOs, PII scrubbing, incident loops.",
    "21_SEO": "SEO engine: crawlability, sitemaps, schema per page-type, pillar clusters, international SEO.",
    "22_GEO": "GEO engine: AI crawler strategy, citation architecture, entity establishment, llms.txt, AEO patterns.",
    "90_MEMORY": "Project memory: persists nexus.project.yaml and short logs; manages seeds/todos/threads safely.",
    "00_CORE": "Orchestration brain: routes intent to engines, validates contracts, enforces tier/token policy, runs verify-work.",
    "0A_ANTISLOP": "Preventive guardrails: blocks slop, injection, scope reduction, unsafe patterns; provides reviewer subagents.",
    "0H_HERMES": "Self-improvement loop: proposes precise diffs, halts for approval, audits every applied edit, tracks effectiveness.",
    "0P_PLUGINS": "Plugin wrapper utility: installs/health-checks optional tools and provides native-lite fallbacks.",
    "91_PORTFOLIO": "Operator context: portfolio workflows and artifacts (legacy from v3).",
    "92_FREELANCE": "Operator context: freelance workflows and artifacts (legacy from v3).",
    "93_MOBILE": "Operator context: mobile-native guidance (legacy from v3)."
  };
  return map[name] ?? "Domain engine (Phase 2 scaffold).";
}

function makeGenome(name) {
  const tokenBudget =
    name === "00_CORE" ? 480 :
    name === "0P_PLUGINS" ? 150 :
    name === "0A_ANTISLOP" ? 600 :
    name === "0H_HERMES" ? 900 :
    name === "90_MEMORY" ? 700 :
    900;

  return [
    `engine: ${name}`,
    `version: 0.1.0`,
    `modeSupport:`,
    `  - lite`,
    `  - pro`,
    `  - apex`,
    `tokenBudget: ${tokenBudget}`,
    `inputs:`,
    `  - id: projectContext`,
    `    contract: 90_MEMORY/contracts/project-state.schema.json`,
    `    required: false`,
    `outputs:`,
    `  - id: primaryArtifact`,
    `    contract: ${name}/contracts/primary.schema.json`,
    `exports: []`,
    ``
  ].join("\n");
}

function makeCapability(name) {
  return [
    `engine: ${name}`,
    `purpose: "${enginePurpose(name)}"`,
    `whenToInvoke:`,
    `  - "Invoke when this domain is needed."`,
    `provides:`,
    `  - "Emits a primary contract artifact."`,
    `hardRules:`,
    `  - "Use invoke language (REF-03)."`,
    `  - "No cross-engine internal path references (PATH-05)."`,
    ``
  ].join("\n");
}

function makeCustomize(name) {
  return [
    `overridable:`,
    `  scalars: []`,
    `  arrays-append:`,
    `    - persistent-facts`,
    `locked: []`,
    ``,
    `persistent-facts: []`,
    `activation-steps-prepend: []`,
    `activation-steps-append: []`,
    `on-complete: []`,
    ``
  ].join("\n");
}

function makePrimarySchema(name) {
  return JSON.stringify(
    {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      title: `${name}PrimaryArtifact`,
      type: "object",
      required: ["engine", "version"],
      properties: {
        engine: { type: "string", const: name },
        version: { type: "string" },
        payload: { type: "object" }
      },
      additionalProperties: false
    },
    null,
    2
  ) + "\n";
}

function makeFailureModes(name) {
  return [
    `## Failure Modes — ${name}`,
    ``,
    `## Symptom: Output is vague or non-contractual`,
    `[conf: DEFINITIVE]`,
    `- Cause: engine emitted prose-only without a typed artifact`,
    `- Fix: ensure ${name} emits contracts/${name === "00_CORE" ? "execution-plan" : "primary"}.schema.json shaped output`,
    ``
  ].join("\n");
}

function makeAntiPatterns(name) {
  return [
    `## Anti-Patterns — ${name}`,
    ``,
    `## ⛔ Cross-engine file reach`,
    `[conf: DEFINITIVE]`,
    `Bad: referencing ../OtherEngine/templates/...`,
    `Fix: invoke the engine or move exemplar into _style-reference/`,
    ``
  ].join("\n");
}

function makeTemplatesReadme(name) {
  return [
    `## Templates — ${name}`,
    ``,
    `Phase 2 scaffold: templates will be expanded per engine during Phase 2/3.`,
    ``
  ].join("\n");
}

function discoverEngineDirs() {
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !SKIP_DIRS.has(name));
}

function main() {
  const engines = discoverEngineDirs();
  let created = 0;

  for (const name of engines) {
    const dir = path.join(ROOT, name);
    if (!fs.existsSync(path.join(dir, "SKILL.md"))) continue;

    created += writeIfMissing(path.join(dir, "_genome.yaml"), makeGenome(name)) ? 1 : 0;
    created += writeIfMissing(path.join(dir, "_capability.yaml"), makeCapability(name)) ? 1 : 0;
    created += writeIfMissing(path.join(dir, "customize.yaml"), makeCustomize(name)) ? 1 : 0;

    created += writeIfMissing(path.join(dir, "contracts", "primary.schema.json"), makePrimarySchema(name)) ? 1 : 0;
    created += writeIfMissing(path.join(dir, "resources", "failure-modes.md"), makeFailureModes(name)) ? 1 : 0;
    created += writeIfMissing(path.join(dir, "resources", "anti-patterns.md"), makeAntiPatterns(name)) ? 1 : 0;
    created += writeIfMissing(path.join(dir, "templates", "README.md"), makeTemplatesReadme(name)) ? 1 : 0;
  }

  process.stdout.write(JSON.stringify({ ok: true, createdFiles: created, engines: engines.length }, null, 2) + "\n");
}

main();

