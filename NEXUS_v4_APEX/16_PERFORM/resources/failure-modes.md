## Failure Modes — 16_PERFORM

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 16_PERFORM emits `contracts/cwv-budget.schema.json`, `contracts/caching.schema.json`, and `contracts/speculation-rules.schema.json` artifacts

## Symptom: LCP image is lazy-loaded
[conf: DEFINITIVE]
- Cause: using `loading=lazy` on the LCP candidate
- Fix: preload LCP and ensure it is eager-loaded; confirm via DevTools LCP element
