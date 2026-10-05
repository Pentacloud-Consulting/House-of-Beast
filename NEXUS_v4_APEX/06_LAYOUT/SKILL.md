---
name: 06_LAYOUT
description: "Layout engine: responsive zones, viewport units, print, foldables, density, breakpoints."
---

## L1

- Emit layout zones and breakpoint contracts.

## L2 (Module 04 alignment: viewport units + container queries + print)

- Apply viewport unit rules:
  - avoid `vh` for mobile height; use `svh/dvh/lvh` appropriately
  - use `cqw/cqh` for component responsiveness (container queries)
  - use `rem` for global spacing tokens, `em` for component-internal spacing that scales with type
- Add mobile landscape constraints (hero cap; modal scrolling).
- Always ship a print stylesheet plan (hide nav/hero media/fixed; print link URLs; page break rules).

## L3 (resources)

- `resources/viewport-units.md`
- `resources/container-queries.md`
- `resources/print.md`
- Contracts: `contracts/viewport-units.schema.json`, `contracts/zones.schema.json`, `contracts/print.schema.json`

