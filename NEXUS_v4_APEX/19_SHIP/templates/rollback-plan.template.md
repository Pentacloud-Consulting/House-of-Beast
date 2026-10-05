## Rollback plan

### Trigger conditions
- Error rate regression over baseline
- CWV regression over budget
- Critical flow broken (checkout/auth)

### Rollback steps
1. Switch traffic to last known-good artifact.
2. Validate health checks and synthetic probes.
3. Create incident entry with trace_id samples and error group links.

### Post-rollback
- Root cause analysis
- Prevent recurrence via a new gate

