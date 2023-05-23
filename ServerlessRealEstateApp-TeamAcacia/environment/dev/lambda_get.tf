module "lambda_function" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "lambda-get"
  description   = "This lambda function will go and fetch data in our db"
  handler       = "index.lambda_handler"
  runtime       = "python3.8"
  publish       = true

  source_path = "src/python-function/index.py" // will need to change index name to lambdas purpose 

  attach_policy_statements = true

  policy_statements = {
    s3_read = {
        effect    = "Allow",
        actions   = ["s3:HeadObject", "s3:GetObject"],
        resources = ["${module.s3_bucket.s3_bucket_arn}/*"]
    }
  }

// create_current_version_allowed_triggers = false
    allowed_triggers = {
      AllowExecutionFromAPIGateway = {
        service = "apigateway"
        source_arn = "${module.api_gateway.apigatewayv2_api_execution_arn}/*/*"
      }
    }
}

module "lambda_alias" {
    source = "terraform-aws-modules/lambda/aws//modules/alias"
    
    name = "prod"

    function_name = module.lambda_function.lambda_function_name
    
    // lets set the function_version when creating alias to be able to deploy using it.
    function_version = module.lambda_function.lambda_function_version
}