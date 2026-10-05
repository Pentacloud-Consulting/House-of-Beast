## Failure Modes — 09_BUILD

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 09_BUILD emits `contracts/app-architecture.schema.json` and `contracts/build-plan.schema.json` artifacts

## Symptom: Client components everywhere
[conf: RECOMMENDED]
- Cause: RSC boundaries unclear
- Fix: default to RSC; use client components only for interactivity; keep data fetching server-side where possible
