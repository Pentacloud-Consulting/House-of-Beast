## CI pipeline checks (Module 15 + Module 14)

PR:

1. Typecheck
2. Lint
3. Unit tests
4. Integration tests
5. Bundle size regression gate
6. Security scanning (npm audit / Snyk)
7. Accessibility audit (axe-core)
8. Visual regression (Chromatic/Percy)
9. Preview deploy

Main merge:

1. All PR checks
2. E2E against preview
3. Lighthouse CI (CWV regression gate)
4. Deploy (blue-green/canary)

