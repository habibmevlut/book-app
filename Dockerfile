# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the built Angular app into the Nginx web server directory
COPY ./dist/my-angular-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
