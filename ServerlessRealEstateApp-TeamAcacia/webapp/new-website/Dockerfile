# Use the official httpd image as the base image
FROM httpd:latest

WORKDIR /var/www/html

# Copy the index.html file into the default Apache document root directory
COPY ServerlessRealEstateApp-TeamAcacia/webapp/new-website/index.html .
COPY ServerlessRealEstateApp-TeamAcacia/webapp/new-website/login.html .
COPY ServerlessRealEstateApp-TeamAcacia/webapp/new-website/signup.html .

COPY ServerlessRealEstateApp-TeamAcacia/webapp/new-website/hotel.jpg .
COPY ServerlessRealEstateApp-TeamAcacia/webapp/new-website/pexels-donald-tong-189296.jpg .
COPY ServerlessRealEstateApp-TeamAcacia/webapp/new-website/pexels-pixabay-53464.jpg .
COPY ServerlessRealEstateApp-TeamAcacia/webapp/new-website/pexels-pixabay-261102.jpg .
COPY ServerlessRealEstateApp-TeamAcacia/webapp/new-website/pexels-thorsten-technoman-338504.jpg .

COPY ServerlessRealEstateApp-TeamAcacia/webapp/new-website/main.js .


# Expose port 80 to allow incoming HTTP traffic
# EXPOSE 5000

RUN rm -rf /etc/apache2/sites-enabled/000-default.conf