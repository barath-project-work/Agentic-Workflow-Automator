# 📦 Deployment Guide

> **Platform:** Railway (cloud)
> **GitHub:** `barath-project-work/Agentic-Workflow-Automator`
> **Auto-deploy:** Railway deploys automatically on push to `main`

---

## Prerequisites

| Item | Required For |
|------|-------------|
| GitHub account | Repository + CI/CD |
| Railway account | Cloud deployment |
| PostgreSQL instance (Railway) | Database for all services |
| `JWT_SECRET` | HMAC signing key (min 256-bit string) |

---

## Service URLs (Live)

| Component | URL | Port |
|-----------|-----|------|
| **Frontend** | `cheerful-respect-production-1c45.up.railway.app` | 80 |
| **Auth Service** | `agentic-workflow-automator-production.up.railway.app` | 8081 |
| **Customer Service** | `customer-service-production-0ff7.up.railway.app` | 8082 |

---

## Environment Variables

### All Services

| Variable | Source | Purpose |
|----------|--------|---------|
| `DATABASE_URL` | `${{ Postgres.DATABASE_URL }}` | PostgreSQL connection string |

### Auth & Customer Services

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | ✅ | Railway template variable |
| `JWT_SECRET` | ✅ | **Must be identical** across both services |

### Frontend

No environment variables needed — it serves static files through Nginx.

---

## Step-by-Step: Adding a New Service

When adding a new Spring Boot microservice to Railway:

### 1. Code Preparation

```java
// Every service needs DataSourceConfig.java to parse Railway's DATABASE_URL
@Bean @Primary
public DataSource dataSource() {
    String databaseUrl = System.getenv("DATABASE_URL");
    if (databaseUrl == null || databaseUrl.isBlank()) {
        return DataSourceBuilder.create()
            .url("jdbc:postgresql://localhost:5432/atlasai")
            .username("atlasai")
            .password("atlasai_secret")
            .driverClassName("org.postgresql.Driver")
            .build();
    }
    URI uri = new URI(databaseUrl);
    String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + uri.getPort() + uri.getPath();
    String[] userInfo = uri.getUserInfo().split(":");
    return DataSourceBuilder.create()
        .url(jdbcUrl)
        .username(userInfo[0])
        .password(userInfo[1])
        .driverClassName("org.postgresql.Driver")
        .build();
}
```

### 2. Remove Unsupported Dependencies

Railway doesn't provide Redis or Kafka by default. **Remove** from `pom.xml`:

```xml
<!-- ❌ Remove these for Railway deployments -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
```

Also remove `@EnableCaching`, `spring.data.redis`, `spring.cache`, and `spring.kafka` from config.

### 3. Add Entity Column Definitions

Prevent `bytea` column type issue:

```java
@Column(columnDefinition = "VARCHAR(255)")
private String name;

@Column(columnDefinition = "TEXT")
private String notes;
```

### 4. Configure application.yml

```yaml
server:
  port: 8083  # Must match Railway target port

management:
  endpoint:
    health:
      show-details: always  # Show DB health details
```

### 5. Railway Setup

1. Create new Railway service from GitHub repo
2. Set root directory (e.g., `services/auth-service`)
3. Add environment variables
4. Generate domain with correct target port
5. Verify with `curl /actuator/health`

### 6. Update Nginx Config

Add a new location block to `frontend/nginx.conf`:

```nginx
location /api/new-service {
    proxy_pass https://new-service-domain.up.railway.app;
    proxy_set_header Host new-service-domain.up.railway.app;
}
```

---

## Deployment Checklist

Before pushing a new service to Railway:

- [ ] `DataSourceConfig.java` created (parses `DATABASE_URL`)
- [ ] Redis/Kafka deps removed from `pom.xml`
- [ ] `@EnableCaching` removed (if present)
- [ ] `spring.data.redis/cache/kafka` removed from `application.yml`
- [ ] `server.port` matches Railway target port
- [ ] `app.jwt.secret` has `${JWT_SECRET:fallback-value}` format
- [ ] `management.endpoint.health.show-details: always`
- [ ] `@Column(columnDefinition = "VARCHAR(255)")` on all String fields
- [ ] Dockerfile with multi-stage build
- [ ] Pushed to GitHub → Railway auto-deploys
- [ ] Verified with `curl /actuator/health`
- [ ] Nginx config updated with new location block
- [ ] Nginx config pushed

---

## Verification Commands

```bash
# Health check
curl https://service-domain.up.railway.app/actuator/health

# Register a test user
curl -X POST https://auth-domain.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'

# Login
TOKEN=$(curl -s -X POST https://auth-domain.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}' \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['accessToken'])")

# Test customer CRUD
curl https://customer-domain.up.railway.app/api/customers \
  -H "Authorization: Bearer $TOKEN"

# Create a customer
curl -X POST https://customer-domain.up.railway.app/api/customers \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Acme Corp","company":"Acme Inc","industry":"Tech"}'
```

---

## Troubleshooting

### 1. Health Check Shows DOWN

```json
{"status":"DOWN"}
```

**Fix:** Enable health details in `application.yml`:
```yaml
management:
  endpoint:
    health:
      show-details: always
```

### 2. Services Crash on Startup

**Symptom:** Connection refused to `localhost:5432`.

**Fix:** Add `DataSourceConfig.java` to parse Railway's `DATABASE_URL` format.

### 3. 403 Forbidden on API Calls

**Symptom:** Login works but customer APIs return 403.

**Fix:** Ensure `JWT_SECRET` is identical on both auth-service and customer-service.

### 4. 500 Error on List Endpoints

**Symptom:** `ERROR: function lower(bytea) does not exist`

**Fix:** Add `@Column(columnDefinition = "VARCHAR(255)")` to entity string fields. For existing databases, run `ALTER TABLE` SQL.

### 5. Nginx 404 on API Routes

**Symptom:** Direct backend access works, through Nginx returns 404.

**Fix:** Remove trailing slashes from `location` blocks:
```nginx
# ❌ Wrong
location /api/customers/ { ... }

# ✅ Correct
location /api/customers { ... }
```

---

## Related Documentation

| Document | Link |
|----------|------|
| Infrastructure | [Infrastructure.md](Infrastructure.md) |
| Debugging & fixes | [Debugging.md](Debugging.md) |
| Architecture | [Architecture.md](Architecture.md) |
