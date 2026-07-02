package com.atlasai.auth.service;

import com.atlasai.auth.model.Role;
import com.atlasai.auth.model.User;
import com.atlasai.auth.model.request.LoginRequest;
import com.atlasai.auth.model.request.RefreshTokenRequest;
import com.atlasai.auth.model.request.RegisterRequest;
import com.atlasai.auth.model.response.AuthResponse;
import com.atlasai.auth.model.response.UserResponse;
import com.atlasai.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        var user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.ROLE_USER)
            .build();

        user = userRepository.save(user);

        return generateAuthResponse(user);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid email or password");
        }

        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        return generateAuthResponse(user);
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String rawToken = request.getRefreshToken();

        if (jwtService.isTokenExpired(rawToken)) {
            throw new IllegalArgumentException("Refresh token has expired");
        }

        if (!jwtService.isRefreshToken(rawToken)) {
            throw new IllegalArgumentException("Invalid token type — expected refresh token");
        }

        String email = jwtService.extractEmail(rawToken);
        if (email == null) {
            throw new IllegalArgumentException("Invalid refresh token");
        }

        var user = userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Verify the refresh token hash matches the stored hash (revocation check)
        String tokenHash = jwtService.hashToken(rawToken);
        if (user.getRefreshTokenHash() == null || !user.getRefreshTokenHash().equals(tokenHash)) {
            throw new IllegalArgumentException("Refresh token has been revoked");
        }

        return generateAuthResponse(user);
    }

    @Transactional
    public void logout(UUID userId) {
        var user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setRefreshTokenHash(null);
        userRepository.save(user);
    }

    public UserResponse getCurrentUser(UUID userId) {
        var user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return toUserResponse(user);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
            .map(this::toUserResponse)
            .toList();
    }

    public UserResponse getUserById(UUID id) {
        var user = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return toUserResponse(user);
    }

    private AuthResponse generateAuthResponse(User user) {
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        // Store hashed refresh token for revocation support
        user.setRefreshTokenHash(jwtService.hashToken(refreshToken));
        userRepository.save(user);

        return AuthResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .tokenType("Bearer")
            .expiresIn(3600)
            .userId(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .role(user.getRole().name())
            .build();
    }

    private UserResponse toUserResponse(User user) {
        return UserResponse.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .role(user.getRole().name())
            .createdAt(user.getCreatedAt())
            .build();
    }
}
