## Failure Modes — 10_API

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 10_API emits `contracts/rest-api.schema.json`, `contracts/error-envelope.schema.json`, and `contracts/graphql-security.schema.json` artifacts

## Symptom: GET endpoints cause side effects
[conf: DEFINITIVE]
- Cause: misuse of method semantics
- Fix: enforce REST method semantics; move side-effects to POST
