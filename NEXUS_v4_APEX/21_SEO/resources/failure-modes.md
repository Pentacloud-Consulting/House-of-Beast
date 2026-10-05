## Failure Modes — 21_SEO

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 21_SEO emits `contracts/sitemaps.schema.json`, `contracts/hreflang.schema.json`, `contracts/structured-data.schema.json` artifacts
