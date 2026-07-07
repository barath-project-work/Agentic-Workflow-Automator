# 🏗 Architecture Overview

> **Architecture style:** Microservices with REST APIs + Docker containerization
> **Deployment:** Railway cloud platform with GitHub Actions CI/CD

---

## System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   Frontend (React SPA)                     │
│              Nginx Reverse Proxy (API Gateway)             │
├───────────┬──────────────────────────┬───────────────────┤
│  /api/auth│  /api/customers          │  /api/opportunities│
│     │     │         │                │         │         │
│  ┌──▼──┐  │   ┌─────▼──────┐        │  ┌──────▼─────┐   │
│  │Auth │  │   │ Customer   │        │  │  Customer  │   │
│  │:8081│  │   │ :8082      │        │  │  :8082     │   │
│  └──┬──┘  │   └─────┬──────┘        │  └──────┬─────┘   │
│     │     │         │               │         │         │
│  ┌──▼──┐  │   ┌─────▼──────┐        │         │         │
│  │Users│  │   │ Customers  │        │         │         │
│  │ DB  │  │   │ + Opps DB  │        │         │         │
│  └─────┘  │   └────────────┘        │         │         │
└───────────┴──────────────────────────┴───────────────────┘
```

---

## Microservices

| Service | Port | Language | Status | Data Store |
|---------|------|----------|--------|------------|
| **Auth Service** | 8081 | Java 21 / Spring Boot | 🟢 **Deployed** | PostgreSQL |
| **Customer Service** | 8082 | Java 21 / Spring Boot | 🟢 **Deployed** | PostgreSQL |
| **Frontend** | 80 (Nginx) | React 18 / TypeScript | 🟢 **Deployed** | Static files |
| **AI Agent Service** | 8087 | Python 3.11 / FastAPI | 🟡 **Coded, needs key** | PostgreSQL + OpenAI |
| **Workflow Service** | 8083 | Java 21 / Spring Boot | ⬜ **Not started** | — |
| **Task Service** | 8084 | Java 21 / Spring Boot | ⬜ **Not started** | — |
| **Notification Service** | 8085 | Java 21 / Spring Boot | ⬜ **Not started** | — |
| **Search Service** | 8086 | Java 21 / Spring Boot | ⬜ **Not started** | — |

---

## Communication Patterns

### Synchronous (REST)

Used when the client needs an immediate response:

```
Frontend → Nginx → Auth Service → PostgreSQL
         ↘       ↙
          Nginx → Customer Service → PostgreSQL
```

Each microservice validates JWT tokens **independently** using the same HMAC secret — no auth service calls at request time. This enables zero-latency validation and independent scaling.

### Asynchronous (Future)

Planned for long-running workflow execution:

```
User submits goal → Workflow Service → Kafka event
    → AI Agent Service (consumes) → executes steps
    → publishes results → Frontend polls status
```

---

## Deployment Topology

```
┌───────────────────────────────┐
│        Railway Cloud           │
│                               │
│  ┌───────────────────────┐   │
│  │   PostgreSQL 16       │   │
│  │   (Shared Database)   │   │
│  └───────┬───────────────┘   │
│          │                    │
│  ┌───────▼───────────────┐   │
│  │  Auth Service :8081    │   │
│  │  (Java/Spring Boot)    │   │
│  └───────────────────────┘   │
│                               │
│  ┌───────────────────────┐   │
│  │  Customer Service     │   │
│  │  :8082 (Java/Spring)  │   │
│  └───────────────────────┘   │
│                               │
│  ┌───────────────────────┐   │
│  │  Frontend :80 (Nginx)  │   │
│  │  Serves SPA + Proxies  │   │
│  └───────────────────────┘   │
└───────────────────────────────┘
```

### Key Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| **API Gateway** | Nginx reverse proxy | Simple, production-tested, built into frontend Docker image |
| **Database per service** | Each service has its own schema | Loose coupling, independent schema evolution |
| **JWT validation** | Local (per service) | No inter-service call needed for auth — lower latency |
| **Container base** | `eclipse-temurin:21-jre-alpine` | Small (~150MB), secure, LTS Java |
| **Build tool** | Maven + Wrapper | Consistent builds, no local install needed |

---

## Data Flow: Authenticated Request

```
1. User logs in → Auth service returns JWT tokens
2. Frontend stores JWT in localStorage (Zustand auth store)
3. Axios interceptor attaches JWT to every request
4. Nginx routes request to correct backend by URL path:
   - /api/auth/* → Auth Service
   - /api/customers/* → Customer Service
   - /api/opportunities/* → Customer Service
5. Backend validates JWT locally via HMAC key
6. Request processed, response returned
7. If 401 received, Axios interceptor auto-refreshes token
   and retries the original request
```

---

## Nginx API Gateway Configuration

```nginx
# Each backend service gets its own location block
location /api/auth {
    proxy_pass https://auth-service.up.railway.app;
    proxy_set_header Host auth-service.up.railway.app;
}

location /api/customers {
    proxy_pass https://customer-service.up.railway.app;
    proxy_set_header Host customer-service.up.railway.app;
}

location /api/opportunities {
    proxy_pass https://customer-service.up.railway.app;
    proxy_set_header Host customer-service.up.railway.app;
}

# SPA fallback — serve index.html for all other routes
location / {
    try_files $uri $uri/ /index.html;
}

# Static assets with long cache
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## Related Documentation

| Document | Link |
|----------|------|
| Authentication deep dive | [Authentication.md](Authentication.md) |
| API Reference | [API.md](API.md) |
| Database schema | [Database.md](Database.md) |
| Infrastructure | [Infrastructure.md](Infrastructure.md) |
| Deployment | [Deployment.md](Deployment.md) |
