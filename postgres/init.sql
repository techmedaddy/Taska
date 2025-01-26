-- Create the database
CREATE DATABASE taksa;

-- Create a user with a password
CREATE USER taksa_user WITH PASSWORD 'password';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE taksa TO taksa_user;
