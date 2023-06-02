provider "aws" {
  region = "us-east-1"
}

module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"
  version = "3.10.1"

  bucket                      = var.bucket_name
  control_object_ownership    = var.control_object_ownership
  block_public_acls           = var.block_public_acls
  block_public_policy         = var.block_public_policy
  ignore_public_acls          = var.ignore_public_acls
  restrict_public_buckets     = var.restrict_public_buckets
  tags                        = var.tags
}