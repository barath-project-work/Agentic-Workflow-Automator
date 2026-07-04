# AtlasAI — Project Implementation Plan

> **Project:** Agentic Sales Workflow Automation Platform
> **Last Updated:** July 4, 2026

---

## 📋 Status Overview

| Layer | Completion | Status |
|-------|-----------|--------|
| **Frontend Pages** | ~95% | ✅ All 43 pages built — auth + customers + opportunities wired to real backend |
| **Auth Service** | 100% | ✅ Running on Railway — register, login, refresh, RBAC verified |
| **Customer/CRM Service** | 100% | ✅ Running on Railway — full CRUD for customers & opportunities |
| **Frontend→Backend Integration** | 40% | 🟡 Customers, Opportunities & Dashboard wired — need loading skeletons |
| **Frontend Nginx** | 100% | ✅ Routes /api/auth → auth-service, /api/customers & /api/opportunities → customer-service |
| **Founder Page Redesign** | 100% | ✅ Premium 3-column dashboard layout with responsive grid |
| **Mobile Responsive** | 30% | 🟡 Auth pages done — 40+ more pages need mobile fixes |
| **AI Agent Service** | 80% | ✅ Python structure done — needs OpenAI key |
| **Workflow Service** | 0% | ❌ Not started |
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

---

## 📦 Phase 2: Customer/CRM Service (Port 8082) ✅ Complete & Deployed

### Backend — Full Java/Spring Boot Microservice

```
services/customer-service/src/main/java/com/atlasai/customer/
├── CustomerApplication.java                 — Entry point (no @EnableCaching)
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

**API Endpoints:**

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/customers?search=&industry=&location=&status=&daysSinceContact=` | Search/filter customers |
| `GET` | `/api/customers/{id}` | Get customer by ID |
| `POST` | `/api/customers` | Create customer |
| `PUT` | `/api/customers/{id}` | Update customer |
| `DELETE` | `/api/customers/{id}` | Delete customer |
| `GET` | `/api/customers/count` | Customer count |
| `GET` | `/api/opportunities?search=&stage=&minValue=&maxValue=` | Search/filter opportunities |
| `GET` | `/api/opportunities/{id}` | Get opportunity by ID |
| `GET` | `/api/opportunities/by-customer/{customerId}` | Get by customer |
| `POST` | `/api/opportunities` | Create opportunity |
| `PUT` | `/api/opportunities/{id}` | Update opportunity |
| `DELETE` | `/api/opportunities/{id}` | Delete opportunity |
| `GET` | `/api/opportunities/count` | Opportunity count |

### Frontend — Real API Connection

**New files:**
- `frontend/src/services/customerService.ts` — API client
- `frontend/src/services/opportunityService.ts` — API client
- `frontend/src/hooks/useCustomers.ts` — TanStack Query hooks
- `frontend/src/hooks/useOpportunities.ts` — TanStack Query hooks
- `frontend/src/hooks/useDashboard.ts` — Dashboard summary hooks

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

### To Do
- [ ] Run end-to-end auth + customer CRUD flow test on production
- [ ] Add more services to Nginx as they're built (workflows, tasks, etc.)
- [ ] Set up custom domain + SSL (if needed)
- [ ] Monitor logs and error rates

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
