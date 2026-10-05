## Blue-green vs canary (Module 15.1)

[conf: RECOMMENDED]

### Blue-green

- **How**: maintain two prod environments; validate green, then flip traffic.
- **Pros**: instant rollback; simple mental model.
- **Cons**: higher infra cost; DB migrations must be carefully compatible.

### Canary

- **How**: gradually shift traffic (e.g. 5% → 25% → 50% → 100%).
- **Pros**: catches real-world issues early; lower blast radius.
- **Cons**: requires strong observability + automated rollback triggers.

### Default policy

- If the system is early-stage or low traffic: **blue-green** (simplicity).
- If high traffic or high risk changes: **canary** (risk control).

