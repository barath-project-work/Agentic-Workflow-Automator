package com.atlasai.auth.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * Reads Railway's native {@code DATABASE_URL} environment variable
 * (format: {@code postgresql://user:password@host:5432/dbname})
 * and configures the DataSource from it.
 *
 * Falls back to application.yml defaults when {@code DATABASE_URL} is not set.
 */
@Configuration
public class DataSourceConfig {

    @Bean
    @Primary
    public DataSource dataSource() throws URISyntaxException {
        String databaseUrl = System.getenv("DATABASE_URL");

        if (databaseUrl == null || databaseUrl.isBlank()) {
            // Fall back to application.yml defaults
            return DataSourceBuilder.create()
                    .url("jdbc:postgresql://localhost:5432/atlasai")
                    .username("atlasai")
                    .password("atlasai_secret")
                    .driverClassName("org.postgresql.Driver")
                    .build();
        }

        URI uri = new URI(databaseUrl);

        // DATABASE_URL format: postgresql://user:password@host:port/dbname
        String userInfo = uri.getUserInfo();
        String username = "";
        String password = "";

        if (userInfo != null) {
            String[] parts = userInfo.split(":", 2);
            username = parts[0];
            if (parts.length > 1) {
                password = parts[1];
            }
        }

        String host = uri.getHost();
        int port = uri.getPort();
        String path = uri.getPath();

        // Strip leading slash from path to get db name
        String dbName = (path != null && path.startsWith("/")) ? path.substring(1) : "atlasai";

        // Build JDBC URL: jdbc:postgresql://host:port/dbname
        String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", host, port, dbName);

        return DataSourceBuilder.create()
                .url(jdbcUrl)
                .username(username)
                .password(password)
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
