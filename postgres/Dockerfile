# Use the official PostgreSQL image
FROM postgres:latest

# Set the working directory inside the container
WORKDIR /docker-entrypoint-initdb.d

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Copy custom PostgreSQL configuration files
COPY postgres.conf /etc/postgresql/postgresql.conf
COPY pg_hba.conf /etc/postgresql/pg_hba.conf

# Expose the PostgreSQL port
EXPOSE 5432

# Command to run the PostgreSQL server with the custom configuration
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
