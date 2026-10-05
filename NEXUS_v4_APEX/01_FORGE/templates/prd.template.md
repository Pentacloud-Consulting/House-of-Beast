# PRD: `<Feature Name>`

## Problem  [conf: DEFINITIVE]

`<one sentence>`

## Persona  [emits: contracts/prd.schema.json#persona]

- Primary: `<named persona>`
- JTBD: `<what job are they hiring this to do?>`
- Intent stage: `<arrival|exploration|consideration|decision|post-conversion>`

## Acceptance Criteria  [emits: contracts/acceptance-criteria.schema.json]

- [ ] Given `<ctx>`, when `<action>`, then `<outcome>`
- [ ] Performance: LCP < 2.5s mobile
- [ ] A11y: WCAG 2.2 AA
- [ ] Responsive: 375 / 768 / 1280 / 1920

## IA Deliverables  [emits: contracts/ia.schema.json]

- Sitemap: each page has purpose + primary keyword + funnel stage + 2+ internal links
- Tree test prompts: “Find X from home with no visual cues”
- Orphan pages: **not allowed**

## Navigation Decision  [emits: contracts/nav-decision.schema.json]

- Pattern: `<simple-nav|mega-menu|sidebar|tabs|sticky-search>`
- Rationale: `<why this pattern fits content volume + hierarchy>`
- Constraints: `<never hamburger on desktop, never mega menu on mobile, etc.>`

## Non-Goals

`<explicit out-of-scope>`

## Decision Trace

`<references contracts/decisions.log.yaml>`
