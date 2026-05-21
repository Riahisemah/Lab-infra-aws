variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Prefix used for all resource names"
  type        = string
  default     = "ecommerce-lab"
}

variable "instance_count" {
  description = "Number of EC2 web instances"
  type        = number
  default     = 2
}

variable "instance_type" {
  description = "EC2 instance size"
  type        = string
  default     = "t3.micro"
}

# Amazon Linux 2 in us-east-1 (update if you change region)
variable "ami_id" {
  description = "AMI ID for Amazon Linux 2"
  type        = string
  default     = "ami-0c02fb55956c7d316"
}

# Your SSH public key — injected via GitHub Secret EC2_PUBLIC_KEY
variable "ec2_public_key" {
  description = "SSH public key content for EC2 access"
  type        = string
}
