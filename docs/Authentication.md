# 🔐 Authentication & Authorization

> **Service:** Auth Service (Port 8081)
> **Stack:** Java 21, Spring Boot 3.3, Spring Security 6, JJWT 0.12.6, PostgreSQL

---

## Architecture

```
Request → Nginx → /api/auth/* → Auth Service (8081)
                                  │
                                  ├── JwtAuthenticationFilter
                                  │   ├── Extract "Bearer <token>"
                                  │   ├── Parse JWT (HMAC-SHA256)
                                  │   ├── Validate: signature, expiry, user exists
                                  │   ├── On success → set SecurityContextHolder
                                  │   └── On failure → log WARN, clear context, continue chain
                                  │
                                  └── SecurityConfig
                                      ├── /api/auth/register, /login, /refresh → permitAll()
                                      ├── /api/users/** → ADMIN only
                                      ├── /api/** → authenticated()
                                      └── Stateless sessions (no HttpSession)
```

---

## JWT Token Structure

### Access Token (1 hour expiry)

```json
// Decoded JWT payload
{
  "sub": "user@email.com",
  "role": "ROLE_USER",
  "email": "user@email.com",
  "userId": "362b4a35-e51b-42fc-b335-f86fe26128b7",
  "iat": 1783232863,
  "exp": 1783236463
}
```

**Signed with:** HMAC-SHA256 via `Keys.hmacShaKeyFor()`
**Claims:** `sub` (email), `role`, `email`, `userId` (UUID), `iat`, `exp`

### Refresh Token (7 day expiry)

```json
{
  "sub": "user@email.com",
  "type": "refresh",
  "iat": 1783232863,
  "exp": 1783837663
}
```

---

## Endpoints

| Method | Path | Auth | Role | Description |
|--------|------|------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | — | Create account |
| `POST` | `/api/auth/login` | ❌ | — | Login → access + refresh tokens |
| `POST` | `/api/auth/refresh` | ❌ | — | Exchange refresh token for new pair |
| `POST` | `/api/auth/logout` | ✅ | Any | Revoke refresh token |
| `GET` | `/api/auth/me` | ✅ | Any | Current user profile |
| `GET` | `/api/users` | ✅ | ADMIN | List all users |
| `GET` | `/api/users/{id}` | ✅ | ADMIN | Get user by ID |

---

## Request/Response Schemas

### Register

```json
// POST /api/auth/register
// Request
{ "name": "John Doe", "email": "john@company.com", "password": "securePass123" }

// Response (201 Created)
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "userId": "362b4a35-e51b-42fc-b335-f86fe26128b7",
  "name": "John Doe",
  "email": "john@company.com",
  "role": "ROLE_USER"
}
```

### Login

```json
// POST /api/auth/login
// Request
{ "email": "john@company.com", "password": "securePass123" }

// Response (200 OK) — same schema as register response
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "userId": "362b4a35-...",
  "name": "John Doe",
  "email": "john@company.com",
  "role": "ROLE_USER"
}
```

---

## RBAC Matrix

| Endpoint | USER | MANAGER | ADMIN |
|----------|------|---------|-------|
| `POST /api/auth/*` | ✅ | ✅ | ✅ |
| `GET /api/customers` | ✅ | ✅ | ✅ |
| `GET /api/opportunities` | ✅ | ✅ | ✅ |
| `POST /api/customers` | ✅ | ✅ | ✅ |
| `GET /api/users` | ❌ | ❌ | ✅ |
| `GET /api/users/{id}` | ❌ | ❌ | ✅ |

---

## Key Implementation Details

### JWT Generation (`JwtService.java`)

```java
private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(jwtConfig.getSecret().getBytes(StandardCharsets.UTF_8));
}

public String generateAccessToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("role", user.getRole().name());
    claims.put("email", user.getEmail());
    claims.put("userId", user.getId().toString());
    return buildToken(claims, user.getEmail(), jwtConfig.getExpirationMs());
}
```

### JWT Validation (`JwtAuthenticationFilter.java`)

```java
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
    final String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
    }
    try {
        final String jwt = authHeader.substring(7);
        final String userEmail = jwtService.extractEmail(jwt);
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
    } catch (Exception e) {
        log.warn("JWT validation failed for {} {}: {}", request.getMethod(), request.getRequestURI(), e.getMessage());
        SecurityContextHolder.clearContext();
    }
    filterChain.doFilter(request, response);
}
```

### Customer Service JWT Validation (`JwtAuthFilter.java`)

The customer service validates tokens **independently** using the same HMAC secret — no auth service dependency:

```java
SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
Claims claims = Jwts.parser()
    .verifyWith(key).build()
    .parseSignedClaims(token).getPayload();

String email = claims.getSubject();
String role = claims.get("role", String.class);
String userId = claims.get("userId", String.class);

List<SimpleGrantedAuthority> authorities = role != null
    ? List.of(new SimpleGrantedAuthority(role)) : List.of();
UsernamePasswordAuthenticationToken authToken =
    new UsernamePasswordAuthenticationToken(email, userId, authorities);
SecurityContextHolder.getContext().setAuthentication(authToken);
```

---

## Security Configuration (`SecurityConfig.java`)

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/register", "/api/auth/login", "/api/auth/refresh").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/api/users/**").hasRole("ADMIN")
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

---

## Refresh Token Revocation

Refresh tokens are stored as **SHA-256 hashes** in the `users` table. When a user logs out, the stored hash is cleared — the refresh token becomes unusable:

```java
// AuthService.logout()
user.setRefreshTokenHash(null);
userRepository.save(user);
```

```java
// AuthService.refreshToken() — revocation check
String tokenHash = jwtService.hashToken(rawToken);
if (user.getRefreshTokenHash() == null || !user.getRefreshTokenHash().equals(tokenHash)) {
    throw new IllegalArgumentException("Refresh token has been revoked");
}
```

---

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `DATABASE_URL` | Railway PostgreSQL connection string | ✅ |
| `JWT_SECRET` | HMAC-SHA256 signing key (min 256-bit) | ✅ Must match across all services |
| `PORT` | Server port (default: 8081) | ❌ |

---

## Related Files

| File | Location |
|------|----------|
| `SecurityConfig.java` | `services/auth-service/src/main/java/com/atlasai/auth/config/` |
| `JwtAuthenticationFilter.java` | `services/auth-service/src/main/java/com/atlasai/auth/config/` |
| `JwtService.java` | `services/auth-service/src/main/java/com/atlasai/auth/service/` |
| `AuthService.java` | `services/auth-service/src/main/java/com/atlasai/auth/service/` |
| `AuthController.java` | `services/auth-service/src/main/java/com/atlasai/auth/controller/` |
| `application.yml` | `services/auth-service/src/main/resources/` |
| `JwtAuthFilter.java` | `services/customer-service/src/main/java/com/atlasai/customer/config/` |

---

## Related Documentation

| Document | Link |
|----------|------|
| Architecture | [Architecture.md](Architecture.md) |
| API Reference | [API.md](API.md) |
| Deployment | [Deployment.md](Deployment.md) |
| Database schema | [Database.md](Database.md) |
