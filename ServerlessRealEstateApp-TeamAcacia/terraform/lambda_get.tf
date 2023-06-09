module "lambda_save_function" {
  source        = "terraform-aws-modules/lambda/aws"
  function_name = "lambda-save"
  description   = "This lambda function will save hotel selections for users"
  handler       = "index.lambda_handler"
  runtime       = "python3.8"
  publish       = true
  source_path = "../src/python-function/index.py" // will need to change index.py to name of .py file with correct lambda function


  # attach_policy_statements = true
  attach_policy = true
  create_role = false
  lambda_role = "arn:aws:iam::176906365059:role/acacia-Lambda-DB"


// create_current_version_allowed_triggers = false
    allowed_triggers = {
      AllowExecutionFromAPIGateway = {
        service = "apigateway"
        source_arn = "${module.api_gateway.apigatewayv2_api_execution_arn}/*/*"
      }
    }
}

module "lambda_alias_a" {
    source           = "terraform-aws-modules/lambda/aws//modules/alias"
    name             = "prod"
    function_name    = module.lambda_save_function.lambda_function_name
    
    // lets set the function_version when creating alias to be able to deploy using it.
    function_version = module.lambda_save_function.lambda_function_version
}

module "lambda_retrieve_function" {
  source        = "terraform-aws-modules/lambda/aws"
  function_name = "lambda-retrieve"
  description   = "This lambda function will retrieve hotel selections for users"
  handler       = "index.lambda_handler"
  runtime       = "python3.8"
  publish       = true
  source_path   = "../src/python-function/lambda-retreive.py" // Update with the correct file path

  attach_policy = true
  create_role   = false
  lambda_role   = "arn:aws:iam::176906365059:role/acacia-Lambda-DB"

    allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service     = "apigateway"
      source_arn  = "${module.api_gateway.apigatewayv2_api_execution_arn}/*/*"
    }
  }
}

module "lambda_alias_b" {
    source           = "terraform-aws-modules/lambda/aws//modules/alias"
    name             = "prod"
    function_name    = module.lambda_retrieve_function.lambda_function_name
    
    // lets set the function_version when creating alias to be able to deploy using it.
    function_version = module.lambda_retrieve_function.lambda_function_version
}