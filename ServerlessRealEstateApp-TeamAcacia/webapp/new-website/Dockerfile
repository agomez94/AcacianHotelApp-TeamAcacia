# Use the official httpd image as the base image
FROM httpd:latest

# Copy the index.html file into the default Apache document root directory
COPY index.html /usr/local/apache2/htdocs/
COPY login.html /usr/local/apache2/htdocs/
COPY signup.html /usr/local/apache2/htdocs/

COPY hotel.jpg /usr/local/apache2/htdocs/images
COPY pexels-donald-tong-189296.jpg /usr/local/apache2/htdocs/images
COPY pexels-pixabay-53464.jpg /usr/local/apache2/htdocs/images
COPY pexels-pixabay-261102.jpg /usr/local/apache2/htdocs/images
COPY pexels-thorsten-technoman-338504.jpg /usr/local/apache2/htdocs/images

COPY main.js /usr/local/apache2/htdocs/


# Expose port 80 to allow incoming HTTP traffic
EXPOSE 80