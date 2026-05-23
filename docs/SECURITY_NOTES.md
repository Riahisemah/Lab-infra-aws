# Security Notes

## SSH exposure

The EC2 security group allows SSH (`22`) from `0.0.0.0/0`.

- This is convenient for labs/CI, but not recommended for production.
- Improvement: restrict `22` to your IP (or use a bastion / VPN).

## Secrets

- Never commit AWS keys or private SSH keys.
- Use GitHub Actions secrets for CI.

## Container hardening

- Keep images updated.
- Consider limiting container privileges and adding resource constraints.

## Least privilege

- Apply IAM least privilege for Terraform.
- Restrict security groups to only required ports.
