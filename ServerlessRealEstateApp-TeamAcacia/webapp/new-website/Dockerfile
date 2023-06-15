# Use the official httpd image as the base image
FROM httpd:latest

WORKDIR /usr/local/apache2/htdocs

# Copy the index.html file into the default Apache document root directory
COPY ./webapp/new-website/index.html .
COPY ./webapp/new-website/login.html .
COPY ./webapp/new-website/signup.html .

COPY ./webapp/new-website/hotel.jpg .
COPY ./webapp/new-website/pexels-donald-tong-189296.jpg .
COPY ./webapp/new-website/pexels-pixabay-53464.jpg .
COPY ./webapp/new-website/pexels-pixabay-261102.jpg .
COPY ./webapp/new-website/pexels-thorsten-technoman-338504.jpg .

COPY ./webapp/new-website/main.js .


# Expose port 80 to allow incoming HTTP traffic
EXPOSE 80