---
name: 18_TEST
description: "Testing engine: testing trophy, static analysis, visual regression, a11y tests, CI gates."
---

## L1

- Emit test strategy and CI gate contracts.

## L2 (Module 14 alignment: Testing Trophy + CI checks)

- Testing Trophy layers: static analysis → unit → integration → E2E (critical journeys only).
- Visual regression: Chromatic/Percy/Playwright snapshots on PR; require sign-off for changes.
- Accessibility testing in CI: axe-core in E2E; component-level a11y checks.
- PR checks: typecheck, lint, unit, integration, bundle size, security scan, a11y audit, visual regression, preview deploy.
- Main checks: all above + E2E + Lighthouse CI for CWV regression gate.

## L3 (resources/templates)

- `resources/testing-trophy.md`
- `resources/ci-pipeline.md`
- `templates/ci-checklist.md`
- Contracts: `contracts/testing-trophy.schema.json`, `contracts/ci-gates.schema.json`

