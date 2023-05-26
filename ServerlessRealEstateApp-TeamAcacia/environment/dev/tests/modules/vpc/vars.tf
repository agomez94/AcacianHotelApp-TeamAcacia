variable "default_tag" {
    type = map(string)
    default = {
      "env" = "test-teamAcacia"
    }  
    description = "default tag to include in services built by teamAcacia"
}

variable "vpc_name" {
  description = "The name of the VPC"
  type        = string
  default     = "AHA-vpc"
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "azs" {
  description = "The availability zones"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "private_subnets" {
  description = "The private subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "public_subnets" {
  description = "The public subnets"
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24"]
}

variable "enable_nat_gateway" {
  description = "Enable NAT Gateway"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Tags to add to the VPC"
  type        = map(string)
  default     = {
    "Terraform" = "true"
    "Environment" = "test"
  }
}