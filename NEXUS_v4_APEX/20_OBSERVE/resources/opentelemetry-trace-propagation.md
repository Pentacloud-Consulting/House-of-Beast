## OpenTelemetry trace propagation (Module 15.2)

[conf: RECOMMENDED]

- Every request gets a `trace_id`.
- Propagate context across:
  - service boundaries (HTTP/gRPC)
  - queues/workers
  - DB calls (at least include trace_id in logs)
- Minimum required fields in structured logs:
  - `trace_id`, `span_id`, `request_id`, `user_id` (if available and allowed), `route`

