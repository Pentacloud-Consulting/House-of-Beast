---
name: 02_INSIGHT
description: "Analytics + CRO engine: event taxonomy, funnels, experiments, privacy-first measurement."
---

## L1

- Emit an event taxonomy contract and success metrics.

## L2 (Module 16 alignment: Analytics + CRO)

- **Event taxonomy design**: verb_noun names (`signup_completed`, `checkout_abandoned`), with required properties (session_id, timestamp, page_url; user_id if authenticated).
- **Privacy-first analytics**: server-side tracking preference; consent before tracking; IP anonymization; first-party cookie only.
- **CRO above-the-fold protocol**: single value prop, one primary CTA, immediate proof element, landing pages avoid nav leakage, load time target.
- **A/B testing protocol**: define MDE, significance (95%+), one variable at a time, duration ≥ 2 weeks, document hypothesis + result + decision.

## L3 (resources)

- `resources/event-taxonomy.md`
- `resources/privacy-first.md`
- `resources/ab-testing.md`
- Contracts: `contracts/event-taxonomy.schema.json`, `contracts/ab-testing-plan.schema.json`, `contracts/cro-checklist.schema.json`

