# Use the official httpd image as the base image
FROM httpd:2.4

WORKDIR /usr/local/apache2/htdocs/
RUN chmod -R 755 /usr/local/apache2/htdocs/
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

RUN chown www-data:www-data /usr/local/apache2/htdocs/ -R

EXPOSE 80 443

# RUN rm -rf /etc/apache2/sites-enabled/000-default.conf