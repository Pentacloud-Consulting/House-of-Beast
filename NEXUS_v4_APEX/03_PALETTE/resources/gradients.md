## Gradients (Module 02)

Anti-pattern: RGB interpolation between saturated hues often passes through a gray midpoint.

Rules:

- Prefer OKLCH interpolation for perceptual smoothness.
- Avoid gradients that reduce chroma in the midpoint unless intentionally “muted”.
- Always test gradients behind text for contrast and legibility.

