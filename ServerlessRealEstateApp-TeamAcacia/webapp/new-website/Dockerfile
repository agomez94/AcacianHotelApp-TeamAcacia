# Use the official httpd image as the base image
FROM httpd:latest

WORKDIR /usr/local/apache2/htdocs

# Copy the index.html file into the default Apache document root directory
COPY index.html .
COPY login.html .
COPY signup.html .

COPY hotel.jpg .
COPY pexels-donald-tong-189296.jpg .
COPY pexels-pixabay-53464.jpg .
COPY pexels-pixabay-261102.jpg .
COPY pexels-thorsten-technoman-338504.jpg .

COPY main.js .


# Expose port 80 to allow incoming HTTP traffic
EXPOSE 80