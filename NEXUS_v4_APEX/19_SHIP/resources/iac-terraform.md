## Infrastructure-as-code (IaC) baseline (Module 15.1)

[conf: RECOMMENDED]

- Prefer **IaC** (Terraform/Pulumi) to make environments reproducible.
- Keep secrets out of state; use a vault/KMS and inject at deploy-time.
- Adopt immutable infra where possible; treat servers as cattle, not pets.

