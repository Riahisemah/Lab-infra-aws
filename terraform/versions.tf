terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # OPTIONAL: Uncomment to store state in S3 (recommended for teams)
  # Create the bucket manually first: aws s3 mb s3://YOUR-BUCKET-NAME
  # backend "s3" {
  #   bucket = "YOUR-BUCKET-NAME"
  #   key    = "ecommerce-lab/terraform.tfstate"
  #   region = "us-east-1"
  # }
}
