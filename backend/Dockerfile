FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY backend /app
WORKDIR /app
RUN mvn clean package -DskipTests -B -q

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=builder /app/target/placement-prep-portal-1.0.0.jar /app/app.jar

# Expose default port (Render will set $PORT environment variable)
EXPOSE 8080

# Use the PORT env if provided by the host
ENTRYPOINT ["sh", "-c", "exec java -jar /app/app.jar --server.port=${PORT:-8080}"]
