## Status code semantics (Module 12)

- 400 malformed request
- 401 not authenticated
- 403 authenticated but not authorized
- 404 not found
- 409 conflict (state conflict)
- 422 validation failure (preferred semantic errors)
- 429 rate limited (include `Retry-After`)
- 503 unavailable (include `Retry-After` when possible)

