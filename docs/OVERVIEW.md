# Overview

## What this project does

`ecommerce-devops-lab` provisions an AWS environment and deploys a small e-commerce web app using a DevOps-style workflow:

1. **Terraform** provisions AWS networking and compute resources (VPC, subnets, ALB, EC2, security groups).
2. **Ansible** bootstraps the instances (Python) and deploys application containers with **Docker Compose**.
3. The application stack is served through **Nginx** (reverse proxy) and provides a REST API and a static frontend.

## Architecture & data flow

```text
Internet
  |
  |  (HTTP 80)
  v
ALB
  |
  |  (forwards to HTTP/80 or app routes)
  v
EC2 instances (Docker)
  |
  +--> nginx container  (reverse proxy + /health)
  |
  +--> node/app container (Express + MongoDB)
  |
  +--> mongodb container (MongoDB database)
```

## Key components

- **Terraform** (`terraform/`): Infrastructure-as-Code.
- **Ansible** (`ansible/`): Remote provisioning and deployment.
- **Docker Compose** (`docker-compose.yml`): Defines mongodb, app, and nginx containers.
- **Node app** (`app/`): Express server, REST API, static frontend.
- **Nginx** (`nginx/nginx.conf`): Reverse proxy and health endpoint.

## Assumptions

- The EC2 instances can pull images/packages from the internet (NAT gateway is configured).
- The Ansible playbook clones a repository containing the application and docker-compose definition on the EC2 host.
