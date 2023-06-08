variable "default_tag" {
    type = map(string)
    default = {
      "env" = "team-acacia-test"
    }  
    description = "default tag to include in services built by teamAcacia"
}

variable "vpc_cidr" {
  type        = string
  default     = "45.0.0.0/16"
  description = "Main vpc cidr block"

}

variable "public_subnet_count" {
  type        = number
  description = "default"
  default     = 2
}

variable "private_subnet_count" {
  type        = number
  description = "Private subnet count"
  default     = 2
}

variable "sg_db_ingress" {
  type = map(object({
    port     = number
    protocol = string
    self     = bool
  }))
  default = {
    myspl = {
      port     = 3306
      protocol = "tcp"
      self     = true
    }
  }
}

variable "sg_db_egress" {
  type = map(object({
    port     = number
    protocol = string
    self     = bool
  }))
  default = {
    all = {
      port     = 0
      protocol = "-1"
      self     = true
    }
  }
}

variable "db_credentials" {
  type      = map(any)
  sensitive = true
  default = {
    username = "taadmin1"
    password = "12qwaszx#$ERDFCV"
  }
}