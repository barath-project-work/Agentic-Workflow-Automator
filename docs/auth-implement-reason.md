# 🔐 Auth Service — Implementation Plan

> **Project:** AtlasAI — Agentic Sales Workflow Automation Platform
> **Service:** Auth Service (Port 8081)
> **Date:** July 2026

---

## 📋 Table of Contents

1. [What is the Auth Service?](#-what-is-the-auth-service)
2. [Core Responsibilities](#-core-responsibilities)
3. [API Endpoints](#-api-endpoints)
4. [Implementation Architecture](#-implementation-architecture)
5. [File-by-File Breakdown](#-file-by-file-breakdown)
6. [Security Flow (End-to-End)](#-security-flow-end-to-end)
7. [Design Decisions & Rationale](#-design-decisions--rationale)

---

## 🔐 What is the Auth Service?

The **auth-service** is the gateway for all authentication and authorization in AtlasAI. It's the **first service every user interacts with** — and every other microservice depends on it to validate requests.

It handles:
- User registration & login
- JWT access token issuance (short-lived)
- Refresh token management (long-lived, revocable)
- Role-Based Access Control (RBAC) with 3 roles
- User management (admin-only)
- Token validation for downstream services

---

## 🎯 Core Responsibilities

| Concern | Implementation |
|---------|---------------|
| **User Registration** | Creates accounts with bcrypt-hashed passwords |
| **User Login** | Authenticates credentials, issues JWT token pair |
| **JWT Issuance** | Generates HMAC-SHA256 signed access tokens |
| **Token Validation** | Parses & verifies JWT signature, expiry, and claims |
| **Refresh Token Flow** | Issues new access tokens without re-authentication |
| **Role-Based Access (RBAC)** | 3 roles: USER, MANAGER, ADMIN — controls endpoint access |
| **User Management** | Admin-only CRUD for system users |
| **Token Revocation** | Refresh tokens stored in DB — can be revoked on logout |

---

## 📡 API Endpoints

| Method | Path | Purpose | Auth Required | Role Required |
|--------|------|---------|---------------|--------------|
| `POST` | `/api/auth/register` | Create a new user account | ❌ Public | — |
| `POST` | `/api/auth/login` | Authenticate and get JWT tokens | ❌ Public | — |
| `POST` | `/api/auth/refresh` | Refresh an expired access token | ✅ Refresh Token | — |
| `POST` | `/api/auth/logout` | Revoke refresh token | ✅ JWT | — |
| `GET` | `/api/auth/me` | Get current user profile | ✅ JWT | — |
| `GET` | `/api/users` | List all users | ✅ JWT | ADMIN |
| `GET` | `/api/users/{id}` | Get user by ID | ✅ JWT | ADMIN |

### Request/Response Schemas

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "password": "securePassword123"
}
```

**Login Request:**
```json
{
  "email": "john@company.com",
  "password": "securePassword123"
}
```

**Auth Response (Login & Register):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "dGhpcyBpcyBhIHJlZnJl...",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "user": {
    "id": "uuid-123",
    "name": "John Doe",
    "email": "john@company.com",
    "role": "ROLE_USER"
  }
}
```

**User Response:**
```json
{
  "id": "uuid-123",
  "name": "John Doe",
  "email": "john@company.com",
  "role": "ROLE_USER",
  "createdAt": "2026-07-02T12:00:00Z"
}
```

---

## 🏗️ Implementation Architecture

```
auth-service/src/main/java/com/atlasai/auth/
├── AuthApplication.java                      ← Spring Boot entry point
├── config/
│   ├── SecurityConfig.java                   ← Spring Security filter chain
│   └── JwtConfig.java                        ← JWT properties mapping
├── controller/
│   ├── AuthController.java                   ← /api/auth/* endpoints
│   └── UserController.java                   ← /api/users/* (admin)
├── service/
│   ├── AuthService.java                      ← Business logic
│   └── JwtService.java                       ← Token operations
├── repository/
│   └── UserRepository.java                   ← JPA data access
└── model/
    ├── User.java                             ← JPA Entity
    ├── Role.java                             ← Enum (USER/MANAGER/ADMIN)
    ├── request/
    │   ├── LoginRequest.java
    │   ├── RegisterRequest.java
    │   └── RefreshTokenRequest.java
    └── response/
        ├── AuthResponse.java
        └── UserResponse.java
```

### Layer Responsibilities

| Layer | Package | Responsibility |
|-------|---------|---------------|
| **Model** | `.model.*` | JPA entity (User), enum (Role), request DTOs, response DTOs |
| **Repository** | `.repository.*` | Spring Data JPA interface for database operations |
| **Service** | `.service.*` | Business logic — authentication, token management |
| **Controller** | `.controller.*` | REST endpoints — HTTP request/response handling |
| **Config** | `.config.*` | Spring Security configuration, JWT properties |

---

## 📄 File-by-File Breakdown

### 1. `model/Role.java` — Enum

Defines three user roles for RBAC:
```java
public enum Role {
    ROLE_USER,
    ROLE_MANAGER,
    ROLE_ADMIN
}
```

### 2. `model/User.java` — JPA Entity

Maps to the `users` table in PostgreSQL:

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `name` | VARCHAR(255) | Not null |
| `email` | VARCHAR(255) | Unique, not null |
| `password` | VARCHAR(255) | Bcrypt hashed |
| `role` | VARCHAR(20) | Enum: ROLE_USER, ROLE_MANAGER, ROLE_ADMIN |
| `created_at` | TIMESTAMP | Auto-set |
| `updated_at` | TIMESTAMP | Auto-set on update |

Uses `@PrePersist` and `@PreUpdate` lifecycle callbacks for automatic timestamps.

### 3. Request DTOs (`LoginRequest`, `RegisterRequest`, `RefreshTokenRequest`)

Simple Java records (or classes) annotated with `@Data` (Lombok) and `@NotBlank` validation annotations.

### 4. Response DTOs (`AuthResponse`, `UserResponse`)

Immutable data carriers for API responses. `AuthResponse` holds the JWT pair + user info.

### 5. `repository/UserRepository.java`

Spring Data JPA interface:
```java
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
```

### 6. `config/JwtConfig.java`

Maps `app.jwt.*` properties from `application.yml`:
```java
@ConfigurationProperties(prefix = "app.jwt")
public class JwtConfig {
    private String secret;         // HMAC signing key
    private long expirationMs;     // Access token TTL (1 hour)
    private long refreshExpirationMs; // Refresh token TTL (7 days)
}
```

### 7. `config/SecurityConfig.java`

Spring Security configuration:
- **Disables CSRF** — stateless API doesn't need it
- **Stateless session** — no HTTP sessions
- **Public endpoints** — `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh`
- **Admin endpoints** — `/api/users/**` requires ADMIN role
- **Authenticated endpoints** — all other `/api/**` require valid JWT
- **BCrypt password encoder** — for secure password hashing
- **JwtAuthenticationFilter** — custom filter that extracts JWT from `Authorization: Bearer` header, validates it, and sets the security context

### 8. `service/JwtService.java`

Core token operations:
- **generateAccessToken(user)** — creates JWT with claims (sub=userId, email, role, iat, exp) signed with HMAC-SHA256 via JJWT library
- **generateRefreshToken(user)** — creates a longer-lived token stored in DB
- **validateToken(token)** — parses JWT, verifies signature and expiry, returns userId
- **getUserIdFromToken(token)** — extracts the subject claim (user ID)

### 9. `service/AuthService.java`

Business logic:
- **register(request)** — checks for duplicate email, hashes password with BCrypt, saves user, generates JWT pair
- **login(request)** — finds user by email, verifies password, generates JWT pair
- **refreshToken(request)** — validates refresh token string against DB, generates new access token
- **logout(userId)** — removes refresh token from DB

### 10. `controller/AuthController.java`

REST endpoints:
- `POST /api/auth/register` → 201 Created
- `POST /api/auth/login` → 200 OK
- `POST /api/auth/refresh` → 200 OK
- `POST /api/auth/logout` → 200 OK
- `GET /api/auth/me` → 200 OK (returns current user)

### 11. `controller/UserController.java`

Admin-only endpoints:
- `GET /api/users` → paginated list of all users
- `GET /api/users/{id}` → single user details

---

## 🔄 Security Flow (End-to-End)

### Registration Flow
```
1. User → POST /api/auth/register { name, email, password }
2. AuthService: validate no duplicate email
3. AuthService: hash password with BCrypt
4. UserRepository: save user to PostgreSQL
5. JwtService: generate accessToken (1hr) + refreshToken (7d)
6. Response: { accessToken, refreshToken, user }
```

### Login Flow
```
1. User → POST /api/auth/login { email, password }
2. AuthService: find user by email in DB
3. AuthService: verify BCrypt hash matches
4. JwtService: generate accessToken (1hr) + refreshToken (7d)
5. Response: { accessToken, refreshToken, user }
```

### Authenticated Request Flow
```
1. User → GET /api/customers (Header: Authorization: Bearer <token>)
2. JwtAuthenticationFilter: extract token from header
3. JwtService: validateToken(token) — parse JWT, verify HMAC signature, check expiry
4. SecurityContextHolder: set authentication for this request
5. Request proceeds to the controller
```

### Token Refresh Flow
```
1. User → POST /api/auth/refresh { refreshToken }
2. AuthService: find refresh token in DB
3. AuthService: verify token is not expired or revoked
4. JwtService: generate new accessToken
5. Response: { accessToken }
```

### Logout Flow
```
1. User → POST /api/auth/logout (Header: Authorization: Bearer <token>)
2. AuthService: delete refresh token from DB
3. Response: { message: "Logged out successfully" }
```

---

## 🎯 Design Decisions & Rationale

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Password Hashing** | BCrypt via Spring Security | Industry standard — adaptive cost factor, built-in salt, resistant to brute force |
| **Authentication Protocol** | Stateless JWT | No server-side session storage — scales horizontally, works with microservices |
| **JWT Library** | JJWT (io.jsonwebtoken) | Most popular Java JWT library, actively maintained, fluent API |
| **Signing Algorithm** | HMAC-SHA256 (HS256) | Symmetric key — simple setup, no need for RSA key pair management at this stage |
| **Access Token TTL** | 1 hour | Short enough to limit damage if stolen, long enough to avoid excessive refresh calls |
| **Refresh Token TTL** | 7 days | Balances security with user convenience; stored in DB for revocation |
| **Refresh Token Storage** | PostgreSQL (users table) | Allows server-side revocation on logout; no separate infrastructure needed |
| **Token in Header** | `Authorization: Bearer <token>` | Standard HTTP authentication header — works with all HTTP clients, proxies, and gateways |
| **Role Enum** | 3 roles: USER, MANAGER, ADMIN | Matches the 3 personas defined in the PRD — sales rep, manager, ops/admin |
| **Security Framework** | Spring Security + OAuth2 Resource Server | Native Spring integration, declarative security with annotations |
| **Password Validation** | Bean Validation (`@NotBlank`, `@Email`, `@Size`) | Declarative validation on DTOs — consistent error messages |
| **API Error Handling** | `@ControllerAdvice` + standardized error response | Consistent JSON error format across all endpoints |

### Why JWT over Session-Based Auth?

| Aspect | JWT (Stateless) | Session (Stateful) |
|--------|-----------------|-------------------|
| **Scalability** | ✅ Any service instance can validate without shared session store | ❌ Requires centralized session store (Redis) or sticky sessions |
| **Microservice-friendly** | ✅ Each service validates JWT locally via public key | ❌ Each service must query auth service or session store |
| **Performance** | ✅ No DB lookup per request | ❌ Session lookup per request |
| **Revocation** | ❌ Can't revoke access tokens until expiry | ✅ Can kill session immediately |
| **Token Size** | ❌ Larger payload (base64-encoded claims) | ✅ Small session ID cookie |

**Our compromise:** Short-lived access tokens (1hr) + DB-stored refresh tokens that CAN be revoked. Best of both worlds.

---

## 🔗 Related Files

| File | Purpose |
|------|---------|
| [`pom.xml`](../../services/auth-service/pom.xml) | Maven dependencies (Spring Security, JPA, JJWT) |
| [`application.yml`](../../services/auth-service/src/main/resources/application.yml) | Service config (port 8081, DB, JWT settings) |
| [`AuthApplication.java`](../../services/auth-service/src/main/java/com/atlasai/auth/AuthApplication.java) | Spring Boot entry point |
| [`Dockerfile`](../../services/auth-service/Dockerfile) | Container build (eclipse-temurin:21-jre-alpine) |
