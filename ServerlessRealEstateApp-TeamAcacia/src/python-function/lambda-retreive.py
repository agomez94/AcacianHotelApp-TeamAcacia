import json
import boto3
import mysql.connector

def lambda_handler(event, context):
    # Extract username and password from the API request body
    request_body = json.loads(event['body'])
    username = request_body['username']
    password = request_body['password']

    # Create a connection to the RDS MySQL database
    db_instance_identifier = 'tf-20230610192157489100000003'  # Replace with your RDS instance identifier
    db_endpoint = boto3.client('rds').describe_db_instances(DBInstanceIdentifier=db_instance_identifier)['DBInstances'][0]['Endpoint']['Address']

    # Connect to the database and retrieve the saved username and password
    try:
        conn = mysql.connector.connect(host=db_endpoint, user='taadmin1', password='12qwaszx#$ERDFCV', database='team-acacia-test-db-cluster')
        cursor = conn.cursor()

        # Execute the SELECT query to retrieve the matching username and password
        select_query = "SELECT username, password FROM users WHERE username = %s AND password = %s"
        cursor.execute(select_query, (username, password))
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
            'body': json.dumps(f"Error retrieving username and password: {str(error)}"),
            'headers': {
                'Access-Control-Allow-Origin': '*'
            }
        }

    return response