# Use the official Redis image
FROM redis:latest

# Copy custom Redis configuration
COPY redis.conf /usr/local/etc/redis/redis.conf

# Set the working directory for Redis data
WORKDIR /data

# Expose the Redis port
EXPOSE 6379

# Command to run Redis with the custom configuration
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
