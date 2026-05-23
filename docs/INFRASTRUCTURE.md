# Infrastructure (Terraform)

The Terraform module provisions:

- **VPC** + public/private subnets
- **NAT Gateway** for private subnet internet access
- **ALB** (Application Load Balancer)
- **EC2 instances** running the application via Ansible + Docker Compose
- **Security groups**
- **CloudWatch CPU alarms**

## Resources explained

### Networking

- `aws_vpc.main`
  - CIDR: `10.0.0.0/16`
  - DNS support/hostnames enabled

- Public subnets:
  - `aws_subnet.public_a` (`10.0.1.0/24`, AZ `${aws_region}a`)
  - `aws_subnet.public_b` (`10.0.2.0/24`, AZ `${aws_region}b`)

- Private subnets:
  - `aws_subnet.private_a` (`10.0.10.0/24`)
  - `aws_subnet.private_b` (`10.0.20.0/24`)

> Note: In `aws_instance.web`, the subnets used alternate between public subnets for simplicity.

- NAT gateway:
  - `aws_nat_gateway.nat` is created in `public_a`.
  - Private route table routes `0.0.0.0/0` to NAT.

### Internet-facing entrypoint

- `aws_lb.main`
  - External ALB (`internal=false`)
  - Security group: `aws_security_group.alb`
  - Subnets: public_a and public_b

- `aws_lb_listener.http`
  - Listens on port `80`
  - Forwards to target group

- `aws_lb_target_group.web`
  - Target port: `80`
  - Health check path: `/`

### Compute

- `aws_instance.web`
  - `count = var.instance_count` (default 2)
  - Instance type: `var.instance_type` (default `t3.micro`)
  - Key pair: `aws_key_pair.deployer` (uses `var.ec2_public_key`)
  - Root volume: 20GiB `gp3`
  - Subnet placement alternates between `public_a` and `public_b`

### Security groups

- `aws_security_group.alb`
  - Ingress: `80` and `443` from `0.0.0.0/0`

- `aws_security_group.ec2`
  - Ingress SSH (`22`) from `0.0.0.0/0` (required for Ansible in the provided approach)
  - Ingress HTTP (`80`) from ALB SG
  - Ingress app port (`3000`) from ALB SG

### Alarms

- `aws_cloudwatch_metric_alarm.cpu_high`
  - Per instance
  - Threshold: CPU > 75%
  - Evaluation periods: 2 (period 120s)

## Terraform outputs

- `instance_public_ips`: list of EC2 public IPs
- `alb_dns_name`: ALB DNS name to open in browser
- `vpc_id`
