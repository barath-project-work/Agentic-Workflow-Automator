package com.atlasai.task.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DataSourceConfig {

    @Bean
    @Primary
    public DataSource dataSource() throws URISyntaxException {
        String databaseUrl = System.getenv("DATABASE_URL");

        if (databaseUrl == null || databaseUrl.isBlank()) {
            return DataSourceBuilder.create()
                    .url("jdbc:postgresql://localhost:5432/atlasai")
                    .username("atlasai")
                    .password("atlasai_secret")
                    .driverClassName("org.postgresql.Driver")
                    .build();
        }

        URI uri = new URI(databaseUrl);

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

        String dbName = (path != null && path.startsWith("/")) ? path.substring(1) : "atlasai";
        String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", host, port, dbName);

        return DataSourceBuilder.create()
                .url(jdbcUrl)
                .username(username)
                .password(password)
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
