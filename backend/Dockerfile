# Step 1: Base image
FROM node:20-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json & package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy project files
COPY . .

# Step 6: Generate Prisma client for Linux inside container
RUN npx prisma generate

# Step 7: Build the project (if using TypeScript)
RUN npm run build

# Step 8: Expose port 5000
EXPOSE 5000

# Step 9: Start the app
CMD ["npm", "start"]
