## NEXUS APEX v4.0 — Executive Summary

NEXUS APEX v4.0 is a **contract-first, web-focused (Next.js 15)** skill-engine system that converts high-level intent into **typed, schema-validated artifacts** across a modular set of engines (UX → design tokens → UI → API/data → hardening → delivery → growth). It is built to stay **token-efficient** via progressive disclosure (L1/L2/L3), tiered feature loading, and a strict anti-slop layer.

### What makes it different

- **Contract-first pipeline**: every engine emits a typed artifact that downstream engines consume; `00_CORE` validates contracts before anything continues.
- **ANTI-SLOP guardrails**: `0A_ANTISLOP` blocks low-quality or unsafe behaviors (prompt injection, scope reduction, path traversal, weak standards).
- **HERMES self-improvement with approval**: `0H_HERMES` proposes precise diffs only inside narrow boundaries, **halts for explicit approval**, and keeps a complete audit trail with one-command revert. It also tracks **proposal effectiveness** across subsequent sessions so the system learns what actually helped.
- **Engine modularity + customization**: engines can be added/removed after development; per-engine `customize.yaml` enables sparse overrides, persistent-facts loading, and activation/on-complete hooks.
- **Plugin wrapper layer**: `0P_PLUGINS` can soft-depend on external tools (compression, code graph, lifecycle hooks) with graceful native fallbacks when missing.

### Scope and positioning

- **Primary domain**: elite web development and architecture, defaulting to Next.js 15 App Router / RSC and modern best practices (security, CWV performance, accessibility, SEO/GEO).
- **BMAD-METHOD**: NEXUS **does not adopt BMAD Layer 1** (persona-driven orchestrator/workflow system). NEXUS **does absorb BMAD Layer 2 infrastructure patterns** (validators, customization patterns, review patterns) as NEXUS-native capabilities, with attribution in `CHANGELOG.md` only.

### Deliverable

This repository will contain a new sibling folder `NEXUS_v4_APEX/` (leaving `NEXUS_v3_FINAL/` untouched) with:

- **29 engines/skills total**: 25 core engines + 4 operator engines
- **27 APEX innovations** implemented and validated by a unified quality gate (`nexus gate --all`)

