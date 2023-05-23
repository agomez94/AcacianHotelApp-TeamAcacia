module "api_gateway" {
  source = "terraform-aws-modules/apigateway-v2/aws"

  name          = "teamAcacia-HTTP"
  description   = "HTTP API Gateway by teamAcacia"
  protocol_type = "HTTP"

  create_api_domain_name = false

  integrations = {
    "GET /" = {
      lambda_arn             = module.lambda_function.lambda_function_arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 12000
    }

    "$default" = {
        lambda_arn = module.lambda_function.lambda_function_arn
    }
  }
}