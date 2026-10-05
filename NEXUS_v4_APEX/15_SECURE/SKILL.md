---
name: 15_SECURE
description: "Security engine: 11-layer security model, CSP, upload protocol, encryption, audit logs."
---

## L1

- Emit threat model + security checklist contracts.

## L2 (Module 08 alignment: headers + CSP + upload protocol)

- Security headers: include HSTS, framing, referrer, permissions policy baseline.
- CSP construction: start **Report-Only**, collect reports, harden to enforce; target no `unsafe-inline` / no `unsafe-eval`.
- Gateway/WAF assumptions: size limits (default 1MB), method restrictions, rate limiting.
- File upload protocol: strict type allowlist, size limits, malware scanning hooks, store on isolated subdomain with strict CSP.

## L3 (resources/templates)

- `resources/headers.md`
- `resources/csp.md`
- `resources/file-upload.md`
- `templates/csp.template.txt`
- Contracts: `contracts/security-headers.schema.json`, `contracts/csp.schema.json`, `contracts/file-upload.schema.json`

## Context & assumptions (what this engine is / is not)

- **Scope**: web app security posture *configuration and artifacts* (headers/CSP/upload policy/checklists), not “implement auth” or “provision WAF”.
- **Assumes**: a modern web stack (Node/Next.js-style SSR/edge possible), HTTPS termination, and a place to collect CSP violation reports (endpoint/log sink).
- **Non-goals**: secrets-vault operations, IAM design, SOC runbooks, full pentest execution (this engine emits inputs/requirements for those).

## Respected resources (authoritative references)

- **OWASP ASVS**: baseline verification checklist for web apps.
- **OWASP Cheat Sheet Series**: CSP, File Upload, SSRF, Session Management, etc.
- **MDN Web Docs**: header semantics and CSP directive behavior (browser-accurate guidance).
- **W3C CSP spec**: directive definitions and edge cases.
- **securityheaders.com**: pragmatic external validation target (aim A / A+ depending on constraints).
- **web.dev**: modern browser security guidance and header best practices.

## HITL rules (non-negotiable human review gates)

- **No “security by vibes”**: every recommendation must map to (a) a threat, (b) a control, and (c) a measurable verification step.
- **CSP rollout is staged**: Report-Only → collect violations → refine allowlist → enforce. No “straight to enforce” unless explicitly accepted risk.
- **Breaking-change awareness**: header/CSP changes must include expected breakage modes + rollback plan (what to flip off first).
- **Uploads are high-risk**: if file uploads exist, a reviewer must sign off on MIME+magic-byte checks, size limits, AV scanning, EXIF stripping, storage isolation, and delivery isolation (separate domain).
- **“No unsafe-*” exceptions are explicit**: any `unsafe-inline` / `unsafe-eval` exception must be documented with reason, mitigations, and an exit plan.

## Feedback methods (how outputs improve over time)

- **Violation-driven CSP tuning**: treat CSP reports as the feedback loop; keep a short allowlist change log (what was added/removed and why).
- **Header regression checks**: validate outputs against a known-good baseline (e.g., securityheaders score + automated header assertions in tests/CI).
- **Incident/near-miss loop**: when an issue occurs (XSS attempt, upload abuse, misconfig), add a new checklist item + update the relevant contract/resource.
- **Periodic review cadence**: re-run the checklist on dependency/framework upgrades (headers and CSP expectations change with platform behavior).
