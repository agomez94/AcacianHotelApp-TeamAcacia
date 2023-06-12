#ccan be used for the lambda function to retrieve hotel selections
import json
import boto3
import mysql.connector

def lambda_handler(event, context):
    # Create a connection to the RDS MySQL database
    db_instance_identifier = 'your-db-instance-identifier'  # Replace with your RDS instance identifier
    db_endpoint = boto3.client('rds').describe_db_instances(DBInstanceIdentifier=db_instance_identifier)['DBInstances'][0]['Endpoint']['Address']

    # Connect to the database and retrieve the saved username and password
    
    try:
        conn = mysql.connector.connect(host=db_endpoint, user='your-db-username', password='your-db-password', database='your-db-name')
        cursor = conn.cursor()

        # Execute the SELECT query
        select_query = "SELECT username, password FROM users"
        cursor.execute(select_query)
        result = cursor.fetchall()

        # Close the database connection
        cursor.close()
        conn.close()

        # Format the results as a list of dictionaries
        data = []
        for row in result:
            username, password = row
            data.append({'username': username, 'password': password})

        # Return the response with the retrieved data
        response = {
            'statusCode': 200,
            'body': json.dumps(data)
        }
    except mysql.connector.Error as error:
        # Return an error response
        response = {
            'statusCode': 500,
            'body': json.dumps(f"Error retrieving username and password: {str(error)}")
        }

    return response
