# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application's source code to the container
COPY . .

# Compile TypeScript to JavaScript
RUN npm run start:prod

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run your application
CMD ["node", "dist/index.js"]