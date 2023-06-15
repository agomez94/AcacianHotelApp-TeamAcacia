import json
import boto3
import mysql.connector

def lambda_handler(event, context):
    # Extract UserID and Password from the API request body
    UserID = event['UserID']
    Password = event['Password']

    # Create a connection to the RDS MySQL database
    db_instance_identifier = 'tf-20230614154028687200000003'  # Replace with your RDS instance identifier
    db_endpoint = boto3.client('rds').describe_db_instances(DBInstanceIdentifier=db_instance_identifier)['DBInstances'][0]['Endpoint']['Address']

    # Connect to the database and check if the UserID already exists
    conn = mysql.connector.connect(host=db_endpoint, user='taadmin1', password='12qwaszx#$ERDFCV', database='Team-Acacia-DB')
    cursor = conn.cursor()
    select_query = "SELECT UserID FROM UserInfo WHERE UserID = %s"
    cursor.execute(select_query, (UserID,))
    existing_UserID = cursor.fetchone()

    if existing_UserID:
        # UserID already exists, return an error response
        response = {
            'statusCode': 400,
            'body': json.dumps('UserID already exists')
        }
    else:
        try:
            # Execute the INSERT query to save the UserID and Password
            insert_query = "INSERT INTO UserInfo (UserID, Password) VALUES (%s, %s)"
            cursor.execute(insert_query, (UserID, Password))
            conn.commit()

            # Return a success response
            response = {
                'statusCode': 200,
                'body': json.dumps('UserID and Password saved successfully')
            }
        except mysql.connector.Error as error:
            # Return an error response
            response = {
                'statusCode': 500,
                'body': json.dumps(f"Error saving UserID and Password: {str(error)}")
            }

    # Close the database connection
    cursor.close()
    conn.close()

    return response

json_data = {}
json_data["UserID"] = "test_username"
json_data["Password"] = "password"
data = json_data




lambda_handler(data, None)