# Lambda function to save username and password data to mysql db
import json
import boto3
import mysql.connector

def lambda_handler(event, context): 
    # Extract username and password from the API request body
    request_body = json.loads(event['body'])
    username = request_body['username']
    password = request_body['password']

    # Create a connection to the RDS MySQL database
    db_instance_identifier = 'your-db-instance-identifier'  # Replace with your RDS instance identifier
    db_endpoint = boto3.client('rds').describe_db_instances(DBInstanceIdentifier=db_instance_identifier)['DBInstances'][0]['Endpoint']['Address']

    # Connect to the database and insert the username and password
    
    try:
        conn = mysql.connector.connect(host=db_endpoint, user='your-db-username', password='your-db-password', database='your-db-name')
        cursor = conn.cursor()

        # Execute the INSERT query
        insert_query = "INSERT INTO users (username, password) VALUES (%s, %s)"
        cursor.execute(insert_query, (username, password))
        conn.commit()

        # Close the database connection
        cursor.close()
        conn.close()

        # Return a success response
        response = {
            'statusCode': 200,
            'body': json.dumps('Username and password saved successfully')
        }
    except mysql.connector.Error as error:
        # Return an error response
        response = {
            'statusCode': 500,
            'body': json.dumps(f"Error saving username and password: {str(error)}")
        }

    return response
