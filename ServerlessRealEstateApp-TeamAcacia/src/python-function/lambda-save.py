import json
import boto3
import mysql.connector

def lambda_handler(event, context):
    # Extract username and password from the API request body
    username = event['username']
    password = event['password']

    # Create a connection to the RDS MySQL database
    db_instance_identifier = 'tf-20230610192157489100000003'  # Replace with your RDS instance identifier
    db_endpoint = boto3.client('rds').describe_db_instances(DBInstanceIdentifier=db_instance_identifier)['DBInstances'][0]['Endpoint']['Address']

    # Connect to the database and check if the username already exists
    conn = mysql.connector.connect(host=db_endpoint, user='taadmin1', password='12qwaszx#$ERDFCV', database='team-acacia-test-db-cluster')
    cursor = conn.cursor()
    select_query = "SELECT username FROM users WHERE username = %s"
    cursor.execute(select_query, (username,))
    existing_username = cursor.fetchone()

    if existing_username:
        # Username already exists, return an error response
        response = {
            'statusCode': 400,
            'body': json.dumps('Username already exists')
        }
    else:
        try:
            # Execute the INSERT query to save the username and password
            insert_query = "INSERT INTO users (username, password) VALUES (%s, %s)"
            cursor.execute(insert_query, (username, password))
            conn.commit()

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

    # Close the database connection
    cursor.close()
    conn.close()

    return response