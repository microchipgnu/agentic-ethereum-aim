FROM node:slim

WORKDIR /app

# Install aimx using npm
RUN npm install -g aimx@0.1.56

# Echo aimx version
RUN aimx -V

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Expose port 3000 and bind to all interfaces
EXPOSE 3000

# Set default command to run aimx start
CMD ["aimx", "serve", "files"]
