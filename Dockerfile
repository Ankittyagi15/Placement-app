# Build stage - backend
FROM maven:3.9-eclipse-temurin-21 AS backend-builder
WORKDIR /app
COPY . .
WORKDIR /app/backend
RUN mvn clean package -DskipTests -B -q

# Build stage - frontend
FROM node:21-alpine AS frontend-builder
WORKDIR /app
COPY frontend/ /app/frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Runtime stage
FROM node:21-alpine AS runtime
WORKDIR /app

# Install Java runtime for backend
RUN apk add --no-cache openjdk21-jre

# Copy built JAR
COPY --from=backend-builder /app/backend/target/placement-prep-portal-1.0.0.jar app.jar

# Install serve for frontend
RUN npm install -g serve

# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist /app/frontend-dist

# Copy startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8080 3000

# Start both services with sh instead of bash (Alpine compatible)
ENTRYPOINT ["/bin/sh", "/app/start.sh"]
