import psycopg2

def store_login_data(username, password):
    # Aurora PostgreSQL database connection details
    host = 'your-aurora-postgres-endpoint'
    port = 5432
    database = 'your-database-name'
    user = 'your-username'
    password = 'your-password'

    # Connect to the Aurora PostgreSQL database
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )
    
    # Execute INSERT statement to store login data
    query = "INSERT INTO your_table (username, password) VALUES (%s, %s);"
    cursor = conn.cursor()
    cursor.execute(query, (username, password))
    conn.commit()
    
    # Close the database connection
    cursor.close()
    conn.close()

def lambda_handler(event, context):
    # Extract username and password from the request body
    body = event['body']
    username = body['username']
    password = body['password']

    # Store login data in Aurora PostgreSQL
    store_login_data(username, password)

    # Return a response
    response = {
        'statusCode': 200,
        'body': 'Login data stored successfully'
    }

    return response
