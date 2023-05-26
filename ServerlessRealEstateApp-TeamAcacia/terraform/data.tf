data "aws_availability_zones" "availability_zone" {
  state    = "available"
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}
