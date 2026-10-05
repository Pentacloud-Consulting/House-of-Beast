## CI/CD pipeline architecture (Module 15.1)

[conf: RECOMMENDED]

### PR checks (fast feedback)

- Typecheck + lint
- Unit tests
- Integration tests (focused)
- Security scan (deps + SAST)
- Accessibility smoke (critical paths)
- Preview deployment (immutable build artifact)

### Main checks (merge to main)

- All PR checks
- E2E smoke
- Performance gate (Lighthouse CI budget or equivalent)
- Deploy (blue-green or canary)

### Release invariants

- Every deployment produces a **versioned, immutable artifact**.
- Rollback is a **single command** to the last known-good artifact.

