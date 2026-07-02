package com.atlasai.auth.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class UserResponse {

    private UUID id;
    private String name;
    private String email;
    private String role;
    private LocalDateTime createdAt;
}
