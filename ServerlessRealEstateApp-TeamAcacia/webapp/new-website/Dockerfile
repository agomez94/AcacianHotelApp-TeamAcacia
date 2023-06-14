# Use the official httpd image as the base image
FROM httpd:latest

WORKDIR /var/www/html 

COPY . /usr/local/apache2/htdocs/             

# Expose port 80 to allow incoming HTTP traffic
EXPOSE 80