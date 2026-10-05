## CI Checklist (exemplar)

### PR checks

- [ ] TypeScript typecheck (strict)
- [ ] ESLint (0 warnings on new code)
- [ ] Unit tests
- [ ] Integration tests
- [ ] Bundle size regression gate
- [ ] `npm audit` / Snyk scan
- [ ] Accessibility audit (axe-core)
- [ ] Visual regression
- [ ] Preview deploy

### Merge-to-main checks

- [ ] E2E tests (critical journeys)
- [ ] Lighthouse CI (CWV regression)
- [ ] Production deploy (blue-green/canary)

