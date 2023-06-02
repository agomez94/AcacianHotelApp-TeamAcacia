# module "vpc" {
#   source = "terraform-aws-modules/vpc/aws"

#   name = var.vpc_name
#   cidr = var.vpc_cidr

#   azs             = var.azs
#   private_subnets = var.private_subnets
#   public_subnets  = var.public_subnets

#   enable_nat_gateway = var.enable_nat_gateway
  

#   tags = var.tags
# }

# module "s3_bucket" {
#   source = "./modules/s3_bucket"

#   bucket_name               = "team-acacia-bucket"
#   acl                       = "private"
#   control_object_ownership  = true
#   block_public_acls         = true
#   block_public_policy       = true
#   ignore_public_acls        = true
#   restrict_public_buckets   = true
#   tags                      = {
#     "Name" = "${var.default_tag["env"]}-bucket"
#   }
# }