# Troubleshooting

## Terraform issues

- **AWS auth failures**: validate GitHub Secrets / local AWS credentials.
- **AMI not found / region mismatch**: update `terraform/variables.tf` `ami_id`.

## SSH / Ansible issues

- **Cannot connect via SSH**:
  - Check `aws_security_group.ec2` allows port `22`.
  - Confirm you are using the correct `ec2-user`.

- **Ansible bootstrap fails**:
  - Ensure the instance has network access (NAT configured).

## Docker deployment issues

On the EC2 host:

- Check Docker status:
  - `systemctl status docker`
- View container logs:
  - `docker logs nginx`
  - `docker logs nodeapp`
  - `docker logs mongodb`
- Check running containers:
  - `/usr/local/bin/docker-compose ps`

## Health check fails

Ansible waits for `http://localhost/health` to return `200`.
If it fails:

- Verify Nginx container is healthy/running.
- Verify Nginx proxies `/health` to the correct upstream.
- Verify the Node app exposes the expected health route (`/api/health`).

## ALB health check failures

Terraform ALB target group health check uses path `/`.
If ALB never becomes healthy:

- Ensure the Node container serves a valid response on `/` (the app serves `index.html` for non-API routes).
- Ensure Nginx/Node mapping is correct.
