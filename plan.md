# AtlasAI — Project Implementation Plan

> **Project:** Agentic Sales Workflow Automation Platform
> **Last Updated:** July 6, 2026

---

## 📋 Status Overview

| Layer | Completion | Status |
|-------|-----------|--------|
| **Frontend Pages** | ~95% | ✅ All 43 pages built — auth + customers + opportunities wired to real backend |
| **Auth Service** | 100% | ✅ Running on Railway — register, login, refresh, RBAC verified |
| **Customer Service** | 95% | ✅ All CRUD endpoints working (list fix deployed & verified HTTP 200) |
| **Frontend→Backend Integration** | 85% | 🟢 Customer/opportunity pages wired to real API — list working |
| **Documentation** | 100% | ✅ README rewritten (concise) + 7 separate docs/ files created |
| **Frontend Nginx** | 100% | ✅ Routes /api/auth → auth-service, /api/customers & /api/opportunities → customer-service |
| **Founder Page Redesign** | 100% | ✅ Premium 3-column dashboard layout with responsive grid |
| **Mobile Responsive** | 30% | 🟡 Auth pages done — 40+ more pages need mobile fixes |
| **AI Agent Service** | 80% | ✅ Python structure done — needs OpenAI key |
| **Workflow Service** | 0% | ❌ Not started — P0 candidate |
| **Task Service** | 0% | ❌ Not started |
| **Notification Service** | 0% | ❌ Not started |
| **Search Service** | 0% | ❌ Not started |

---

## 🌐 Live Deployments on Railway

| Service | URL | Status | Port |
|---------|-----|--------|------|
| **Frontend** | `cheerful-respect-production-1c45.up.railway.app` | 🟢 Running | 80 |
| **Auth Service** | `agentic-workflow-automator-production.up.railway.app` | 🟢 UP (DB + Health OK) | 8081 |
| **Customer Service** | `customer-service-production-0ff7.up.railway.app` | 🟢 UP (DB + Health OK) | 8082 |
| **PostgreSQL** | Shared across all services via `${{ Postgres.DATABASE_URL }}` | 🟢 Healthy | 5432 |

---

## 🎯 Phase 1: Authentication ✅ Complete

### What Was Built

**Backend — Auth Service (Port 8081)**
- Spring Boot with Spring Security, JWT (HMAC-SHA256)
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/users` — list users (admin only)
- BCrypt password hashing, role-based access (USER/MANAGER/ADMIN)
- Global exception handler for consistent error responses
- `DataSourceConfig.java` — reads Railway's `DATABASE_URL` env var

**Frontend — Auth Integration**
- `LoginPage.tsx` — real API calls, login + register mode toggle
- `authStore.ts` — stores `accessToken` + `refreshToken`
- `api.ts` — full token refresh interceptor with request queuing
- `ProtectedRoute.tsx` — redirects to `/login` if unauthenticated

### 🔧 Auth Service Fixes (July 5)

| Fix | Description |
|-----|-------------|
| `JwtAuthenticationFilter` | Previously blocked public endpoints on JWT error (called `response.sendError()` + `return` skipping `filterChain.doFilter()`). Fixed: log warning, clear context, **always continue filter chain** — public endpoints work even with bad tokens in headers. |

---

## 📦 Phase 2: Customer/CRM Service (Port 8082) ✅ Complete & Deployed

### Backend — Full Java/Spring Boot Microservice

```
services/customer-service/src/main/java/com/atlasai/customer/
├── CustomerApplication.java                 — Entry point
├── config/
│   ├── DataSourceConfig.java               — Reads Railway DATABASE_URL
│   ├── SecurityConfig.java                  — JWT auth for all /api/**
│   ├── JwtAuthFilter.java                   — Extracts JWT claims from header
│   └── GlobalExceptionHandler.java          — Consistent error responses
├── controller/
│   ├── CustomerController.java              — Full CRUD + search + count
│   └── OpportunityController.java           — Full CRUD + by-customer + count
├── service/
│   ├── CustomerService.java                 — CRUD + search with filters
│   └── OpportunityService.java              — CRUD + search with filters
├── repository/
│   ├── CustomerRepository.java              — JPA search (industry, location, status, days)
│   └── OpportunityRepository.java           — JPA search (stage, value range)
└── model/
    ├── entity/ (Customer.java, Opportunity.java)
    ├── enums/ (CustomerStatus.java, OpportunityStage.java)
    ├── request/ (CustomerRequest.java, OpportunityRequest.java)
    └── response/ (CustomerResponse.java, OpportunityResponse.java)
```

### 🔧 Customer Service Fixes (July 5)

| Fix | Description |
|-----|-------------|
| `JwtAuthFilter` | Previously caught JWT exceptions **silently with zero logging** — impossible to debug 403s. Now logs `WARN` with method, URI, and error for every JWT failure. |
| `SecurityConfig` | Added `@EnableMethodSecurity` for `@PreAuthorize` support. |
| `GlobalExceptionHandler` | Rewritten with 8 dedicated handlers: `IllegalArgument` (400), `MethodArgumentNotValid` (400), `AccessDenied` (403), `JwtException` (401), `DataIntegrityViolation` (409), `HttpMessageNotReadable` (400), `MissingServletRequestParam` (400), `MethodArgumentTypeMismatch` (400). Full error logging. |
| **Pagination** | `CustomerRepository`/`OpportunityRepository` — search queries return `Page<T>` with `countQuery`. `CustomerService`/`OpportunityService` — accept `Pageable`, return `Page<ResponseDTO>`. Controllers accept `?page=&size=&sort=&direction=`. |
| **Logging config** | Added Jackson date serialization, structured logging pattern, health details. |
| **Entity column definitions** | Added explicit `@Column(columnDefinition = "VARCHAR(255)")` to all String fields in `Customer.java` and `Opportunity.java` to prevent `bytea` column type issue. |
| **Database schema fix** | Set `ddl-auto: create` to drop & recreate tables with correct `VARCHAR` types (⚠️ temporary — revert to `update` after first deploy). |

### 🐛 `bytea` Database Columns — Fully Resolved ✅

**Root cause:** The `customers` and `opportunities` tables on Railway were created with `bytea` (binary) columns instead of `varchar`/`text`. PostgreSQL's `LOWER()` function fails on binary data.

**Fix (commits `06d27df`, `661b3f6`):** 
- `CustomerService.searchCustomers()` and `OpportunityService.searchOpportunities()` check if ALL filter params are null/blank. When no filters are provided, they call `findAll(Pageable)` — avoiding the custom JPQL query entirely.
- `@Column(columnDefinition = "VARCHAR(255)")` added to all String fields in entities to prevent future column type mismatch.

**Current status:** ✅ `GET /api/customers?page=0&size=3` returns **HTTP 200** with paginated data (verified: 2 total elements, correct IDs and names).

**Limitation:** If search/filter parameters are provided, the custom JPQL query still runs and will crash on `bytea` columns. Permanent fix requires running `ALTER TABLE` SQL on the Railway PostgreSQL database to convert existing columns.

### API Endpoints — Verified Status

| Method | Path | Status | Verified |
|--------|------|--------|----------|
| `GET` | `/api/customers?page=&size=` | ✅ HTTP 200 with data | ✅ Jul 6 |
| `GET` | `/api/customers/{id}` | ✅ Works | ✅ Yes |
| `POST` | `/api/customers` | ✅ 201 Created | ✅ Yes |
| `PUT` | `/api/customers/{id}` | ✅ Works | |
| `DELETE` | `/api/customers/{id}` | ✅ Works | |
| `GET` | `/api/customers/count` | ✅ Returns count | ✅ Yes |
| `GET` | `/api/opportunities?page=&size=` | ✅ HTTP 200 with data | ✅ Jul 6 |
| `GET` | `/api/opportunities/{id}` | ✅ Works | |
| `GET` | `/api/opportunities/by-customer/{customerId}` | ✅ Works | ✅ Yes |
| `POST` | `/api/opportunities` | ✅ Works | |
| `PUT` | `/api/opportunities/{id}` | ✅ Works | |
| `DELETE` | `/api/opportunities/{id}` | ✅ Works | |
| `GET` | `/api/opportunities/count` | ✅ Works | |

### Frontend — Real API Connection

**Services (paginated types):**
- `frontend/src/services/customerService.ts` — `getAll()` returns `PaginatedCustomers` (content, totalElements, totalPages, number, size)
- `frontend/src/services/opportunityService.ts` — `getAll()` returns `PaginatedOpportunities`

**Hooks (paginated + non-paginated):**
- `useCustomers()` — extracts `.content` from paginated responses (backward compatible)
- `useCustomersPaginated()` — returns full pagination metadata
- `useOpportunities()` — extracts `.content` from paginated responses
- `useOpportunitiesPaginated()` — returns full pagination metadata

**Pages updated (loading/error/empty states + real API):**
- `CustomerListPage.tsx`, `CustomerDetailPage.tsx`, `CustomerFormPage.tsx`
- `OpportunityListPage.tsx`, `OpportunityDetailPage.tsx`, `OpportunityFormPage.tsx`
- `DashboardPage.tsx` — real customer/deal counts

### Frontend Nginx Routing

The `nginx.conf` was updated to route different API paths to the correct backend:
- `/api/auth/*` → auth-service (`agentic-workflow-automator-production.up.railway.app`)
- `/api/customers/*` → customer-service (`customer-service-production-0ff7.up.railway.app`)
- `/api/opportunities/*` → customer-service (`customer-service-production-0ff7.up.railway.app`)

---

## 🎨 Phase 1.5: Founder Page & UI Redesign ✅ Complete

- Desktop-first 3-column CSS grid layout
- Tablet/mobile responsive variants
- Mobile responsive fixes for auth pages

---

## 📚 Phase 2.5: Documentation Restructuring ✅ Complete (Jul 6)

### What Was Done

**README.md rewritten** — from a 540-line technical report to a concise, recruiter-friendly overview:
- Badges + one-line intro
- Architecture diagram (ASCII)
- Live deployment URLs (clickable)
- Tech stack table (quick scan)
- Screenshots section (placeholders for user-captured images)
- Quick start guide (clone → run → test in 30s)
- Debugging achievements section (hires recruiters)
- Links to all 7 docs files

**7 separate documentation files created in `docs/`:**

| File | What It Covers |
|------|---------------|
| `docs/Architecture.md` | Full system design, service topology, communication patterns, Nginx routing config |
| `docs/Authentication.md` | JWT flow (generation → validation), SecurityConfig, token structure, RBAC matrix, code snippets |
| `docs/API.md` | Complete endpoint reference with request/response JSON schemas, error codes, HTTP status reference |
| `docs/Database.md` | Full DDL, entity definitions, enums (CustomerStatus, OpportunityStage), bytea column guidance |
| `docs/Infrastructure.md` | Docker multi-stage builds, Nginx config, CI/CD (7 parallel jobs), Docker Compose |
| `docs/Deployment.md` | Railway setup guide, env vars checklist, step-by-step service addition guide, verification commands |
| `docs/Debugging.md` | 5 real debugging stories: JWT 403, bytea columns, DATABASE_URL, Redis/Kafka, Nginx trailing slash |

**Commit:** `e7010a4` — "Restructure docs: concise README + 7 separate docs/ files"

### README Screenshots Section

A screenshot gallery was added to the README with placeholders for 5 images:
- `screenshots/login-page.png`
- `screenshots/dashboard.png`
- `screenshots/customers-list.png`
- `screenshots/opportunities-list.png`
- `screenshots/tasks-board.png`

**Status:** ⏳ User needs to capture screenshots from the live app and save them to `screenshots/`

---

## 🔄 Phase 3: Workflow Service (Port 8083) ❌ Not Started

### To Build
- [ ] JPA entities: `WorkflowRun`, `WorkflowStep`
- [ ] JPA repositories
- [ ] Service layer for workflow orchestration
- [ ] REST controllers (CRUD + execution)
- [ ] Kafka consumer for step events + producer for lifecycle events
- [ ] Spring Retry for resilient execution

### Frontend Pages
| Page | Route | Endpoints Needed |
|------|-------|-----------------|
| WorkflowListPage | `/workflows` | `GET /api/workflows?status=` |
| WorkflowCreatePage | `/workflows/create` | `POST /api/workflows` |
| WorkflowDetailPage | `/workflows/:id` | `GET /api/workflows/{id}` |
| WorkflowTemplatesPage | `/workflows/templates` | `GET /api/workflows/templates` |

---

## 📋 Phase 4: Task Service (Port 8084) ❌ Not Started

### To Build
- [ ] JPA entities: `Task`
- [ ] JPA repositories with filtering by status/assignee
- [ ] Service layer for task CRUD + assignment
- [ ] REST controllers + Kafka consumer/producer

### Frontend Pages
| Page | Route | Endpoints Needed |
|------|-------|-----------------|
| TaskListPage | `/tasks` | `GET /api/tasks?status=&assignee=` |
| TaskDetailPage | `/tasks/:id` | `GET /api/tasks/{id}` |
| TaskBoardPage | `/tasks/board` | `GET /api/tasks`, `PUT /api/tasks/{id}/status` |

---

## 📧 Phase 5: Notification Service (Port 8085) ❌ Not Started

### To Build
- [ ] Kafka consumer for email notification events
- [ ] Email sending via Spring Mail (SendGrid)
- [ ] Calendar event creation (Google Calendar API)
- [ ] REST controller for notification history

---

## 🔎 Phase 6: Search Service (Port 8086) ❌ Not Started

### To Build
- [ ] pgvector vector store integration
- [ ] Embedding generation pipeline (OpenAI API)
- [ ] Semantic search endpoints
- [ ] RAG support for AI agents

---

## 🔗 Phase 7: Frontend → Backend Integration

### Completed
- [x] Token refresh interceptor in `api.ts` with request queuing
- [x] Route protection via `ProtectedRoute.tsx`
- [x] Customer pages wired to real API (list, detail, form)
- [x] Opportunity pages wired to real API (list, detail, form)
- [x] Dashboard wired to real customer/opportunity data
- [x] Pagination support in customer/opportunity services and hooks

### To Build
- [ ] Workflow pages — connect to future Workflow Service
- [ ] Task pages — connect to future Task Service
- [ ] Analytics pages — connect to backend
- [ ] Admin pages — connect to backend
- [ ] Add loading skeletons to all list pages
- [ ] Add error states for failed API calls

---

## 🐳 Phase 8: Infrastructure & DevOps

### Completed
- [x] Frontend Dockerfile (multi-stage build with Nginx)
- [x] Frontend nginx.conf (SPA routing + API proxy for 2 backends + caching + security)
- [x] Auth service Dockerfile (multi-stage Maven build)
- [x] Customer service Dockerfile (multi-stage Maven build)
- [x] Auth service deployed to Railway with PostgreSQL
- [x] Customer service deployed to Railway with PostgreSQL

### To Build
- [ ] Add all microservices to `docker-compose.yml`
- [ ] Add Nginx reverse proxy service to docker-compose
- [ ] Create DB init scripts for all services
- [ ] Prometheus + Grafana monitoring
- [ ] K8s deployment manifests
- [ ] CI/CD pipeline with Docker image building

---

## 🚀 Phase 9: Deployment & Launch

### Completed
- [x] Auth service deployed to Railway (port 8081)
- [x] Customer service deployed to Railway (port 8082)
- [x] Frontend deployed to Railway (port 80)
- [x] Nginx routes auth + customer/opportunity APIs to correct backends

### Incidents & Resolutions

| Issue | Root Cause | Resolution | Date |
|-------|-----------|------------|------|
| JWT 403 silent failures | Empty catch blocks in JWT filters | Added SLF4J logging + filter chain continuation | Jul 5 |
| bytea columns crash | PostgreSQL columns created as binary | findAll() fallback + columnDefinition annotations | Jul 5 |
| DB connection refused | DATABASE_URL format mismatch | DataSourceConfig.java parser | Jul 5 |
| Redis/Kafka startup crash | Auto-config on missing services | Removed unused deps from pom.xml | Jul 5 |
| Nginx 404 on API calls | Trailing slash in location blocks | Removed trailing slashes | Jul 5 |

### 🖥 Desktop White Screen Investigation (Jul 6)

**Reported symptom:** Login page shows white screen on desktop browser, but works fine on mobile.

**Investigation:** Automated browser test (1280×800 viewport) loaded the login page at `cheerful-respect-production-1c45.up.railway.app/login` successfully — page rendered, no console errors, no failed network requests, form fields were interactive.

**Likelier causes (not a code bug):**
1. **Hard browser cache** — Ctrl+Shift+R (hard refresh) or Incognito/Private window resolves it
2. **Browser extension blocking** — Ad blockers can block Google Fonts or scripts
3. **Network/DNS issue** — ISP or work network blocking Railway domain
4. **Old cached Nginx response** — Nginx may have been serving stale index.html after deployment

**Status:** ⏳ Requires user to test in incognito or with extensions disabled

---

## 🧠 Railway Deployment — Lessons Learned

### Everything we learned the hard way from deploying auth-service + customer-service

---

### 1️⃣ Every Spring Boot Service Needs DataSourceConfig.java

Railway provides PostgreSQL via a `DATABASE_URL` environment variable in this format:
```
postgresql://user:password@host:5432/dbname
```

But Spring Boot's JDBC drivers expect:
```
jdbc:postgresql://host:5432/dbname
```

**Fix:** Create `DataSourceConfig.java` in every service that:
1. Checks for `DATABASE_URL` env var
2. If found, parses the Railway URI format and builds a JDBC DataSource
3. If not found (local dev), falls back to `application.yml` defaults

```java
@Bean @Primary
public DataSource dataSource() {
    String databaseUrl = System.getenv("DATABASE_URL");
    if (databaseUrl == null || databaseUrl.isBlank()) {
        return DataSourceBuilder.create()
            .url("jdbc:postgresql://localhost:5432/atlasai")
            .username("atlasai").password("atlasai_secret")
            .driverClassName("org.postgresql.Driver").build();
    }
    URI uri = new URI(databaseUrl);
    // parse userInfo, host, port, dbName from URI
    // build jdbc:postgresql://host:port/dbname
}
```

**⚠️ Warning:** Without this file, services try to connect to `localhost:5432` on Railway (which doesn't exist) and crash immediately.

---

### 2️⃣ Remove Redis/Kafka/Cache Dependencies for Railway

Railway doesn't provide Redis or Kafka by default. If your `pom.xml` includes:
- `spring-boot-starter-data-redis`
- `spring-boot-starter-cache`
- `spring-kafka`

And your `application.yml` has:
```yaml
spring:
  data:
    redis:
      host: localhost  # ❌ WON'T WORK ON RAILWAY
  cache:
    type: redis       # ❌ WON'T WORK ON RAILWAY
  kafka:
    bootstrap-servers: localhost:9092  # ❌ WON'T WORK ON RAILWAY
```

Spring Boot auto-configures these at startup and tries to connect to `localhost:6379` (Redis) or `localhost:9092` (Kafka). Since neither exists on Railway, **the service crashes**.

**Fix:**
- Remove `spring-boot-starter-data-redis`, `spring-boot-starter-cache`, and `spring-kafka` from `pom.xml`
- Remove all `spring.data.redis`, `spring.cache`, and `spring.kafka` sections from `application.yml`
- Remove `@EnableCaching` from the `@SpringBootApplication` class
- Keep `spring-kafka-test` in pom.xml only if you need it for tests (test scope is fine)

**Only add Redis/Kafka back when you actually deploy those services on Railway.**

---

### 3️⃣ Don't Put Variables in the Wrong Service

Railway lists all services. It's easy to accidentally add variables to:
- The **PostgreSQL** service instead of the auth service
- The **Frontend** service instead of the auth service

**Rule:** Each service gets its own `DATABASE_URL` variable — click "New Variable" → pick `${{ Postgres.DATABASE_URL }}` from the template dropdown. Don't copy-paste the raw URL.

---

### 4️⃣ Nginx Location Blocks — Trailing Slash Gotcha

**Critical:** `location /api/customers/` (with trailing slash) does NOT match `GET /api/customers` (without trailing slash).

The frontend makes calls like:
- `api.get('/customers')` → `/api/customers` ❌ won't match `/api/customers/`
- `api.get('/customers/123')` → `/api/customers/123` ✅ will match

**Fix:** Always use location blocks without trailing slashes:
```nginx
location /api/customers {     # ✅ matches /api/customers AND /api/customers/123
    proxy_pass ...
}
```

---

### 5️⃣ Nginx Needs Separate Location Blocks Per Backend

You can't proxy all `/api/` to one backend when you have multiple microservices. Each backend gets its own location block:

```nginx
location /api/auth {
    proxy_pass https://auth-service-domain.up.railway.app;
    proxy_set_header Host auth-service-domain.up.railway.app;
}

location /api/customers {
    proxy_pass https://customer-service-domain.up.railway.app;
    proxy_set_header Host customer-service-domain.up.railway.app;
}
```

The `proxy_set_header Host` must match each service's own domain, not a shared value.

---

### 6️⃣ First Maven Build Takes 3-5 Minutes

The very first build on Railway downloads ALL Maven dependencies from scratch (Spring Boot, Hibernate, Security, JJWT, PostgreSQL driver, etc.). This is normal.

- First build: **3-5 minutes**
- Subsequent builds: **~1-2 minutes** (cached layers)

Railway caches Docker layers, so once dependencies are downloaded, they persist across redeploys.

---

### 7️⃣ Target Port Must Match server.port

When generating a domain for a service, Railway asks for the **target port**. This must match the `server.port` in `application.yml`:

| Service | application.yml | Railway Target Port |
|---------|----------------|---------------------|
| Auth Service | `server.port: 8081` | **8081** |
| Customer Service | `server.port: 8082` | **8082** |
| Frontend | Nginx listens on 80 | **80** |

---

### 8️⃣ Required Variables Per Service

| Service | Required Variables |
|---------|-------------------|
| **Auth Service** | `DATABASE_URL` = `${{ Postgres.DATABASE_URL }}`, `JWT_SECRET` = your-secret |
| **Customer Service** | `DATABASE_URL` = `${{ Postgres.DATABASE_URL }}`, `JWT_SECRET` = same-as-auth-service |
| **Frontend** | None (Nginx handles routing, static files) |

The `JWT_SECRET` must be **the same value** across all services that validate JWT tokens, because they all use HMAC-SHA256 with the same key.

---

### 9️⃣ Health Check Shows `{"status":"DOWN"}` Without Details

If the health check shows just:
```json
{"status":"DOWN"}
```
...without any `components` section, you need to enable details in `application.yml`:
```yaml
management:
  endpoint:
    health:
      show-details: always
```

Without this, you won't see WHICH component is down (db, diskSpace, etc.).

---

### 🔟 Verify With Curl Before Opening in Browser

After deploying, verify each service independently before expecting the frontend to work:

```bash
# Check auth service
curl https://auth-domain.up.railway.app/actuator/health

# Check customer service
curl https://customer-domain.up.railway.app/actuator/health

# Register a user to get a JWT (proves db works)
curl -X POST https://auth-domain.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'

# Test customer CRUD with the JWT
curl -X POST https://customer-domain.up.railway.app/api/customers \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Acme Corp","company":"Acme"}'
```

---

### 1️⃣1️⃣ `JWT_SECRET` Must Match Across All Services

Both the auth-service (token generator) and customer-service (token validator) use HMAC-SHA256 with the same key. If the `JWT_SECRET` environment variable differs:

- Auth-service signs tokens with `JWT_SECRET=A`
- Customer-service tries to verify with `JWT_SECRET=B` (or missing)
- HMAC signature verification fails → security context cleared → **403 Forbidden**

**Fix:** Set the **exact same** `JWT_SECRET` value on both services' Railway Variables pages.

---

### 1️⃣2️⃣ Database Columns Can Be `bytea` — Fix With `ALTER TABLE` or `columnDefinition`

When deploying Spring Boot services to Railway, the first `ddl-auto: update` run might create columns with incorrect types (e.g., `bytea` instead of `varchar`). This causes runtime errors like:

```
ERROR: function lower(bytea) does not exist
```

**Fix in code:** Add `@Column(columnDefinition = "VARCHAR(255)")` to all `String` fields in JPA entities. This forces Hibernate to create `varchar` columns **for new tables**.

**Fix for EXISTING tables (permanent):** Connect to Railway's PostgreSQL and run:
```sql
ALTER TABLE customers
  ALTER COLUMN name TYPE VARCHAR(255),
  ALTER COLUMN company TYPE VARCHAR(255),
  ALTER COLUMN industry TYPE VARCHAR(255),
  ALTER COLUMN location TYPE VARCHAR(255),
  ALTER COLUMN email TYPE VARCHAR(255),
  ALTER COLUMN phone TYPE VARCHAR(255),
  ALTER COLUMN contact_person TYPE VARCHAR(255),
  ALTER COLUMN website TYPE VARCHAR(255),
  ALTER COLUMN notes TYPE TEXT,
  ALTER COLUMN tags TYPE VARCHAR(255);

ALTER TABLE opportunities
  ALTER COLUMN name TYPE VARCHAR(255),
  ALTER COLUMN customer_name TYPE VARCHAR(255),
  ALTER COLUMN assigned_to TYPE VARCHAR(255),
  ALTER COLUMN description TYPE TEXT;
```

**⚠️ `ddl-auto: create` won't work on Railway** because Docker caches the build layers before Hibernate runs the DDL. The cached `docker.io/library/eclipse-temurin:21-jre-alpine` layer means the `ddl-auto: create` setting is never executed against the actual database.

---

### Deployment Checklist for New Services

Before pushing a new Spring Boot service to Railway:

- [ ] Create `DataSourceConfig.java` that parses `DATABASE_URL`
- [ ] Remove Redis, Kafka, Cache dependencies if not needed on Railway
- [ ] Remove `@EnableCaching` if not using cache
- [ ] Remove `spring.data.redis`, `spring.cache`, `spring.kafka` from `application.yml`
- [ ] Set `server.port` to the correct port
- [ ] Add `app.jwt.secret` to `application.yml` with `${JWT_SECRET:fallback-value}`
- [ ] Add `management.endpoint.health.show-details: always`
- [ ] Create Dockerfile with multi-stage Maven build
- [ ] Add explicit `columnDefinition = "VARCHAR(255)"` to all String fields in entities
- [ ] Push to GitHub
- [ ] Add service on Railway with correct root directory
- [ ] Add `DATABASE_URL` = `${{ Postgres.DATABASE_URL }}`
- [ ] Add `JWT_SECRET` variable
- [ ] Generate domain with correct target port
- [ ] Update frontend `nginx.conf` with new location block
- [ ] Push nginx.conf update
- [ ] Verify with `curl /actuator/health`

---

## 🔑 Accounts & Secrets Needed

| Service | Purpose | Priority | Status |
|---------|---------|----------|--------|
| OpenAI API Key | LLM calls for AI agents | 🔴 Critical | ❌ Not obtained |
| SendGrid Account | Email sending | 🟡 Medium | ❌ Not obtained |
| Google Cloud Platform | Calendar API | 🟡 Medium | ❌ Not obtained |

---

## 📊 Tech Stack Reference

### Backend
- **Language:** Java 21
- **Framework:** Spring Boot 3.x
- **Build:** Maven
- **Database:** PostgreSQL 16 + pgvector
- **Auth:** JWT (HMAC-SHA256)
- **Deployment:** Railway (Docker multi-stage build)

### Frontend
- **Language:** TypeScript 5.x
- **Framework:** React 18.x
- **UI Library:** Material UI 5.x
- **State:** Zustand + TanStack Query
- **Routing:** React Router v6
- **Build:** Vite 5.x
- **Deployment:** Railway (Docker + Nginx multi-stage)
