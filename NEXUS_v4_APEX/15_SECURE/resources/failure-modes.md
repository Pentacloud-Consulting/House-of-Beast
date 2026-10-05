## Failure Modes — 15_SECURE

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 15_SECURE emits `contracts/security-headers.schema.json`, `contracts/csp.schema.json`, and `contracts/file-upload.schema.json` artifacts

## Symptom: CSP requires unsafe-inline or unsafe-eval
[conf: DEFINITIVE]
- Cause: dependency/framework patterns incompatible with hardened CSP
- Fix: upgrade dependencies; use nonces/strict-dynamic; never ship unsafe-inline/eval in enforce mode
