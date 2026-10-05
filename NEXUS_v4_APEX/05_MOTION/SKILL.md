---
name: 05_MOTION
description: "Motion system: principles, reduced motion, View Transitions, choreography patterns."
---

## L1

- Emit motion guidelines and reduced-motion requirements as contracts.

## L2 (Module 06 alignment: purpose-driven + reduced motion + IO + View Transitions)

- Motion must serve one purpose: Orientation / Feedback / Storytelling / Delight.
- Reduced motion first: provide `prefers-reduced-motion: reduce` alternative (opacity-only vs transform).
- Scroll-triggered motion uses IntersectionObserver (no scroll listeners); trigger around 15% visibility.
- Use View Transitions API for navigation transitions with `view-transition-name` for shared elements.

## L3 (resources)

- `resources/motion-purpose.md`
- `resources/reduced-motion.md`
- `resources/intersection-observer.md`
- `resources/view-transitions.md`
- Contracts: `contracts/motion-tokens.schema.json`, `contracts/reduced-motion.schema.json`, `contracts/view-transitions.schema.json`

