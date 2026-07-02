package com.atlasai.auth.controller;

import com.atlasai.auth.model.request.LoginRequest;
import com.atlasai.auth.model.request.RefreshTokenRequest;
import com.atlasai.auth.model.request.RegisterRequest;
import com.atlasai.auth.model.response.AuthResponse;
import com.atlasai.auth.model.response.UserResponse;
import com.atlasai.auth.service.AuthService;
import com.atlasai.auth.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        UUID userId = jwtService.extractUserId(token);
        if (userId != null) {
            authService.logout(userId);
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        UUID userId = jwtService.extractUserId(token);
        UserResponse response = authService.getCurrentUser(userId);
        return ResponseEntity.ok(response);
    }
}
