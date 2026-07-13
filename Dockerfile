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
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy built JAR
COPY --from=backend-builder /app/backend/target/placement-prep-portal-1.0.0.jar app.jar

# Install Node and serve for frontend
RUN apt-get update && apt-get install -y nodejs npm && npm install -g serve

# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist /app/frontend-dist

# Copy startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8080 3000

# Start both services
ENTRYPOINT ["/app/start.sh"]
