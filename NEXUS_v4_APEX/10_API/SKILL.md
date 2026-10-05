---
name: 10_API
description: "API engine: REST/GraphQL/tRPC design, versioning, error envelopes, security integration."
---

## L1

- Emit API contract (OpenAPI/GraphQL/tRPC schema) and error envelope definition.

## L2 (Module 12 alignment: REST semantics + versioning + GraphQL security)

- REST: nouns, plural resources; no verbs in routes; follow HTTP method semantics (GET safe, PUT idempotent, PATCH partial).
- Status code precision: prefer 422 for validation, 409 conflict, 429 with `Retry-After`.
- Versioning: default to URL versioning (`/api/v1/`) and deprecate with `Deprecation`/`Sunset` headers.
- GraphQL (if used): enforce depth limiting, complexity budgets, field-level auth, persisted queries, restrict introspection in prod.

## L3 (resources/templates)

- `resources/rest.md`
- `resources/status-codes.md`
- `resources/graphql-security.md`
- `templates/openapi.template.yaml`
- Contracts: `contracts/rest-api.schema.json`, `contracts/error-envelope.schema.json`, `contracts/graphql-security.schema.json`

