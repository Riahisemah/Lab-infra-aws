# Prerequisites

## Accounts

- **AWS account** with permission to create: VPC, subnets, ALB, EC2, security groups, NAT gateway, IAM key pair.
- **GitHub account** (if using CI/CD).

## Tools

- Terraform (>= 1.5)
- Ansible
- SSH client

## AWS inputs

- Region (default expected: `us-east-1`)
- EC2 key pair public key content to allow SSH for Ansible

## Application behavior

- The app is a Dockerized stack: **nginx -> node/app -> MongoDB**.
- MongoDB initializes and seeds data on first app startup.
