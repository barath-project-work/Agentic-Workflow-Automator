# ═══════════════════════════════════════════════════════════════════
# Stage 1: Build with Maven
# ═══════════════════════════════════════════════════════════════════
FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

# Copy pom.xml and download dependencies first (for better caching)
COPY pom.xml ./
RUN mvn dependency:go-offline -q || true

# Copy source code
COPY src/ src/

# Build the JAR (skip tests for faster build)
RUN mvn package -DskipTests -q

# ═══════════════════════════════════════════════════════════════════
# Stage 2: Run with JRE
# ═══════════════════════════════════════════════════════════════════
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/customer-service-*.jar app.jar

# Expose customer service port
EXPOSE 8082

# Health check (uses PORT env var with fallback to 8082)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:${PORT:-8082}/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
