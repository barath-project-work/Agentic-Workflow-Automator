# 🐳 Infrastructure & DevOps

> **Containerization:** Docker multi-stage builds
> **CI/CD:** GitHub Actions (7 parallel build jobs)
> **Production:** Railway cloud platform

---

## Multi-Stage Docker Builds

Every Java service uses the same multi-stage pattern to minimize image size:

```dockerfile
# Stage 1: Build with Maven (includes JDK + all deps)
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline -q || true     # Cache deps in a layer
COPY src/ src/
RUN mvn package -DskipTests -q               # Compile & package

# Stage 2: Run with JRE only (much smaller image)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Why this matters:** Stage 1 has the full JDK (~300MB), Stage 2 only the JRE (~150MB). The final deployed image is half the size.

---

## CI/CD Pipeline

Every push to `main` triggers 7 parallel build jobs via GitHub Actions:

```yaml
jobs:
  build-auth-service:           # Java 21 + Maven
  build-customer-service:       # Java 21 + Maven
  build-workflow-service:       # Java 21 + Maven (scaffolded)
  build-task-service:           # Java 21 + Maven (scaffolded)
  build-notification-service:   # Java 21 + Maven (scaffolded)
  build-search-service:         # Java 21 + Maven (scaffolded)
  build-frontend:               # Node 18 + npm build
```

On success, **Railway auto-deploys** changed services directly from GitHub.

---

## Docker Compose (Local Development)

```yaml
services:
  postgres:     # PostgreSQL 16 + pgvector (port 5432)
  redis:        # Redis 7 (port 6379)
  zookeeper:    # Kafka dependency (port 2181)
  kafka:        # Apache Kafka (port 9092)
  pgadmin:      # DB management UI (port 5050)
```

Start with:
```bash
docker-compose -f infra/docker-compose.yml up -d
```

---

## Nginx Configuration

The frontend's Nginx acts as both a **static file server** and an **API gateway**:

| Feature | Setting |
|---------|---------|
| **Gzip compression** | Enabled for JSON, JS, CSS, SVG, fonts |
| **Security headers** | X-Frame-Options, X-Content-Type-Options, XSS-Protection, Referrer-Policy |
| **SPA routing** | All non-file routes serve `index.html` |
| **Asset caching** | `/assets/` → 1 year immutable, `/founder/` → 30 days |
| **Hidden files** | Deny access to all `.` prefixed files |
| **Health check** | `/health` returns 200 OK |

### API Routing

Each backend service gets a separate location block with individual timeout and SSL settings:

```nginx
location /api/auth {
    proxy_pass https://auth-service-domain.up.railway.app;
    proxy_set_header Host auth-service-domain.up.railway.app;
    proxy_connect_timeout 10s;
    proxy_read_timeout 10s;
}

location /api/customers {
    proxy_pass https://customer-service-domain.up.railway.app;
    proxy_set_header Host customer-service-domain.up.railway.app;
}

location /api/workflows {
    proxy_pass https://workflow-service-production.up.railway.app;
    proxy_set_header Host workflow-service-production.up.railway.app;
}
```

**Critical:** `proxy_set_header Host` must match each service's **own** domain, not a shared value. This is how Railway routes requests to the correct container.

---

## Railway Deployment

### Required Environment Variables

| Service | Variables |
|---------|-----------|
| **Auth Service** | `DATABASE_URL` = `${{ Postgres.DATABASE_URL }}`, `JWT_SECRET` = (your secret) |
| **Customer Service** | `DATABASE_URL` = `${{ Postgres.DATABASE_URL }}`, `JWT_SECRET` = (must match auth) |
| **Frontend** | None (static files served by Nginx) |
| **Workflow Service** | `DATABASE_URL` = `${{ Postgres.DATABASE_URL }}`, `JWT_SECRET` = (must match auth) |
| **Future services** | Same pattern: `DATABASE_URL` + `JWT_SECRET` |

### Target Ports

| Service | `server.port` | Railway Target Port |
|---------|---------------|-------------------|
| Auth | 8081 | 8081 |
| Customer | 8082 | 8082 |
| Workflow | 8083 | 8083 |
| Frontend | Nginx :80 | 80 |

---

## Related Documentation

| Document | Link |
|----------|------|
| Architecture | [Architecture.md](Architecture.md) |
| Deployment guide | [Deployment.md](Deployment.md) |
| Debugging & fixes | [Debugging.md](Debugging.md) |
