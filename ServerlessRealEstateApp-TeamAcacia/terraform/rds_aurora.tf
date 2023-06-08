# security
module "sg_source" {
  source = "./rds"
  sg_name = "${var.default_tag.env}-DB-SG"
  description = "SG for RDS portion of Terraform"
  vpc_id = aws_vpc.main.id
  sg_db_ingress = var.sg_db_ingress
  sg_db_egress = var.sg_db_egress
  # sg_source = aws_default_security_group.main.id
}


# db subnet group
resource "aws_db_subnet_group" "db" {
  name_prefix = "team-acacia-db"
  subnet_ids = aws_subnet.private.*.id
  tags = {
    "Name" = "${var.default_tag.env}-group"
  }
}

# cluster
resource "aws_rds_cluster" "db" {
  cluster_identifier = "${var.default_tag.env}-db-cluster"
  db_subnet_group_name = aws_db_subnet_group.db.name

  # changes
  engine = "aurora-mysql"
  engine_mode = "provisioned"
  engine_version = "8.0"
  database_name = "wordpress"
  master_username = var.db_credentials.username
  master_password = var.db_credentials.password
  vpc_security_group_ids = [module.sg_source.sg_id]
  skip_final_snapshot = true

  serverlessv2_scaling_configuration {
    max_capacity = 1
    min_capacity = 0.5
  }
}
  # availability_zones = aws_subnet.private[*].availability_zone
  # db_cluster_identifier = "my-aurora-db-cluster"
  
  

# cluster instances
resource "aws_rds_cluster_instance" "db" {
  # identifier           = "${var.default_tag.env}-${count.index + 1}"
  cluster_identifier   = aws_rds_cluster.db.id
  instance_class       = "db.serverless"
  engine               = aws_rds_cluster.db.engine
  engine_version       = aws_rds_cluster.db.engine_version
  db_subnet_group_name = aws_db_subnet_group.db.name
  tags = {
    "Name" = "${var.default_tag.env}-cluster"
  }
}


# DB endpoints
# output "db_endpoints" {
#   value = {
#     reader = aws_rds_cluster.db.reader_endpoint
#     writer = aws_rds_cluster.db.endpoint
#    }
# }

