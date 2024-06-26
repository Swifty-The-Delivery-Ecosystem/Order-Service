# Use the official Node.js 14 image as a base
FROM node:21

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8000 (or any other port your application listens on)
EXPOSE 8000

# Command to run the application
CMD ["npm", "run", "start:development"]