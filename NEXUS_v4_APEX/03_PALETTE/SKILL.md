---
name: 03_PALETTE
description: "Design tokens (color): OKLCH palette, harmony rules, elevation/shadows, gradients, data-viz colors."
---

## L1

- Emit color tokens and contrast checks as contracts.

## L2 (Module 02 alignment: OKLCH + 12-step scales + harmony + gradients)

- Use **OKLCH as working space**; convert to HEX/RGB only for output.
- Generate **12-step scales**: 50/100/200/300/400/500/600/700/800/900/950 + surface step.
- Enforce scale semantics: 50–200 surfaces, 400–600 interactions, 700–950 text.
- Select harmony type by brand character (monochrome/analogous/complementary/split/triadic).
- Gradients: avoid RGB gray-midpoint; specify OKLCH interpolation and anti-pattern rules.

## L3 (resources)

- `resources/oklch-scale.md`
- `resources/harmony.md`
- `resources/gradients.md`
- Contracts: `contracts/color-tokens.schema.json`, `contracts/contrast-report.schema.json`, `contracts/harmony-plan.schema.json`, `contracts/gradient-rules.schema.json`

