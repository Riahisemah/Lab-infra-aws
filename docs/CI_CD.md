# CI/CD

This repository structure is designed for a GitHub Actions pipeline:

- Terraform provisioning
- Ansible deployment
- (Optional) destroy workflow

However, in the current repo snapshot, **no workflow files** were found under `.github/workflows/`.

## What to implement (expected pipeline design)

1. On push to `main`:
   - `terraform init`
   - `terraform apply` using `ec2_public_key` variable
   - capture `alb_dns_name` and instance IPs (outputs)
2. Run Ansible playbooks:
   - `bootstrap.yml`
   - `deploy.yml`
3. Provide a manual “destroy” button/workflow (important for cost control).

## Required GitHub Secrets (for any CI runner)

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `EC2_PUBLIC_KEY`
- `EC2_PRIVATE_KEY`
