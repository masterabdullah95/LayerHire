# Build stage
FROM oven/bun:alpine AS build
WORKDIR /app

# Declare build argument
ARG VITE_API_URL
ARG VITE_APP_URL
# Make it available to Vite during build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_URL=$VITE_APP_URL

COPY package*.json bun.lock ./

# Install dependencies with bun
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application with bun
RUN bun run build

# Production stage - use nginx to serve static files
FROM oven/bun:alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

EXPOSE 5173

CMD ["bunx", "serve", "-s", "dist", "-l", "5173"]