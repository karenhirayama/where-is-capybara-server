FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Install PostgreSQL client for health check
RUN apt-get update && apt-get install -y postgresql-client

EXPOSE 3000

CMD ["npm", "start"]