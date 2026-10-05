---
name: 19_SHIP
description: "Shipping engine: CI/CD, deployment strategies, IaC, secrets, rollback doctrine, feature flags."
---

## L1

- Emit release plan and rollback/runbook contracts.

## L2 (Module 15 alignment: CI/CD + blue-green/canary)

- PR pipeline: typecheck, lint, unit, integration, bundle regression, security scan, a11y audit, visual regression, preview deploy.
- Main pipeline: all PR checks + E2E + Lighthouse CI + production deploy.
- Deployment strategies:
  - **Blue-green**: switch traffic after validation, instant rollback.
  - **Canary**: 5% → 25% → 50% → 100% with auto rollback on error/perf regression.

## L3

- Contracts: `contracts/cicd.schema.json`, `contracts/deploy.schema.json`

