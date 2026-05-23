# Project Structure

```text
ecommerce-devops-lab/
├─ README.md                      (short entry point)
├─ docker-compose.yml            (local compose for the app stack)
├─ nginx/
│  └─ nginx.conf                (reverse proxy + /health)
├─ app/
│  ├─ server.js                (Express + MongoDB + REST API + frontend routing)
│  ├─ package.json            (Node dependencies)
│  └─ Dockerfile              (build the Node container)
├─ terraform/
│  ├─ main.tf                 (VPC, subnets, ALB, EC2, security groups, alarms)
│  ├─ variables.tf            (config inputs)
│  ├─ outputs.tf              (ALB DNS and instance IPs)
│  └─ versions.tf             (Terraform/provider versions)
├─ ansible/
│  ├─ deploy.yml             (install Docker, clone repo, run docker-compose)
│  ├─ bootstrap.yml          (install Python3 for Ansible)
│  ├─ inventory.ini          (manual test inventory)
│  └─ ansible.cfg            (SSH/Python settings)
├─ docs/
│  ├─ README.md               (links to all doc pages)
│  ├─ OVERVIEW.md
│  ├─ PREREQUISITES.md
│  ├─ SETUP.md
│  ├─ INFRASTRUCTURE.md
│  ├─ DEPLOYMENT.md
│  ├─ DOCKER.md
│  ├─ APP_API.md
│  ├─ NGINX.md
│  ├─ CI_CD.md
│  ├─ TROUBLESHOOTING.md
│  └─ SECURITY_NOTES.md
└─ .github/                    (GitHub Actions may or may not exist in this repo)
```
