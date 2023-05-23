module "s3_bucket" {
    source = "terraform-aws-modules/s3-bucket/aws"
    version = "3.10.1"

    bucket = "team-acacia-bucket"
    acl    = "private"

    control_object_ownership = true

    // S3 bucket level public access block configuration
    block_public_acls        = true
    block_public_policy      = true
    ignore_public_acls       = true
    restrict_public_buckets  = true

    tags = {
        "Name" = "${var.default_tag.env}- bucket"
    }
}