# Stage 1: Build stage
FROM oven/bun:alpine AS build
WORKDIR /app
COPY package*.json bun.lock ./

# Install dependencies with bun
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript
RUN bun run build

# Stage 2: Production stage
FROM oven/bun:alpine
WORKDIR /app
COPY package*.json bun.lock ./

# Install dependencies with bun, ONLY production dependencies
RUN bun install --frozen-lockfile --production

# Copy built application from build stage
COPY --from=build /app/dist ./dist

EXPOSE 3000

# Start application with bun runtime
CMD ["bun", "run", "dist/server.js"]