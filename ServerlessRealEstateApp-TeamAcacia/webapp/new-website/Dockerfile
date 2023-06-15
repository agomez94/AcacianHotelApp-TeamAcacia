# Use the official httpd image as the base image
FROM httpd:latest

WORKDIR /usr/local/apache2/htdocs

# Copy the index.html file into the default Apache document root directory
COPY ./new-website/index.html .
COPY ./new-website/login.html .
COPY ./new-website/signup.html .

COPY ./new-website/hotel.jpg .
COPY ./new-website/pexels-donald-tong-189296.jpg .
COPY ./new-website/pexels-pixabay-53464.jpg .
COPY ./new-website/pexels-pixabay-261102.jpg .
COPY ./new-website/pexels-thorsten-technoman-338504.jpg .

COPY ./new-website/main.js .


# Expose port 80 to allow incoming HTTP traffic
EXPOSE 80