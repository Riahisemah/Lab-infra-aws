output "instance_public_ips" {
  description = "Public IPs of EC2 web instances (used by Ansible)"
  value       = aws_instance.web[*].public_ip
}

output "instance_private_ips" {
  description = "Private IPs of EC2 web instances"
  value       = aws_instance.web[*].private_ip
}

output "alb_dns_name" {
  description = "ALB DNS — open this in your browser to see the app"
  value       = aws_lb.main.dns_name
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}
