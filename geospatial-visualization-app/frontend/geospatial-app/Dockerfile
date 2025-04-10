# Use official Node.js image with version 22.11.0
FROM node:22.11.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build the React app
RUN npm run build

# Serve React with npm start
CMD ["npm", "start"]
