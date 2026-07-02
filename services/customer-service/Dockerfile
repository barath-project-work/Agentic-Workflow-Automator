FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/customer-service-*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
