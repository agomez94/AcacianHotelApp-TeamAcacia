# module "rds-aurora" {
#   source  = "terraform-aws-modules/rds-aurora/aws"
#   version = "8.1.1"

#   name              = "${local.name}-mysqlv2"
#   engine            = "aurora-mysql"
#   engine_mode       = "provisioned"
#   engine_version    = "2.11.2"
#   storage_encrypted = true

#   vpc_id               = module.vpc.vpc_id
#   db_subnet_group_name = module.vpc.database_subnet_group_name
#   security_group_rules = {
#     vpc_ingress = {
#       cidr_blocks = module.vpc.private_subnets_cidr_blocks
#     }
#   }

#   monitoring_interval = 60

#   apply_immediately   = true
#   skip_final_snapshot = true

#   serverlessv2_scaling_configuration = {
#     min_capacity = 1
#     max_capacity = 2
#   }

#   instance_class = "db.serverless"
#   instances = {
#     one = {}
#     two = {}
#   }

#   tags = local.tags
# }

# }

