# Deployment (Ansible)

This repo uses two Ansible playbooks:

- `ansible/bootstrap.yml`: installs Python3 on EC2 so Ansible can operate.
- `ansible/deploy.yml`: installs Docker tools and deploys the app stack using Docker Compose.

## bootstrap.yml (bootstrap EC2)

High-level tasks:

1. Disable SELinux enforcement (best-effort)
2. Check/install Python3 and pip using `yum`
3. Verify Python3 can import `json`

This playbook assumes:

- You can SSH to the instance as `ec2-user`.

## deploy.yml (deploy the app)

High-level tasks:

1. Install packages: `docker`, `git`
2. Start and enable Docker service
3. Add `ec2-user` to `docker` group
4. Install Docker Compose v2 binary at `/usr/local/bin/docker-compose`
5. Create `/opt/ecommerce`
6. Clone repository (variable `repo_url`) into `/opt/ecommerce`
7. Run:
   - `/usr/local/bin/docker-compose up -d --build --force-recreate`
8. Wait for an HTTP endpoint:
   - Playbook checks `http://localhost/health` returns `200`
9. Print `docker-compose ps`

### Important note: health endpoint mismatch

- This playbook waits for `GET /health`.
- The checked app health in `app/server.js` is `GET /api/health`.
- The Nginx config includes `location /health` which proxies to the upstream app.

So for the pipeline to succeed:

- the Nginx container must be up, and
- Nginx must proxy `/health` to the Node app.
