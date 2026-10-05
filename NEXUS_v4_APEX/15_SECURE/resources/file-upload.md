## File upload protocol (Module 08)

- Size limits (default block >1MB unless explicitly needed)
- Type allowlist by MIME + magic bytes
- Malware scanning hook
- Store user uploads on isolated subdomain (e.g., `uploads.example.com`) with strict CSP
- Use signed URLs; never serve raw uploads from the main app domain

