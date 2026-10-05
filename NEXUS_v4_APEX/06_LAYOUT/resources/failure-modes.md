## Failure Modes — 06_LAYOUT

## Symptom: Output is vague or non-contractual
[conf: DEFINITIVE]
- Cause: engine emitted prose-only without a typed artifact
- Fix: ensure 06_LAYOUT emits `contracts/viewport-units.schema.json`, `contracts/zones.schema.json`, and `contracts/print.schema.json` artifacts

## Symptom: Mobile full-height sections break due to browser chrome
[conf: RECOMMENDED]
- Cause: `vh` used for mobile height
- Fix: use `svh` for min-height and `dvh` carefully for full-screen; cap hero in landscape (e.g., 85dvh)
