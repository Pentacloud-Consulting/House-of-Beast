## Error monitoring (Sentry default) + PII scrubbing (Module 15.2)

[conf: DEFINITIVE]

- Capture:
  - unhandled errors
  - unhandled promise rejections
  - server exceptions
- Before sending events, apply a **PII scrubber**:
  - mask emails, phones, addresses, tokens, auth headers, cookies
- Alerts should page only on:
  - new issues in critical routes
  - regressions vs baseline

