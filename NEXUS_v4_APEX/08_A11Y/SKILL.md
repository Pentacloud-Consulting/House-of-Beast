---
name: 08_A11Y
description: "Accessibility engine: WCAG 2.2, keyboard/focus, ARIA patterns, live regions, a11y CI guidance."
---

## L1

- Emit accessibility checklist and ARIA pattern contracts.

## L2 (Module 07 alignment: WCAG 2.2 + POUR + focus + ARIA)

- Target **WCAG 2.2 AA minimum** (AAA aspirational for text/contrast).
- Apply POUR principles (Perceivable/Operable/Understandable/Robust).
- Keyboard + focus management:
  - focus moves into modal on open
  - focus returns to trigger on close
  - skip-to-content link first focusable element on every page
  - design `:focus-visible` ring (2px + 2px offset), never `outline: none`
  - focus trap overlays using `inert` (not tabindex juggling)
- ARIA first rule: use native elements before ARIA roles.
- Loading/accessibility: `aria-live` region + `aria-busy` on loading containers.

## L3 (resources)

- `resources/pour.md`
- `resources/focus.md`
- `resources/aria.md`
- Contracts: `contracts/a11y-checklist.schema.json`, `contracts/focus-management.schema.json`, `contracts/aria-patterns.schema.json`

