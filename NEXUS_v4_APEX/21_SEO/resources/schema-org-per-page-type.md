## Schema.org per page type (Module 10.3)

[conf: RECOMMENDED]

- Keep schema **consistent** per page type via templates.
- Suggested minimums:
  - Home: `WebSite`, `Organization`
  - Content: `Article` (+ `BreadcrumbList`)
  - Product: `Product`, `Offer`, `AggregateRating` (when truthful)
  - FAQ: `FAQPage` only when the page is primarily Q&A

CI gate idea: assert required JSON-LD blocks exist for critical page types.

