## Failure Modes — 04_TYPE

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 04_TYPE emits `contracts/type-tokens.schema.json` and `contracts/font-loading.schema.json` artifacts

## Symptom: Type sizes are breakpoint-only or px-based
[conf: RECOMMENDED]
- Cause: missing fluid clamp scale
- Fix: express each token with `clamp()`; use rem-based sizing and role-based tokens
