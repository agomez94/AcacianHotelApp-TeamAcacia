# Use the official httpd image as the base image
FROM httpd:latest

# Copy the index.html file into the default Apache document root directory
# COPY index.html /usr/local/apache2/htdocs/
# COPY login.html /usr/local/apache2/htdocs/
# COPY signup.html /usr/local/apache2/htdocs/

# COPY hotel.jpg /usr/local/apache2/htdocs/images
# COPY pexels-donald-tong-189296.jpg /usr/local/apache2/htdocs/images
# COPY pexels-pixabay-53464.jpg /usr/local/apache2/htdocs/images
# COPY pexels-pixabay-261102.jpg /usr/local/apache2/htdocs/images
# COPY pexels-thorsten-technoman-338504.jpg /usr/local/apache2/htdocs/images

# COPY main.js /usr/local/apache2/htdocs/
COPY index.html ServerlessRealEstateApp-TeamAcacia/webapp/new-website/index.html
COPY login.html ServerlessRealEstateApp-TeamAcacia/webapp/new-website/login.html
COPY signup.html ServerlessRealEstateApp-TeamAcacia/webapp/new-website/signup.html

COPY hotel.jpg ServerlessRealEstateApp-TeamAcacia/webapp/new-website/hotel.jpg
COPY pexels-donald-tong-189296.jpg ServerlessRealEstateApp-TeamAcacia/webapp/new-website/pexels-donald-tong-189296.jpg
COPY pexels-pixabay-53464.jpg ServerlessRealEstateApp-TeamAcacia/webapp/new-website/pexels-pixabay-53464.jpg
COPY pexels-pixabay-261102.jpg ServerlessRealEstateApp-TeamAcacia/webapp/new-website/pexels-pixabay-261102.jpg
COPY pexels-thorsten-technoman-338504.jpg ServerlessRealEstateApp-TeamAcacia/webapp/new-website/pexels-thorsten-technoman-338504.jpg

COPY main.js ServerlessRealEstateApp-TeamAcacia/webapp/new-website/main.js
            

# Expose port 80 to allow incoming HTTP traffic
EXPOSE 80