import json
import boto3
import mysql.connector

def lambda_handler(event, context):
    # Extract UserID and Password from the API request body
    request_body = json.loads(event['body'])
    UserID = request_body['UserID']
    Password = request_body['Password']

    # Create a connection to the RDS MySQL database
    db_instance_identifier = 'tf-20230614154028687200000003'  # Replace with your RDS instance identifier
    db_endpoint = boto3.client('rds').describe_db_instances(DBInstanceIdentifier=db_instance_identifier)['DBInstances'][0]['Endpoint']['Address']

    # Connect to the database and retrieve the saved UserID and Password
    try:
        conn = mysql.connector.connect(host=db_endpoint, user='taadmin1', password='12qwaszx#$ERDFCV', database='Team-Acacia-DB')
        cursor = conn.cursor()

        # Execute the SELECT query to retrieve the matching UserID and Password
        select_query = "SELECT UserID, Password FROM UserInfo WHERE UserID = %s AND Password = %s"
        cursor.execute(select_query, (UserID, Password))
        result = cursor.fetchall()

        # Close the database connection
        cursor.close()
        conn.close()

        # Check if a match was found
        if result is not None and len(result) > 0:
            # User is authorized, return a success response
            response = {
                'statusCode': 200,
                'body': json.dumps('User authorized. Login successful.'),
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        else:
            # No match found, return an error response
            response = {
                'statusCode': 401,
                'body': json.dumps('Invalid credentials. Login failed.'),
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                }
            }
    except mysql.connector.Error as error:
        # Return an error response
        response = {
            'statusCode': 500,
            'body': json.dumps(f"Error retrieving UserID and Password: {str(error)}"),
            'headers': {
                'Access-Control-Allow-Origin': '*'
            }
        }

    return response