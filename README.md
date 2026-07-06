<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/AtlasAI-Agentic%20Sales%20Automation-8A2BE2?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0iIzhBMkJFMiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEyIiBmaWxsPSJ3aGl0ZSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjYiIGZpbGw9IiM4QTJCRTIiLz48L3N2Zz4=">
    <img alt="AtlasAI" src="https://img.shields.io/badge/AtlasAI-Agentic%20Sales%20Automation-8A2BE2?style=for-the-badge">
  </picture>
</p>

<p align="center">
  <b>Intelligent Agentic Workflow Automation for Enterprise Sales Teams</b>
  <br/>
  <i>Java 21 · Spring Boot 3.3 · React 18 · TypeScript · PostgreSQL · Docker · Railway</i>
</p>

<p align="center">
  <img alt="Java 21" src="https://img.shields.io/badge/Java-21-%23ED8B00?style=flat-square&logo=openjdk&logoColor=white">
  <img alt="Spring Boot" src="https://img.shields.io/badge/Spring_Boot-3.3-%236DB33F?style=flat-square&logo=spring&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-18-%2361DAFB?style=flat-square&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-%233178C6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-16-%234169E1?style=flat-square&logo=postgresql&logoColor=white">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-%232496ED?style=flat-square&logo=docker&logoColor=white">
  <img alt="Railway" src="https://img.shields.io/badge/Railway-Deployed-%230B0D0E?style=flat-square&logo=railway&logoColor=white">
  <img alt="JWT" src="https://img.shields.io/badge/JWT-HMACSHA256-%23000000?style=flat-square&logo=json-web-tokens&logoColor=white">
  <img alt="MUI" src="https://img.shields.io/badge/MUI-5-%23007FFF?style=flat-square&logo=mui&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-%23646CFF?style=flat-square&logo=vite&logoColor=white">
  <img alt="Python" src="https://img.shields.io/badge/Python-3.11-%233776AB?style=flat-square&logo=python&logoColor=white">
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-%23009688?style=flat-square&logo=fastapi&logoColor=white">
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Deployed Live Services](#-deployed-live-services)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Backend Deep Dive](#-backend-deep-dive)
  - [Auth Service](/services/auth-service)
  - [Customer/CRM Service](/services/customer-service)
  - [AI Agent Service](/services/ai-agent-service)
  - [Scaffolded Services](/services)
- [Frontend Deep Dive](#-frontend-deep-dive)
- [API Reference](#-api-reference)
- [Infrastructure & DevOps](#-infrastructure--devops)
- [Diagnosis & Debugging Highlights](#-diagnosis--debugging-highlights)
- [Getting Started](#-getting-started)
- [Deployment to Railway](#-deployment-to-railway)
- [What's Next](#-whats-next)

---

## 🚀 Overview

**AtlasAI** is a full-stack microservices platform for **agentic sales workflow automation**. It enables sales teams to manage customers, track opportunities, and automate follow-ups through AI-powered agents.

The platform follows a **microservices architecture** with separate, independently deployable services communicating over REST APIs, secured by JWT-based authentication and authorization.

### Live Demo

| Component | URL | Status |
|-----------|-----|--------|
| **Frontend** | [`cheerful-respect-production-1c45.up.railway.app`](https://cheerful-respect-production-1c45.up.railway.app) | 🟢 Live |
| **Auth API** | [`agentic-workflow-automator-production.up.railway.app`](https://agentic-workflow-automator-production.up.railway.app) | 🟢 Live |
| **Customer API** | [`customer-service-production-0ff7.up.railway.app`](https://customer-service-production-0ff7.up.railway.app) | 🟢 Live |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        🌐 Frontend                           │
│              React 18 · TypeScript · MUI 5 · Vite           │
│                    (Nginx reverse proxy)                     │
├───────────────┬─────────────────────────────┬───────────────┤
│  /api/auth/*  │   /api/customers/*          │ /api/opportunities/* │
│       │       │         │                   │       │       │
│       ▼       │         ▼                   │       ▼       │
│  ┌─────────┐  │   ┌──────────────────┐      │  ┌─────────┐  │
│  │  Auth   │  │   │   Customer/CRM   │      │  │         │  │
│  │ Service │  │   │     Service      │      │  │  Same   │  │
│  │ :8081   │  │   │     :8082        │      │  │ Service │  │
│  └────┬────┘  │   └────────┬─────────┘      │  └─────────┘  │
│       │       │            │                 │               │
│       ▼       │            ▼                 │               │
│  ┌─────────┐  │   ┌──────────────────┐      │               │
│  │PostgreSQL│  │   │   PostgreSQL    │      │               │
│  │ (Users)  │  │   │(Customers+Opps) │      │               │
│  └─────────┘  │   └──────────────────┘      │               │
└───────────────┴─────────────────────────────┴───────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   AI Agent       │
              │   Service        │
              │   (Python/FastAPI)│
              │   :8087          │
              └──────────────────┘
```

### Architecture Highlights

| Principle | Implementation |
|-----------|---------------|
| **Microservices** | Each service is a standalone Spring Boot application with its own database schema, build pipeline, and Docker container |
| **Stateless Auth** | JWT tokens (HMAC-SHA256) carry user identity and role — no server-side sessions |
| **API Gateway Pattern** | Nginx routes frontend requests to the correct backend service by URL path |
| **Separation of Concerns** | Auth, CRM, Workflow, Tasks, Notifications, and AI are all separate services |
| **Containerization** | Each service has a multi-stage Dockerfile for production deployment |

---

## 🌐 Deployed Live Services

| Service | Port | Stack | Status | What It Does |
|---------|------|-------|--------|-------------|
| **Frontend** | 80 (Nginx) | React, TypeScript, Vite, MUI | 🟢 Deployed | 40+ page SPA with auth, dashboard, customer management, opportunity tracking, admin panels |
| **Auth Service** | 8081 | Java 21, Spring Boot 3.3, JPA, PostgreSQL | 🟢 Deployed | User registration, login, JWT generation/validation, RBAC |
| **Customer Service** | 8082 | Java 21, Spring Boot 3.3, JPA, PostgreSQL | 🟢 Deployed | Customer CRUD, Opportunity CRUD, paginated search, JWT-protected APIs |
| **AI Agent Service** | 8087 | Python 3.11, FastAPI, OpenAI SDK | 🟡 Scaffolded | Orchestrator agent with CRM/Email/Calendar tool agents — needs OpenAI API key |
| **Workflow Service** | 8083 | Java 21 (scaffolded) | ⬜ Not started | Workflow orchestration engine |
| **Task Service** | 8084 | Java 21 (scaffolded) | ⬜ Not started | Task management for workflow steps |
| **Notification Service** | 8085 | Java 21 (scaffolded) | ⬜ Not started | Email/calendar integration |
| **Search Service** | 8086 | Java 21 (scaffolded) | ⬜ Not started | Vector search with pgvector |

---

## 🛠 Tech Stack

### Backend

| Technology | Version | Purpose | Used In |
|------------|---------|---------|---------|
| **Java** | 21 (LTS) | Primary backend language | All services |
| **Spring Boot** | 3.3.2 | Application framework | All Java services |
| **Spring Security** | 6.x | Authentication & authorization | Auth, Customer services |
| **Spring Data JPA** | 3.x | ORM & database access | Auth, Customer services |
| **Spring Validation** | 3.x | Request validation (Jakarta Bean Validation) | Auth, Customer services |
| **Spring Actuator** | 3.x | Health checks & metrics | Auth, Customer services |
| **JWT (JJWT)** | 0.12.6 | Stateless token auth | Auth, Customer services |
| **PostgreSQL** | 16 | Relational database | Auth, Customer services |
| **Lombok** | — | Boilerplate reduction | Auth, Customer services |
| **Maven** | 3.9+ | Build & dependency management | All Java services |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5.5.3 | Type-safe JavaScript |
| **Vite** | 5.3.4 | Build tool & dev server |
| **Material UI (MUI)** | 5.16.4 | Component library & design system |
| **React Router** | 6.26.0 | Client-side routing |
| **Zustand** | 4.5.4 | Lightweight state management |
| **TanStack Query** | 5.51.0 | Server state & caching |
| **Axios** | 1.7.2 | HTTP client with interceptors |
| **React Hook Form** | 7.52.1 | Form state management |
| **Recharts** | 2.12.7 | Sales analytics charts |
| **date-fns** | 3.6.0 | Date utilities |

### AI Layer (Scaffolded)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.11+ | AI agent runtime |
| **FastAPI** | 0.111 | REST API for agent service |
| **OpenAI SDK** | ≥1.35 | LLM integration (GPT-4, GPT-4o-mini) |
| **pgvector** | — | Vector similarity search for RAG |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| **Docker** | Multi-stage container builds |
| **Docker Compose** | Local development orchestration (PostgreSQL, Redis, Kafka, pgAdmin) |
| **Nginx** | Reverse proxy, SPA serving, API routing |
| **GitHub Actions** | CI/CD — builds all 6 Java services + frontend on push |
| **Railway** | Cloud deployment with auto-deploy from GitHub |

---

## 📁 Project Structure

```
atlasai/
│
├── services/                           # Backend microservices
│   ├── auth-service/                   # 🔐 JWT auth (Spring Boot)
│   │   ├── src/main/java/com/atlasai/auth/
│   │   │   ├── AuthApplication.java           # Entry point
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java        # Spring Security filter chain
│   │   │   │   ├── JwtAuthenticationFilter.java  # JWT extraction + validation
│   │   │   │   ├── JwtConfig.java             # JWT secret + expiration config
│   │   │   │   ├── DataSourceConfig.java      # Railway DATABASE_URL parser
│   │   │   │   ├── ApplicationConfig.java     # Beans: PasswordEncoder, AuthManager
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java        # POST /register /login /refresh /logout
│   │   │   │   └── UserController.java        # GET /users (admin)
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java           # Register, login, refresh, logout logic
│   │   │   │   └── JwtService.java            # Token generation, validation, claims
│   │   │   ├── model/
│   │   │   │   ├── User.java                  # JPA entity for users table
│   │   │   │   ├── Role.java                  # Enum: USER, MANAGER, ADMIN
│   │   │   │   ├── request/                   # DTOs: Login, Register, RefreshToken
│   │   │   │   └── response/                  # DTOs: AuthResponse, UserResponse
│   │   │   └── repository/
│   │   │       └── UserRepository.java
│   │   ├── Dockerfile                         # Multi-stage Maven build
│   │   └── pom.xml
│   │
│   ├── customer-service/               # 📇 CRM (Spring Boot)
│   │   ├── src/main/java/com/atlasai/customer/
│   │   │   ├── CustomerApplication.java
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java        # JWT-filtered endpoints
│   │   │   │   ├── JwtAuthFilter.java         # HMAC JWT parser
│   │   │   │   ├── DataSourceConfig.java      # Railway DATABASE_URL parser
│   │   │   │   └── GlobalExceptionHandler.java  # 8 typed exception handlers
│   │   │   ├── controller/
│   │   │   │   ├── CustomerController.java    # Full CRUD + search + count
│   │   │   │   └── OpportunityController.java  # Full CRUD + by-customer + count
│   │   │   ├── service/
│   │   │   │   ├── CustomerService.java       # CRUD + paginated search
│   │   │   │   └── OpportunityService.java     # CRUD + paginated search
│   │   │   ├── repository/
│   │   │   │   ├── CustomerRepository.java     # Custom JPQL search queries
│   │   │   │   └── OpportunityRepository.java   # Custom JPQL search queries
│   │   │   └── model/
│   │   │       ├── entity/                    # Customer.java, Opportunity.java
│   │   │       ├── enums/                     # CustomerStatus, OpportunityStage
│   │   │       ├── request/                   # DTOs: CustomerRequest, OpportunityRequest
│   │   │       └── response/                  # DTOs: CustomerResponse, OpportunityResponse
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   ├── workflow-service/               # 🔄 Workflow orchestration (scaffolded)
│   ├── task-service/                   # 📋 Task management (scaffolded)
│   ├── notification-service/           # 📧 Email & calendar (scaffolded)
│   ├── search-service/                 # 🔎 Vector search (scaffolded)
│   │
│   └── ai-agent-service/              # 🤖 Python AI agents
│       ├── agents/
│       │   ├── orchestrator.py         # Planner + step executor
│       │   ├── crm_agent.py            # Customer search/update
│       │   ├── email_agent.py          # Draft & send emails
│       │   └── calendar_agent.py       # Schedule meetings
│       ├── tools/
│       │   ├── crm_tools.py            # CRM API wrappers
│       │   ├── email_tools.py          # Email send wrappers
│       │   └── calendar_tools.py       # Calendar API wrappers
│       ├── vectordb/
│       │   └── pgvector_client.py      # Vector storage client
│       ├── app.py                      # FastAPI entry point
│       ├── config.py                   # Environment config
│       └── requirements.txt
│
├── frontend/                           # 🖥 React SPA
│   ├── src/
│   │   ├── main.tsx                    # Entry point
│   │   ├── App.tsx                     # Routes, layouts
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx      # Auth guard with redirect
│   │   │   └── FounderModal.tsx        # Founder info modal
│   │   ├── layouts/
│   │   │   ├── AppLayout.tsx           # Sidebar + topbar + content
│   │   │   └── PublicLayout.tsx        # Centered auth layout
│   │   ├── pages/
│   │   │   ├── auth/           (4 pages)
│   │   │   ├── dashboard/      (1 page)
│   │   │   ├── customers/      (3 pages)
│   │   │   ├── opportunities/  (3 pages)
│   │   │   ├── tasks/          (3 pages)
│   │   │   ├── workflows/      (4 pages)
│   │   │   ├── settings/       (4 pages)
│   │   │   ├── admin/          (8 pages)
│   │   │   ├── analytics/      (4 pages)
│   │   │   ├── help/           (4 pages)
│   │   │   └── errors/         (5 pages)
│   │   ├── hooks/
│   │   │   ├── useCustomers.ts          # Paginated customer data
│   │   │   ├── useOpportunities.ts      # Paginated opportunity data
│   │   │   └── useDashboard.ts          # Dashboard metrics
│   │   ├── services/
│   │   │   ├── api.ts                   # Axios instance + JWT interceptor
│   │   │   ├── customerService.ts       # Customer API calls
│   │   │   ├── opportunityService.ts    # Opportunity API calls
│   │   │   └── mockData.ts             # Development mock data
│   │   ├── stores/
│   │   │   ├── authStore.ts            # Zustand: JWT tokens, user state
│   │   │   └── uiStore.ts              # Zustand: sidebar, theme
│   │   └── styles/
│   │       ├── globals.css             # Global styles
│   │       └── theme.ts               # MUI theme customization
│   ├── nginx.conf                      # Production Nginx config
│   ├── Dockerfile                      # Multi-stage build
│   └── package.json
│
├── infra/
│   ├── docker-compose.yml              # Local dev: PostgreSQL, Redis, Kafka, pgAdmin
│   └── init-scripts/                   # DB initialization scripts
│
├── docs/                               # Documentation & research
├── plan.md                             # Implementation plan & status
└── .github/workflows/ci.yml           # CI pipeline (7 build jobs)
```

---

## 🔬 Backend Deep Dive

### 🔐 Auth Service

The authentication service handles user registration, login, and JWT management.

#### Security Architecture

```
Request → Nginx → /api/auth/* → Auth Service (8081)
                                  │
                                  ├── JwtAuthenticationFilter (once per request)
                                  │   ├── Extracts "Bearer <token>" from Authorization header
                                  │   ├── Parses JWT via JJWT 0.12.6 (HMAC-SHA256)
                                  │   ├── Validates: signature, expiration, user exists
                                  │   ├── On success: sets SecurityContextHolder
                                  │   └── On failure: logs WARN, clears context, continues chain
                                  │
                                  └── SecurityConfig
                                      ├── /api/auth/register, /login, /refresh → permitAll()
                                      ├── /api/users/** → ADMIN only
                                      ├── /api/** → authenticated()
                                      └── Stateless sessions (no HttpSession)
```

**Key Implementation Details:**

- **JWT Token Format:** HMAC-SHA256 signed with `Keys.hmacShaKeyFor()` using a configurable secret from `JWT_SECRET` env var
- **Token Claims:** `sub` (email), `role` (USER/MANAGER/ADMIN), `userId` (UUID), `iat`, `exp`
- **Refresh Tokens:** Separate token with `type: "refresh"` claim, stored as SHA-256 hash for revocation support
- **Password Storage:** BCrypt with Spring Security's `PasswordEncoder`
- **Filter Chain Continuation:** Even invalid JWT tokens don't block the request — the filter logs a warning, clears the security context, and continues the filter chain. Public endpoints still work.

```java
// JwtAuthenticationFilter.doFilterInternal() — core JWT validation
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
// On any exception: log.warn() + SecurityContextHolder.clearContext() + filterChain.doFilter()
```

```java
// JwtService — token generation with HMAC-SHA256
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

#### Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register new user (name, email, password) |
| `POST` | `/api/auth/login` | ❌ | Login, returns access + refresh tokens |
| `POST` | `/api/auth/refresh` | ❌ | Exchange refresh token for new tokens |
| `POST` | `/api/auth/logout` | ✅ Revoke refresh token |
| `GET` | `/api/auth/me` | ✅ | Get current user profile |
| `GET` | `/api/users` | ✅ ADMIN | List all users |
| `GET` | `/api/users/{id}` | ✅ ADMIN | Get user by ID |

---

### 📇 Customer/CRM Service

The CRM service provides full CRUD operations for customers and sales opportunities with pagination and filtering.

#### JWT Validation Pattern

Unlike the auth service (which uses Spring Security's `UserDetailsService`), the customer service validates JWT tokens **independently** using the same HMAC secret:

```java
// JwtAuthFilter.doFilterInternal()
SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

Claims claims = Jwts.parser()
    .verifyWith(key)
    .build()
    .parseSignedClaims(token)
    .getPayload();

// Extract claims
String email = claims.getSubject();
String role = claims.get("role", String.class);
String userId = claims.get("userId", String.class);

// Create auth token
List<SimpleGrantedAuthority> authorities = role != null
    ? List.of(new SimpleGrantedAuthority(role))
    : List.of();
UsernamePasswordAuthenticationToken authToken =
    new UsernamePasswordAuthenticationToken(email, userId, authorities);
SecurityContextHolder.getContext().setAuthentication(authToken);
```

This pattern allows each microservice to validate tokens **without calling the auth service** — enabling independent scaling and zero-latency validation.

#### Pagination Architecture

All list endpoints support standard pagination parameters:

| Parameter | Default | Example |
|-----------|---------|---------|
| `page` | 0 | `?page=0` |
| `size` | 50 | `?size=20` |
| `sort` | updatedAt | `?sort=name` |
| `direction` | desc | `?direction=asc` |

```java
// CustomerController — paginated endpoint
@GetMapping
public ResponseEntity<Page<CustomerResponse>> getAllCustomers(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String industry,
        @RequestParam(required = false) String location,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) Integer daysSinceContact,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "50") int size,
        @RequestParam(defaultValue = "updatedAt") String sort,
        @RequestParam(defaultValue = "desc") String direction) {

    Sort sortObj = direction.equalsIgnoreCase("asc")
            ? Sort.by(sort).ascending()
            : Sort.by(sort).descending();
    Pageable pageable = PageRequest.of(page, size, sortObj);

    Page<CustomerResponse> customers = customerService.searchCustomers(
            search, industry, location, status, daysSinceContact, pageable);
    return ResponseEntity.ok(customers);
}
```

#### Exception Handling

A comprehensive `GlobalExceptionHandler` with 8 typed handlers provides consistent error responses across all endpoints:

| Exception | HTTP Status | Error Example |
|-----------|-------------|---------------|
| `IllegalArgumentException` | 400 | `"Customer not found: <id>"` |
| `MethodArgumentNotValidException` | 400 | `{"fieldErrors": {"email": "must be a well-formed email address"}}` |
| `AccessDeniedException` | 403 | `"Access denied. You do not have permission."` |
| `JwtException` | 401 | `"Invalid or expired authentication token"` |
| `DataIntegrityViolationException` | 409 | `"Data integrity violation"` |
| `HttpMessageNotReadableException` | 400 | `"Malformed request body"` |
| `MissingServletRequestParameterException` | 400 | `"Required parameter 'search' is missing"` |
| `MethodArgumentTypeMismatchException` | 400 | `"Invalid value for parameter 'page'"` |
| Generic `Exception` | 500 | Logged with full stack trace |

#### Endpoints

**Customers:**

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/customers` | List customers (paginated, filterable) |
| `GET` | `/api/customers/{id}` | Get customer by ID |
| `POST` | `/api/customers` | Create customer |
| `PUT` | `/api/customers/{id}` | Update customer |
| `DELETE` | `/api/customers/{id}` | Delete customer |
| `GET` | `/api/customers/count` | Total customer count |

**Opportunities:**

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/opportunities` | List opportunities (paginated, filterable) |
| `GET` | `/api/opportunities/{id}` | Get opportunity by ID |
| `GET` | `/api/opportunities/by-customer/{customerId}` | Get opportunities by customer |
| `POST` | `/api/opportunities` | Create opportunity |
| `PUT` | `/api/opportunities/{id}` | Update opportunity |
| `DELETE` | `/api/opportunities/{id}` | Delete opportunity |
| `GET` | `/api/opportunities/count` | Total opportunity count |

#### Database Schema

```sql
-- Users (auth-service)
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',
    refresh_token_hash VARCHAR(255),
    created_at TIMESTAMP NOT NULL
);

-- Customers (customer-service)
CREATE TABLE customers (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    location VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    contact_person VARCHAR(255),
    last_contacted TIMESTAMP,
    status VARCHAR(20) DEFAULT 'LEAD',
    tags TEXT,
    notes TEXT,
    website VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Opportunities (customer-service)
CREATE TABLE opportunities (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    customer_id UUID NOT NULL,
    customer_name VARCHAR(255),
    stage VARCHAR(20) NOT NULL DEFAULT 'PROSPECT',
    value NUMERIC(15,2),
    probability INT NOT NULL DEFAULT 0,
    close_date DATE,
    assigned_to VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

---

### 🤖 AI Agent Service (Scaffolded)

The AI agent service is built in **Python with FastAPI** and implements an **orchestrator pattern** for autonomous sales workflow execution. It's fully coded and ready to deploy — it just needs an **OpenAI API key**.

#### Agent Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    🧠 Orchestrator Agent                  │
│                   (Planner & Coordinator)                 │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 1. Receives goal → 2. Plans steps → 3. Delegates   │ │
│  │ 4. Monitors progress → 5. Validates → 6. Reports    │ │
│  └──────────────────────────────────────────────────────┘ │
└──────────────────────┬───────────────────────────────────┘
          ┌────────────┼────────────┬────────────┐
          ▼            ▼            ▼            ▼
┌─────────────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐
│ 📇 CRM Agent     │ │ 📧 Email │ │ 📅 Cal.  │ │ 🔍 RAG    │
│ Query & Update   │ │ Agent    │ │ Agent    │ │ Agent     │
└─────────────────┘ └──────────┘ └──────────┘ └───────────┘
          │              │            │              │
          ▼              ▼            ▼              ▼
   ┌──────────┐   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │Customer  │   │SendGrid  │  │Google    │  │pgvector  │
   │Service   │   │/SMTP     │  │Calendar  │  │Store     │
   └──────────┘   └──────────┘  └──────────┘  └──────────┘
```

```python
# orchestrator.py — core execution pipeline
class OrchestratorAgent:
    async def execute(self, workflow_id: str, goal: str, parameters: dict) -> dict:
        plan = await self._create_plan(goal, parameters)       # LLM generates steps
        results = await self._execute_plan(workflow_id, plan)   # Executes each step
        report = await self._create_report(results)             # Aggregates results
        return {"workflow_id": workflow_id, "status": "COMPLETED", "plan": plan, "result": report}
```

```python
# app.py — FastAPI entry point
@app.post("/api/agent/start")
async def start_workflow(request: WorkflowRequest):
    orchestrator = OrchestratorAgent()
    result = await orchestrator.execute(
        workflow_id=request.workflow_id,
        goal=request.goal,
        parameters=request.parameters,
    )
    return result
```

---

## 🖥 Frontend Deep Dive

The frontend is a **40+ page Single Page Application** built with React 18 and TypeScript, using Vite for blazing-fast builds and Material UI 5 for a professional design system.

### Architecture

```
App.tsx
├── PublicLayout.tsx
│   ├── LoginPage.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── ResetPasswordPage.tsx
│   └── FounderPage.tsx (3-column premium dashboard)
│
├── ProtectedRoute.tsx (auth guard)
│
└── AppLayout.tsx (sidebar + top bar)
    ├── DashboardPage.tsx           # Real customer/deal counts
    ├── Customers/                  # List, Detail, Form
    ├── Opportunities/              # List, Detail, Form
    ├── Tasks/                      # List, Detail, Board
    ├── Workflows/                  # List, Create, Detail, Templates
    ├── Settings/                   # Profile, Appearance, Notifications, API Keys
    ├── Admin/                      # Users, Roles, API Keys, Audit Log, etc.
    ├── Analytics/                  # Agents, Sales, Custom Reports
    ├── Help/                       # Docs, API Reference, Changelog, Contact
    └── Errors/                     # 404, 403, 500, Maintenance, Offline
```

### State Management & API Layer

```typescript
// stores/authStore.ts — Zustand-based auth state
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

```typescript
// services/api.ts — Axios interceptor with automatic JWT refresh
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      await refreshTokens();  // Queues concurrent refresh requests
      return api(error.config);  // Retries original request
    }
    return Promise.reject(error);
  }
);
```

### Paginated Data Hooks

```typescript
// hooks/useCustomers.ts
export function useCustomers(page = 0, size = 50, sort = 'updatedAt', direction = 'desc') {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ totalElements: 0, totalPages: 0 });

  useEffect(() => {
    customerService.getAll({ page, size, sort, direction })
      .then(data => {
        setCustomers(data.content);     // Spring Boot Page<T>.content
        setPagination({
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        });
      });
  }, [page, size, sort, direction]);

  return { customers, pagination, loading, error };
}
```

---

## 📡 API Reference

### Authentication

```
POST /api/auth/register
Body: { "name": "John", "email": "john@example.com", "password": "securepass" }
Response: { "accessToken": "eyJ...", "refreshToken": "eyJ...", "tokenType": "Bearer",
            "expiresIn": 3600, "userId": "uuid", "name": "John", "email": "john@example.com", "role": "ROLE_USER" }

POST /api/auth/login
Body: { "email": "john@example.com", "password": "securepass" }
Response: { "accessToken": "eyJ...", "refreshToken": "eyJ...", ... }

POST /api/auth/refresh
Body: { "refreshToken": "eyJ..." }
Response: { "accessToken": "eyJ...", "refreshToken": "eyJ...", ... }
```

### Customers

```
GET /api/customers?page=0&size=20&sort=name&direction=asc&search=acme&industry=Tech
Authorization: Bearer <token>
Response: {
  "content": [{ "id": "uuid", "name": "Acme Corp", "company": "Acme Inc", ... }],
  "totalElements": 42,
  "totalPages": 3,
  "number": 0,
  "size": 20
}

POST /api/customers
Authorization: Bearer <token>
Body: { "name": "Acme Corp", "company": "Acme Inc", "industry": "Tech", "location": "Chennai" }
Response: { "id": "uuid", ... } (201 Created)
```

### Opportunities

```
GET /api/opportunities?page=0&size=20&stage=CLOSED_WON&minValue=10000
Authorization: Bearer <token>
Response: { "content": [...], "totalElements": 15, ... }
```

---

## 🐳 Infrastructure & DevOps

### Docker Multi-Stage Build (Customer Service Example)

```dockerfile
# Stage 1: Build with Maven
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline -q || true     # Cache dependencies
COPY src/ src/
RUN mvn package -DskipTests -q               # Compile + package

# Stage 2: Run with JRE (much smaller image)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/customer-service-*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml — 7 parallel build jobs
jobs:
  build-auth-service:      # ✅ Java 21 + Maven
  build-customer-service:  # ✅ Java 21 + Maven
  build-workflow-service:  # ✅ Java 21 + Maven
  build-task-service:      # ✅ Java 21 + Maven
  build-notification-service: # ✅ Java 21 + Maven
  build-search-service:    # ✅ Java 21 + Maven
  build-frontend:          # ✅ Node 18 + npm
```

Every push to `main` triggers all 7 builds in parallel. On success, Railway auto-deploys the changed services.

### Nginx Configuration

The frontend's Nginx acts as an API gateway, routing requests to the correct backend:

```nginx
# /api/auth/* → Auth Service
location /api/auth {
    proxy_pass https://agentic-workflow-automator-production.up.railway.app;
    proxy_set_header Host agentic-workflow-automator-production.up.railway.app;
}

# /api/customers/* → Customer Service
location /api/customers {
    proxy_pass https://customer-service-production-0ff7.up.railway.app;
    proxy_set_header Host customer-service-production-0ff7.up.railway.app;
}

# /api/opportunities/* → Customer Service
location /api/opportunities {
    proxy_pass https://customer-service-production-0ff7.up.railway.app;
    proxy_set_header Host customer-service-production-0ff7.up.railway.app;
}

# SPA fallback — all other routes serve index.html
location / {
    try_files $uri $uri/ /index.html;
}

# Static assets with 1-year cache
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 🔍 Diagnosis & Debugging Highlights

During development and deployment, several non-trivial issues were diagnosed and resolved through **systematic debugging**:

### 1. JWT 403 Silent Failures

**Symptom:** Customer service returned 403 Forbidden with no logs. Auth service's login worked fine.

**Root Cause:** `JwtAuthFilter` caught all JWT exceptions silently (`catch (Exception e) { }`) — no logging at all. Debugging was impossible.

**Fix:** Added SLF4J `log.warn()` with method, URI, and error message for every JWT failure. Also ensured the filter **always continues the filter chain** so public endpoints work even with invalid tokens in headers.

### 2. PostgreSQL `bytea` Column Type

**Symptom:** Customer/opportunity list endpoints returned 500 with `ERROR: function lower(bytea) does not exist`.

**Root Cause:** The database columns were created as `bytea` (binary) instead of `varchar` for string fields. PostgreSQL's `LOWER()` function doesn't work on binary columns.

**Diagnosis:** Railway logs from `GlobalExceptionHandler` revealed the exact SQL error. The stack trace showed the query and the `bytea` type reference.

**Solution:** Added `@Column(columnDefinition = "VARCHAR(255)")` to all entity string fields and implemented a `findAll(Pageable)` fallback path when no search filters are used, avoiding the problematic JPQL query.

### 3. Railway `DATABASE_URL` Parsing

**Symptom:** Services crashed on Railway with connection refused to `localhost:5432`.

**Root Cause:** Railway provides `DATABASE_URL` in `postgresql://user:pass@host:port/db` format, but Spring Boot's JDBC driver expects `jdbc:postgresql://host:port/db`.

**Fix:** Created `DataSourceConfig.java` that checks for `DATABASE_URL`, parses the URI, and builds a proper JDBC DataSource. Falls back to `application.yml` defaults for local development.

### 4. Redis/Kafka Dependencies on Railway

**Symptom:** Services crashed at startup with Redis connection refused.

**Root Cause:** `pom.xml` included `spring-boot-starter-data-redis` and `spring-kafka`, which auto-configure at startup and try to connect to `localhost:6379` and `localhost:9092` — neither exists on Railway.

**Fix:** Removed Redis and Kafka dependencies from production builds. Only `spring-kafka-test` remains for unit tests.

### 5. Nginx Trailing Slash Routing

**Symptom:** `GET /api/customers` returned 404 through Nginx, but worked when hitting the backend directly.

**Root Cause:** `location /api/customers/` (with trailing slash) doesn't match `GET /api/customers` (without trailing slash).

**Fix:** Removed trailing slashes from all Nginx location blocks.

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Java Development Kit | 21 (LTS) |
| Node.js | 18.x+ |
| Docker | 24.x+ |
| Docker Compose | 2.x+ |
| Python | 3.11+ (for AI agent service) |
| Maven | 3.9+ |

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/barath-project-work/Agentic-Workflow-Automator.git
cd Agentic-Workflow-Automator

# 2. Start infrastructure (PostgreSQL, Redis, Kafka)
docker-compose -f infra/docker-compose.yml up -d

# 3. Start auth service
cd services/auth-service
./mvnw spring-boot:run

# 4. Start customer service (in another terminal)
cd services/customer-service
./mvnw spring-boot:run

# 5. Start frontend (in another terminal)
cd frontend
npm install
npm run dev

# 6. Open http://localhost:5173 in your browser
```

### Testing the APIs

```bash
# Register a user
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Extract the accessToken and use it:
TOKEN="eyJ..."

# Create a customer
curl -X POST http://localhost:8082/api/customers \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Acme Corp","company":"Acme Inc","industry":"Tech","location":"Chennai"}'

# List customers (paginated)
curl "http://localhost:8082/api/customers?page=0&size=20&sort=name&direction=asc" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📦 Deployment to Railway

Each service is deployed to Railway with the following configuration:

### Required Environment Variables

| Service | Variables |
|---------|-----------|
| **Auth Service** | `DATABASE_URL` = `${{ Postgres.DATABASE_URL }}`, `JWT_SECRET` = (your secret) |
| **Customer Service** | `DATABASE_URL` = `${{ Postgres.DATABASE_URL }}`, `JWT_SECRET` = (same secret) |
| **Frontend** | None (static files served by Nginx) |

### Key Deployment Learnings

1. **`JWT_SECRET` must be identical** across all services that validate JWT tokens
2. **`DataSourceConfig.java`** is required for every service to parse Railway's `DATABASE_URL`
3. **Remove Redis/Kafka dependencies** from `pom.xml` for Railway deployments
4. **Target port** in Railway must match `server.port` in `application.yml`
5. **First Maven build** takes 3-5 minutes (downloading all dependencies), subsequent builds are ~1-2 minutes

---

## 🧭 What's Next

| Priority | Feature | Status |
|----------|---------|--------|
| 🔴 | Workflow Service — full orchestration engine | ⬜ Not started |
| 🔴 | Task Service — task CRUD + board | ⬜ Not started |
| 🔴 | Fix PostgreSQL `bytea` columns permanently via ALTER TABLE | ⬜ Not started |
| 🟡 | Notification Service — email + calendar | ⬜ Not started |
| 🟡 | Search Service — pgvector + RAG | ⬜ Not started |
| 🟡 | Activate AI Agent Service with OpenAI API key | ⬜ Needs API key |
| 🟢 | Mobile responsive UI for all pages | 🟡 Partial |
| 🟢 | Analytics dashboards with real data | ⬜ Not started |

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ using Java 21, Spring Boot 3, React 18, and TypeScript
  <br/>
  <i>Automating sales workflows, one agent at a time.</i>
</p>

<p align="center">
  <a href="#-table-of-contents">↑ Back to Top</a>
</p>
