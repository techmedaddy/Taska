# Use the official Nginx image
FROM nginx:latest

# Copy the main Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy additional configuration files
COPY conf.d/ /etc/nginx/conf.d/

# Expose port 80 to allow traffic to the Nginx container
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
