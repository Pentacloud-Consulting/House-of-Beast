## Failure Modes — 18_TEST

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 18_TEST emits `contracts/testing-trophy.schema.json` and `contracts/ci-gates.schema.json` artifacts

## Symptom: Tests focus on low-value UI details
[conf: RECOMMENDED]
- Cause: pyramid thinking; too many brittle UI unit tests
- Fix: follow Testing Trophy; reserve E2E for critical journeys, use integration tests for flows
