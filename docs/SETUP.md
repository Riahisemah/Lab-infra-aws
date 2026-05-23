# Setup

## 1) Local prerequisites

Install:

- Terraform
- Ansible

## 2) Create an SSH key pair for Terraform/Ansible

Generate a key pair and keep both the public and private key contents.

Example:

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/devops-lab-key -N ""
```

- Public key content (`devops-lab-key.pub`) will be injected into AWS as `aws_key_pair`.
- Private key content (`devops-lab-key`) will be used by Ansible.

## 3) AWS credentials for Terraform

Provide AWS credentials via environment variables or your normal Terraform AWS auth method.

## 4) (Recommended) Update AMI if needed

Terraform uses an AMI in `terraform/variables.tf`.
If you change regions, update `ami_id`.

## 5) Deploy

There are two ways:

- **CI/CD** (if GitHub Actions exists in your copy)
- **Manual** (Terraform + Ansible)

### Manual flow

```bash
cd terraform
terraform init
terraform plan -var="ec2_public_key=$(cat ~/.ssh/devops-lab-key.pub)"
terraform apply -var="ec2_public_key=$(cat ~/.ssh/devops-lab-key.pub)"
```

Then either:

- update `ansible/inventory.ini` with the generated public IPs, then run:

```bash
cd ../ansible
ansible-playbook -i inventory.ini bootstrap.yml
ansible-playbook -i inventory.ini deploy.yml
```

- or rely on CI/CD automation (if present).

## 6) View the app

Terraform outputs ALB DNS name:

```bash
cd terraform
terraform output alb_dns_name
```

Open it in a browser.
