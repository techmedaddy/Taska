# Use the official Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files for dependency installation
COPY package.json yarn.lock ./

# Install all dependencies
RUN yarn install

# Copy the entire application code into the container
COPY . .

# Set environment variables for testing (optional, can be overridden at runtime)
ENV NODE_ENV=testing
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=5432
ENV DATABASE_USER=taksa_user
ENV DATABASE_PASSWORD=password
ENV DATABASE_NAME=taksa_test
ENV JWT_SECRET=my_jwt_secret

# Run the tests using Jest
CMD ["yarn", "test"]
