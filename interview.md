# 📘 Full Stack Developer Intern — Complete Interview Preparation Guide

> **Project:** AtlasAI — Agentic Workflow Automation Platform  
> **Tech Stack:** Java 21, Spring Boot 3, React 18, TypeScript, PostgreSQL, Docker, Nginx, Railway  
> **Target Role:** Full Stack Developer Intern

---

## 📑 Table of Contents

1. [Part 1: Full Stack Development Fundamentals](#part-1-full-stack-development-fundamentals)
2. [Part 2: Java & Spring Boot Backend](#part-2-java--spring-boot-backend)
3. [Part 3: React & TypeScript Frontend](#part-3-react--typescript-frontend)
4. [Part 4: Project-Specific Questions — AtlasAI](#part-4-project-specific-questions--atlasai)
5. [Part 5: DevOps, Deployment & Infrastructure](#part-5-devops-deployment--infrastructure)
6. [Part 6: System Design & Architecture](#part-6-system-design--architecture)
7. [Part 7: Data Structures, Algorithms & Coding](#part-7-data-structures-algorithms--coding)
8. [Part 8: Behavioral Questions & Mock Scenarios](#part-8-behavioral-questions--mock-scenarios)
9. [Part 9: Cheat Sheets & Quick References](#part-9-cheat-sheets--quick-references)

---

# Part 1: Full Stack Development Fundamentals

---

## 🟢 Level 1 — Beginner (The Basics)

### 1.1 What is Full Stack Development?

**Answer:** Full stack development means working on both the **frontend** (what users see and interact with) and the **backend** (the server, database, and business logic that powers the application).

| Layer | What It Does | Example in AtlasAI |
|-------|-------------|-------------------|
| **Frontend** | UI, user interaction, API calls | React app with 43 pages, MUI components |
| **Backend** | Business logic, data processing | Java Spring Boot microservices |
| **Database** | Persistent data storage | PostgreSQL 16 |
| **API Gateway** | Routes requests to correct service | Nginx reverse proxy |
| **Infrastructure** | Hosting, deployment, CI/CD | Docker, GitHub Actions, Railway |

### 1.2 How Does a Web Request Flow?

```
User clicks "Login" button
  → React component (LoginPage.tsx) handles click
  → Axios makes POST /api/auth/login request
  → Nginx receives request at port 80
  → Nginx proxies to Auth Service (port 8081)
  → Spring Security filter chain intercepts
  → AuthController.login() processes request
  → AuthService.authenticate() validates credentials
  → JwtService.generateAccessToken() creates JWT
  → AuthResponse returned to frontend
  → authStore stores tokens in Zustand + localStorage
  → React Router navigates to /dashboard
```

### 1.3 HTTP Methods & Status Codes

**Common HTTP Methods:**
| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve data | `GET /api/customers?page=0&size=20` |
| `POST` | Create new resource | `POST /api/customers` → 201 Created |
| `PUT` | Update existing resource | `PUT /api/customers/{id}` |
| `DELETE` | Remove resource | `DELETE /api/customers/{id}` → 204 No Content |

**Key Status Codes to Memorize:**
| Code | Meaning | When to Use |
|------|---------|-------------|
| **200** | OK | Successful GET, PUT |
| **201** | Created | Successful POST |
| **204** | No Content | Successful DELETE (no body) |
| **400** | Bad Request | Invalid input, validation failure |
| **401** | Unauthorized | Invalid/expired JWT token |
| **403** | Forbidden | Insufficient role permissions |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Duplicate entry, constraint violation |
| **500** | Internal Server Error | Unexpected server failure |

### 1.4 REST API Principles

**REST = Representational State Transfer**

Key principles demonstrated in AtlasAI:
1. **Stateless** — Each request contains all info needed (JWT token in header)
2. **Resource-based URLs** — `/api/customers`, `/api/customers/{id}`
3. **HTTP methods as verbs** — GET to read, POST to create, PUT to update, DELETE to remove
4. **JSON format** — All request/response bodies use JSON
5. **Consistent error format** — All errors return `{ "error": "message" }`

---

## 🟡 Level 2 — Intermediate (Core Concepts)

### 1.5 Client-Server Architecture

**Q: Explain client-server architecture with respect to your project.**

**A:** AtlasAI uses a typical **microservices-based client-server architecture**:
- **Client:** React SPA (Single Page Application) running in the browser
- **Server:** Multiple independent services (auth, customer, workflow, etc.)
- **API Gateway:** Nginx acts as the single entry point, routing to the correct microservice based on the URL path
- **Database:** PostgreSQL 16, shared across services (each service has its own schema)

**Key Benefit:** The frontend doesn't need to know which specific server handles each request — it just talks to `/api/*` and Nginx handles the routing.

### 1.6 MVC Pattern

**Q: Explain the MVC (Model-View-Controller) pattern.**

**A:** MVC separates application logic into three components:

| Component | Backend (Spring Boot) | Frontend (React) |
|-----------|----------------------|------------------|
| **Model** | JPA Entities (`User.java`, `Customer.java`) | TypeScript types/interfaces |
| **View** | Not used (REST API returns JSON) | React components (JSX) |
| **Controller** | `@RestController` classes handle HTTP requests | React pages + hooks manage state |

**In AtlasAI's backend:**
```
Request → Controller (routes + validation) → Service (business logic) → Repository (database)
```

**Example flow for creating a customer:**
1. `CustomerController.createCustomer()` receives the HTTP request
2. Validates input via `@Valid @RequestBody CustomerRequest`
3. Calls `CustomerService.createCustomer()` which handles business logic
4. Service calls `CustomerRepository.save()` to persist to PostgreSQL

### 1.7 JWT Authentication Flow

**Q: Explain how JWT authentication works in your project.**

**A:** JWT (JSON Web Token) is a stateless authentication mechanism.

**Login Flow:**
```
1. User sends email + password → POST /api/auth/login
2. AuthService authenticates via Spring Security AuthenticationManager
3. JwtService generates:
   - Access Token (1 hour expiry) — contains {userId, email, role}
   - Refresh Token (7 day expiry) — contains {type: "refresh"}
4. Tokens returned to frontend, stored in localStorage
5. For every subsequent request:
   - Axios interceptor attaches "Authorization: Bearer <token>"
   - Backend JwtAuthFilter validates token signature & expiry
   - If valid → SecurityContextHolder.setAuthentication()
   - If invalid/expired → 401 returned
6. On 401, Axios response interceptor:
   - Calls POST /api/auth/refresh with refresh token
   - Gets new token pair
   - Retries the original request
```

**Access Token Structure (decoded):**
```json
{
  "sub": "user@email.com",
  "role": "ROLE_USER",
  "email": "user@email.com",
  "userId": "362b4a35-...",
  "iat": 1783232863,
  "exp": 1783236463
}
```

**Why use refresh tokens?** Access tokens are short-lived (1 hour) so if stolen, damage is limited. Refresh tokens are long-lived but can be revoked (stored as SHA-256 hash, cleared on logout).

### 1.8 What is CORS?

**Q: What is CORS and how do you handle it?**

**A:** CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks requests from a different origin (protocol + domain + port) than the serving server.

**In development:** React dev server (port 5173) makes requests to backend (port 8081) — different origins cause CORS errors.

**Solutions:**
1. **Proxy in dev server** — Vite config proxies `/api` to backend
2. **Nginx in production** — Frontend and API are served from same origin (Nginx port 80), so no CORS issue
3. **Backend `@CrossOrigin`** — Spring Boot annotation to allow specific origins

**In AtlasAI:** CORS isn't an issue in production because Nginx (port 80) serves both the React SPA and proxies API calls to backends — they appear as same-origin to the browser.

### 1.9 SQL vs NoSQL

**Q: When would you use PostgreSQL vs MongoDB?**

**A:** 

**PostgreSQL (what AtlasAI uses):**
- **Schema:** Rigid, predefined tables with relationships (JOINs)
- **ACID compliance:** Guarantees data integrity
- **Best for:** Financial data, user accounts, structured business data
- **Example in project:** `users` table with foreign key to customers

**MongoDB (NoSQL):**
- **Schema:** Flexible, documents can have different fields
- **Scaling:** Easier horizontal scaling (sharding)
- **Best for:** Log data, product catalogs, real-time analytics
- **Not suitable for:** Complex relationships, transactional data

**Why AtlasAI uses PostgreSQL:** Business CRM data has clear relationships (Customer → Opportunity → Task), needs ACID compliance, and uses complex queries (filtering, pagination, search).

---

## 🔴 Level 3 — Advanced (Deep Concepts)

### 1.10 Microservices vs Monolith

**Q: Why did you choose microservices over a monolith for AtlasAI?**

**A:** 

**Monolith:** Single application that handles everything. Pros: simpler at small scale, easier to test. Cons: hard to scale independently, long build times, tech lock-in.

**Microservices (AtlasAI's approach):**
```
Advantages:
  ✅ Independent scaling — Auth service can scale up without scaling customer service
  ✅ Independent deployment — Fix in one service doesn't affect others
  ✅ Technology diversity — Auth in Java, AI Agent in Python
  ✅ Team autonomy — Teams own individual services
  ✅ Fault isolation — One service crash doesn't take down everything

Disadvantages:
  ❌ Network latency — Services communicate over HTTP
  ❌ Complexity — Need API gateway, service discovery, distributed tracing
  ❌ Data consistency — Each service has its own database
  ❌ Deployment overhead — 5 services to deploy vs 1 monolith
```

**Trade-off made in AtlasAI:** We accepted the deployment complexity in exchange for independent scaling and the ability to build the AI Agent Service in Python (which wouldn't be possible in a Java monolith).

### 1.11 API Gateway Pattern

**Q: Explain the API Gateway pattern and how AtlasAI implements it.**

**A:** An API Gateway is a single entry point that routes client requests to the appropriate backend service.

**AtlasAI Implementation (Nginx):**

```nginx
# Each backend gets its own location block
location /api/auth { proxy_pass https://auth-service:8081; }
location /api/customers { proxy_pass https://customer-service:8082; }
location /api/workflows { proxy_pass https://workflow-service:8083; }
location /api/tasks { proxy_pass https://task-service:8084; }
```

**Benefits:**
- **Single public endpoint** — Frontend only knows one URL
- **Protocol translation** — External HTTPS, internal HTTP
- **Cross-cutting concerns** — Security headers, rate limiting, caching in one place
- **Simpler deployment** — Can move backend URLs without frontend changes

### 1.12 Horizontal vs Vertical Scaling

**Q: Explain how you'd scale AtlasAI for 10x more users.**

**A:**

**Vertical Scaling (Scale Up):**
- Upgrade the server: more RAM, faster CPU
- Simpler, no code changes
- Limited by hardware max — e.g., Oracle Cloud Free Tier maxes at 12GB RAM

**Horizontal Scaling (Scale Out):**
- Add more instances of each service
- Requires a load balancer (Nginx, AWS ELB)
- Each microservice can scale independently
- Auth service might need 3 instances, Customer service 2 instances

**For AtlasAI:**
1. Deploy Nginx as a dedicated load balancer
2. Add Statelessness — JWT tokens make services stateless (easy to scale)
3. Database — Add read replicas for PostgreSQL
4. Session — With JWT, no sticky sessions needed — any instance can handle any request

### 1.13 Stateless vs Stateful Architecture

**Q: Why is a stateless architecture better for scaling?**

**A:** 

**Stateful:** Server stores session data in memory. A user must be routed to the same server for each request (sticky sessions).

**Stateless (AtlasAI's approach):**
- All session data is in the JWT token itself
- Any server instance can handle any request
- Simple horizontal scaling — add more instances behind a load balancer
- No server-side session storage needed

**Catch:** Refresh tokens require state (revocation). AtlasAI stores a SHA-256 hash of the refresh token in the database. This is a compromise — we accept one DB call per refresh for security.

### 1.14 Database Indexing & Query Optimization

**Q: How would you optimize slow queries in AtlasAI?**

**A:** 

**Identifying slow queries:**
- Enable `spring.jpa.show-sql: true` to see generated SQL
- Check PostgreSQL slow query log
- Use `EXPLAIN ANALYZE` on queries

**Indexing strategies used in AtlasAI:**
```sql
-- Unique index on email (already created by @Column(unique=true))
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Composite index for customer search
CREATE INDEX idx_customers_search ON customers(industry, location, status);

-- Index for opportunity lookup by customer
CREATE INDEX idx_opportunities_customer ON opportunities(customer_id);
```

**Pagination optimization** (already done in AtlasAI):
```java
// Returns Page<T> with countQuery — avoids loading all rows
Page<CustomerResponse> customers = customerRepository.searchCustomers(..., pageable);
```

### 1.15 ACID Properties

**Q: Explain ACID properties and how they apply to AtlasAI.**

**A:** 

| Property | Meaning | Example in AtlasAI |
|----------|---------|-------------------|
| **Atomicity** | All or nothing | `@Transactional` on `AuthService.register()` — creates user AND stores refresh token hash together |
| **Consistency** | Data follows rules | `@Column(unique=true)` on email — prevents duplicate users |
| **Isolation** | Concurrent transactions don't interfere | `@Transactional` isolation level — two users can't register with same email simultaneously |
| **Durability** | Committed data persists | Data written to PostgreSQL disk — survives server restart |

---

# Part 2: Java & Spring Boot Backend

---

## 🟢 Level 1 — Beginner

### 2.1 What is Spring Boot?

**Q: What is Spring Boot and why did you use it?**

**A:** Spring Boot is a Java framework that simplifies building production-ready applications with embedded servers, auto-configuration, and starter dependencies.

**Why AtlasAI uses Spring Boot:**
- **Auto-configuration** — Spring Boot automatically configures beans based on dependencies (e.g., if `spring-boot-starter-data-jpa` is on classpath, it auto-configures Hibernate + DataSource)
- **Embedded server** — Tomcat is embedded, no external server setup needed (`java -jar app.jar`)
- **Production-ready** — Actuator endpoints for health checks, metrics
- **Large ecosystem** — Spring Security, Data JPA, Validation, etc.

### 2.2 What are Annotations in Spring Boot?

**Q: Explain the key Spring Boot annotations used in AtlasAI.**

**A:**

| Annotation | Purpose | Example in Project |
|-----------|---------|-------------------|
| `@SpringBootApplication` | Entry point, combines `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan` | `AuthApplication.java` |
| `@RestController` | Marks class as REST controller (returns JSON) | `AuthController.java` |
| `@RequestMapping("/api/auth")` | Base URL path for controller | All controllers |
| `@GetMapping`, `@PostMapping` | HTTP method mapping | `@GetMapping("/me")` |
| `@Service` | Marks class as business logic layer | `AuthService.java` |
| `@Repository` | Marks class as data access layer | `UserRepository.java` |
| `@Entity` | Marks class as JPA entity (maps to DB table) | `User.java`, `Customer.java` |
| `@Autowired` / `@RequiredArgsConstructor` | Dependency injection | All services/controllers |
| `@Transactional` | Ensures all DB operations in method succeed or rollback together | `AuthService.register()` |
| `@Valid` | Triggers Bean Validation | `@Valid @RequestBody RegisterRequest` |
| `@Component` | Generic Spring bean | `JwtAuthenticationFilter.java` |
| `@Configuration` | Defines beans in a config class | `SecurityConfig.java` |
| `@Bean` | Declares a single bean | `DataSourceConfig.dataSource()` |

### 2.3 Dependency Injection (DI)

**Q: Explain Dependency Injection and how it's used in AtlasAI.**

**A:** Dependency Injection is a design pattern where objects receive their dependencies from an external source (the Spring IoC container) rather than creating them themselves.

**Without DI (tight coupling):**
```java
public class AuthService {
    private UserRepository userRepository = new UserRepository(); // ❌ Hard dependency
    private JwtService jwtService = new JwtService();             // ❌ Can't swap/mock
}
```

**With DI (loose coupling):**
```java
@Service
@RequiredArgsConstructor  // Lombok generates constructor injection
public class AuthService {
    private final UserRepository userRepository;  // ✅ Spring injects these
    private final JwtService jwtService;           // ✅ via constructor
}
```

**Benefits:**
- **Testability** — Can mock dependencies in unit tests
- **Loose coupling** — Classes don't create their own dependencies
- **Flexibility** — Swap implementations (e.g., mock repository vs real repository)

### 2.4 What is Maven?

**Q: What is Maven and what is `pom.xml`?**

**A:** Maven is a build automation and dependency management tool for Java projects.

**In AtlasAI's `pom.xml`:**
- **Dependencies:** Spring Boot starters, JJWT, Lombok, PostgreSQL driver
- **Plugins:** Spring Boot Maven plugin (packages executable JAR)
- **Build lifecycle:** `mvn clean compile test package`

**Key commands:**
```bash
./mvnw package -DskipTests  # Build JAR (skip tests for speed)
./mvnw spring-boot:run      # Run service locally
./mvnw clean verify          # Full build + tests
```

---

## 🟡 Level 2 — Intermediate

### 2.5 Spring Security Filter Chain

**Q: Explain the Spring Security filter chain and how AtlasAI uses it.**

**A:** Spring Security processes requests through a chain of filters. In AtlasAI:

```
Request → SecurityContextPersistenceFilter → ...
  → JwtAuthenticationFilter (custom) → ...
    → FilterSecurityInterceptor (checks authorization)
      → Controller
```

**JwtAuthenticationFilter logic:**
```java
protected void doFilterInternal(request, response, filterChain) {
    // 1. Extract Authorization header
    String authHeader = request.getHeader("Authorization");
    
    // 2. If no "Bearer " prefix, skip (don't authenticate)
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
    }
    
    // 3. Try to parse and validate the JWT
    try {
        String jwt = authHeader.substring(7);
        String email = jwtService.extractEmail(jwt);
        
        // 4. If valid, create Authentication object and set in context
        if (email != null && !isAuthenticated()) {
            UserDetails userDetails = loadUser(email);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
    } catch (Exception e) {
        // 5. If invalid, clear context (let request continue — 
        //    it will be rejected by SecurityConfig if endpoint requires auth)
        log.warn("JWT validation failed: {}", e.getMessage());
        SecurityContextHolder.clearContext();
    }
    
    // 6. Always continue filter chain
    filterChain.doFilter(request, response);
}
```

**Key design decision:** The filter NEVER blocks requests — it only sets or clears the security context. The `SecurityConfig` decides which endpoints require authentication.

### 2.6 JPA & Hibernate

**Q: Explain JPA and Hibernate and how AtlasAI uses them.**

**A:** JPA (Java Persistence API) is the specification. Hibernate is the implementation (ORM — Object Relational Mapping).

**Entity Example (Customer.java):**
```java
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)  // Auto-generate UUID
    private UUID id;
    
    @Column(nullable = false, columnDefinition = "VARCHAR(255)")  // Explicit type
    private String name;
    
    @Enumerated(EnumType.STRING)  // Store enum as string (not ordinal)
    @Column(length = 20)
    private CustomerStatus status;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist  // Callback before saving
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
```

**Repository Example:**
```java
public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    // Spring Data JPA auto-implements this!
    
    // Custom query method
    Page<Customer> findByStatusAndIndustry(CustomerStatus status, String industry, Pageable pageable);
    
    // Custom JPQL query
    @Query("SELECT c FROM Customer c WHERE " +
           "(:search IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Customer> searchCustomers(@Param("search") String search, Pageable pageable);
}
```

**Key annotations:**
| Annotation | Purpose |
|-----------|---------|
| `@Entity` | Marks class as mapped to DB table |
| `@Id` | Primary key field |
| `@GeneratedValue` | Auto-generation strategy |
| `@Column` | Column details (name, nullable, unique, columnDefinition) |
| `@Enumerated(EnumType.STRING)` | Store enum as string |
| `@PrePersist`, `@PreUpdate` | Lifecycle callbacks |

### 2.7 DTO Pattern

**Q: Why does AtlasAI use separate Request and Response classes instead of using the Entity directly?**

**A:** Using DTOs (Data Transfer Objects) provides:

1. **Security** — Never expose internal fields (e.g., `password`). Entity has password field, but `UserResponse` doesn't.
2. **Decoupling** — API contract stays stable even if entity changes
3. **Validation** — Request DTOs can have validation annotations without polluting entity

```java
// Request — validates input
public class RegisterRequest {
    @NotBlank(message = "Name is required")
    private String name;
    
    @Email(message = "Invalid email format")
    @NotBlank
    private String email;
    
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}

// Response — controls what's returned to client
public class UserResponse {
    private UUID id;
    private String name;
    private String email;
    private String role;  // No password field!
    private LocalDateTime createdAt;
}

// Entity — internal representation
@Entity
public class User {
    private UUID id;
    private String name;
    private String email;
    private String password;  // Hashed, never returned to client
    private Role role;
    private String refreshTokenHash;  // Internal, never exposed
}
```

### 2.8 Exception Handling in Spring Boot

**Q: How does AtlasAI handle errors consistently?**

**A:** Using `@ControllerAdvice` (global exception handler):

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBadRequest(IllegalArgumentException e) {
        log.warn("Bad request: {}", e.getMessage());
        return new ErrorResponse(e.getMessage());
    }
    
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleUnauthorized(BadCredentialsException e) {
        return new ErrorResponse("Invalid email or password");
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleForbidden(AccessDeniedException e) {
        return new ErrorResponse("Access denied");
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleValidation(MethodArgumentNotValidException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Validation failed");
        response.put("fieldErrors", e.getFieldErrors().stream()
            .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage)));
        return response;
    }
}
```

**Consistent error format:**
```json
// Simple error
{ "error": "Customer not found: uuid-here" }

// Validation error
{ 
  "error": "Validation failed",
  "fieldErrors": {
    "email": "must be a valid email address",
    "name": "must not be blank"
  }
}
```

---

## 🔴 Level 3 — Advanced

### 2.9 DataSourceConfig & Railway's DATABASE_URL

**Q: Explain how AtlasAI reads environment variables for database configuration.**

**A:** Railway provides PostgreSQL as a `DATABASE_URL` environment variable in this format:
```
postgresql://user:password@host:5432/dbname
```

But Spring Boot's JDBC driver expects:
```
jdbc:postgresql://host:5432/dbname
```

**Solution — DataSourceConfig.java:**
```java
@Configuration
public class DataSourceConfig {
    
    @Bean
    @Primary
    public DataSource dataSource() throws URISyntaxException {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        // No env var → use local dev defaults
        if (databaseUrl == null || databaseUrl.isBlank()) {
            return DataSourceBuilder.create()
                .url("jdbc:postgresql://localhost:5432/atlasai")
                .username("atlasai")
                .password("atlasai_secret")
                .build();
        }
        
        // Parse Railway's format: postgresql://user:pass@host:port/db
        URI uri = new URI(databaseUrl);
        String[] userInfo = uri.getUserInfo().split(":");
        String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + uri.getPort() + uri.getPath();
        
        return DataSourceBuilder.create()
            .url(jdbcUrl)
            .username(userInfo[0])
            .password(userInfo[1])
            .build();
    }
}
```

**Key insight:** Without this class, services try to connect to `localhost:5432` on Railway (which doesn't exist) and crash immediately.

### 2.10 The `bytea` Bug — Root Cause Analysis

**Q: Explain the `bytea` column bug you encountered and how you fixed it.**

**A:** 

**Symptom:** `ERROR: function lower(bytea) does not exist` on search endpoints.

**Root Cause:** When Spring Boot's Hibernate auto-creates tables on PostgreSQL (via `ddl-auto: update`), String columns were being created as `bytea` (binary type) instead of `varchar`. PostgreSQL's `LOWER()` function only works on text types, not binary.

**Why it happened:** Railway's PostgreSQL had a schema mismatch. The first deployment created tables with `bytea` columns (possibly due to Hibernate's type detection with the Railway JDBC URL), and subsequent redeploys didn't fix the column types.

**Fix — Three layers:**

1. **Immediate fix (service layer fallback):**
```java
public Page<CustomerResponse> searchCustomers(..., Pageable pageable) {
    // If NO filters provided, use simple findAll() — avoids LOWER() entirely
    if (allFiltersAreNull()) {
        return customerRepository.findAll(pageable).map(this::toResponse);
    }
    // If filters provided (and bytea issue exists), this still crashes
    return customerRepository.searchCustomers(..., pageable).map(this::toResponse);
}
```

2. **Permanent fix (entity annotations):**
```java
@Column(columnDefinition = "VARCHAR(255)")  // Forces varchar column type
private String name;
```

3. **Database fix (ALTER TABLE SQL):**
```sql
ALTER TABLE customers ALTER COLUMN name TYPE VARCHAR(255);
ALTER TABLE customers ALTER COLUMN company TYPE VARCHAR(255);
-- ... for all string columns
```

### 2.11 Lombok in Spring Boot

**Q: What is Lombok and how does it reduce boilerplate?**

**A:** Lombok is a Java library that generates boilerplate code at compile time via annotations.

**Without Lombok:**
```java
public class User {
    private UUID id;
    private String name;
    
    // Getters
    public UUID getId() { return id; }
    public String getName() { return name; }
    
    // Setters
    public void setId(UUID id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    
    // Constructor
    public User(UUID id, String name) { this.id = id; this.name = name; }
    
    // toString, equals, hashCode
    @Override public String toString() { return "User(id=" + id + ", name=" + name + ")"; }
}
```

**With Lombok:**
```java
@Data                    // Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor       // Generates no-arg constructor
@AllArgsConstructor      // Generates all-args constructor
@Builder                // Generates builder pattern
public class User {
    private UUID id;
    private String name;
}
```

**Usage:**
```java
User user = User.builder().id(UUID.randomUUID()).name("John").build();
```

### 2.12 `@Transactional` in Depth

**Q: What does `@Transactional` do and why is it important?**

**A:** `@Transactional` ensures all database operations within a method either all succeed or all fail (atomicity).

**In AuthService.register():**
```java
@Transactional
public AuthResponse register(RegisterRequest request) {
    // 1. Check if email exists (1 DB query)
    if (userRepository.existsByEmail(request.getEmail())) {
        throw new IllegalArgumentException("Email already registered");
    }
    
    // 2. Save user (1 DB insert)
    user = userRepository.save(user);
    
    // 3. Generate tokens + save refresh token hash (1 DB update)
    return generateAuthResponse(user);
    // If step 3 fails, step 2 rolls back — no orphan users!
}
```

**Without `@Transactional`:** If step 3 fails after step 2 succeeds, you'd have a user in the database with no refresh token hash — a data inconsistency.

### 2.13 Constructor Injection vs Field Injection

**Q: Why does AtlasAI prefer constructor injection over field injection?**

**A:**

**Field injection (not recommended):**
```java
@Service
public class AuthService {
    @Autowired  // Field injection
    private UserRepository userRepository;
}
```
Problems: Hard to test (can't mock via constructor), hard to see dependencies.

**Constructor injection (what AtlasAI uses):**
```java
@Service
@RequiredArgsConstructor  // Lombok generates constructor with all final fields
public class AuthService {
    private final UserRepository userRepository;  // final = must be set
    private final JwtService jwtService;
    
    // Lombok generates: public AuthService(UserRepository r, JwtService j) { ... }
}
```
Benefits: Immutable dependencies (`final`), clear required dependencies, easy to unit test.

### 2.14 HikariCP Connection Pooling

**Q: How does database connection pooling work?**

**A:** HikariCP is Spring Boot's default connection pool. Instead of creating a new database connection for every request (expensive), it maintains a pool of open connections that are reused.

```
Request A → borrow connection from pool → execute query → return to pool
Request B → borrow connection from pool → execute query → return to pool
        ↕
    HikariCP Pool (default: 10 connections kept open)
        ↕
    PostgreSQL Server
```

**Why it matters:** Creating a TCP connection to PostgreSQL takes ~10-20ms. Connection pooling avoids this overhead for every request.

---

# Part 3: React & TypeScript Frontend

---

## 🟢 Level 1 — Beginner

### 3.1 What is React?

**Q: What is React and what are its core concepts?**

**A:** React is a JavaScript library for building user interfaces using **components**. 

**Core concepts demonstrated in AtlasAI:**

1. **Components** — Reusable UI pieces (`<CustomerListPage />`, `<AppLayout />`)
2. **JSX** — HTML-like syntax in JavaScript
3. **Props** — Data passed from parent to child components
4. **State** — Data that changes over time (Zustand stores, component state)
5. **Hooks** — Functions that let you use state and lifecycle in functional components

### 3.2 Components & Props

**Q: What's the difference between props and state?**

**A:**

| | Props | State |
|--|-------|-------|
| **Mutability** | Immutable (read-only) | Mutable (can change) |
| **Who owns it** | Parent component | Component itself |
| **Purpose** | Configure child component | Manage internal data that changes |
| **Example** | `<TaskDetailPage taskId="123" />` | `const [user, setUser] = useState(null)` |

### 3.3 useState & useEffect

**Q: Explain useState and useEffect hooks.**

**A:**

**useState** — Stores component-level state:
```tsx
const [count, setCount] = useState(0);  // Initial value: 0
// Usage:
setCount(count + 1);  // Update state → triggers re-render
```

**useEffect** — Runs side effects after render:
```tsx
useEffect(() => {
    // Runs AFTER component mounts (like componentDidMount)
    fetchData();
    
    return () => {
        // Cleanup function (runs when component unmounts)
        cleanup();
    };
}, []);  // Empty array = run once on mount
```

### 3.4 What is JSX?

**Q: Explain JSX and how it differs from HTML.**

**A:** JSX is a syntax extension that looks like HTML but compiles to JavaScript.

**Differences from HTML:**
| HTML | JSX |
|------|-----|
| `class="btn"` | `className="btn"` |
| `onclick="handle()"` | `onClick={handle}` |
| `for="inputId"` | `htmlFor="inputId"` |
| `<input disabled>` | `<input disabled={true}>` |
| `style="color: red"` | `style={{ color: 'red' }}` |

**Example from AtlasAI:**
```tsx
<Button
  variant="contained"
  onClick={handleLogin}
  disabled={loading}
  sx={{ background: 'linear-gradient(135deg, #E23744, #ff6b6b)' }}
>
  {loading ? 'Signing in...' : 'Sign In'}
</Button>
```

---

## 🟡 Level 2 — Intermediate

### 3.5 React Router v6

**Q: How does routing work in AtlasAI?**

**A:** React Router v6 handles client-side routing (no page reloads when navigating).

```tsx
<BrowserRouter>
  <Routes>
    {/* Public routes — wrapped in PublicLayout (centered login form) */}
    <Route element={<PublicLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Route>
    
    {/* Protected routes — wrapped in ProtectedRoute (checks auth) */}
    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>  {/* Sidebar + Header */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomerListPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
      </Route>
    </Route>
    
    {/* Catch-all */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</BrowserRouter>
```

**Layout nesting:**
```tsx
// AppLayout.tsx — provides sidebar + header to ALL child routes
<AppLayout>
  <Outlet />  {/* Child route component renders here */}
</AppLayout>
```

### 3.6 State Management with Zustand

**Q: How does AtlasAI manage global state?**

**A:** Using **Zustand** — a lightweight state management library.

**authStore.ts:**
```typescript
interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('atlasai_token'),
  user: JSON.parse(localStorage.getItem('atlasai_user') || 'null'),
  isAuthenticated: !!localStorage.getItem('atlasai_token'),
  
  login: (accessToken, refreshToken, user) => {
    // Persist to localStorage (survives page reload)
    localStorage.setItem('atlasai_token', accessToken);
    localStorage.setItem('atlasai_user', JSON.stringify(user));
    set({ token: accessToken, user, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('atlasai_token');
    localStorage.removeItem('atlasai_user');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
```

**Usage in any component:**
```tsx
const { user, isAuthenticated, logout } = useAuthStore();
```

**Why Zustand over Redux?** Zustand is simpler — no providers, no reducers, no actions. Just a store with `set()`.

### 3.7 TanStack Query (React Query)

**Q: What is TanStack Query and why use it over useEffect for data fetching?**

**A:** TanStack Query manages server state (caching, refetching, loading/error states).

**Without TanStack Query (manual):**
```tsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetchData().then(setData).catch(setError).finally(() => setLoading(false));
}, []);  // Need manual cleanup, no caching, no refetch
```

**With TanStack Query:**
```tsx
function useCustomers(filters?: CustomerFilters) {
  return useQuery({
    queryKey: ['customers', filters],  // Cache key
    queryFn: () => customerService.getAll(filters),  // Fetch function
    staleTime: 30_000,  // Data considered fresh for 30 seconds
  });
}

// In component:
const { data: customers, isLoading, error } = useCustomers({ industry: 'Tech' });
```

**Key features used in AtlasAI:**
- **`staleTime`** — Avoids refetching if data is recent (30 seconds)
- **`queryKey`** — Caches results by key, auto-refetches when key changes
- **`useMutation` + `invalidateQueries`** — After creating a customer, invalidate customer list cache → auto-refetch
- **Loading/Error states** — No manual `useState` for loading/error

### 3.8 Axios Interceptors

**Q: How does AtlasAI handle JWT token refresh automatically?**

**A:** Using Axios interceptors — middleware that runs on every request/response.

```typescript
// Request interceptor — attaches JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('atlasai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handles 401 with auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('atlasai_refresh_token');
      const response = await axios.post('/api/auth/refresh', { refreshToken });
      
      // Store new tokens
      const { accessToken } = response.data;
      localStorage.setItem('atlasai_token', accessToken);
      
      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    }
    
    return Promise.reject(error);
  }
);
```

**Advanced feature — Request queuing:** If multiple requests fail simultaneously while refreshing, they're queued and retried after the refresh completes:
```typescript
let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
}
```

### 3.9 MUI (Material UI) Theming

**Q: How does AtlasAI customize its UI appearance?**

**A:** MUI's `ThemeProvider` with a custom theme:

```typescript
export const theme = createTheme({
  palette: {
    primary: { main: '#E23744' },  // Zomato red
    success: { main: '#1BA672' },
    warning: { main: '#F7A83E' },
  },
  typography: {
    fontFamily: '"Poppins", "Inter", sans-serif',
    h4: { fontWeight: 700 },
    button: { textTransform: 'none' },  // No uppercase on buttons
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': { transform: 'translateY(-1px)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
      },
    },
  },
});
```

### 3.10 ProtectedRoute Component

**Q: How does AtlasAI protect routes from unauthorized users?**

**A:** Using a `ProtectedRoute` wrapper component:

```tsx
function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;  // Render child routes
}
```

**Usage in routing:**
```tsx
<Route element={<ProtectedRoute />}>
  <Route element={<AppLayout />}>
    <Route path="/dashboard" element={<DashboardPage />} />
    {/* ... all authenticated routes */}
  </Route>
</Route>
```

---

## 🔴 Level 3 — Advanced

### 3.11 TypeScript vs JavaScript

**Q: Why does AtlasAI use TypeScript instead of plain JavaScript?**

**A:** TypeScript adds static types to JavaScript, catching errors at compile time instead of runtime.

**Without TypeScript (JavaScript):**
```javascript
function getCustomer(id) {
  return api.get(`/customers/${id}`);
}
// No error — but what if id is undefined? Bug only surfaces at runtime.
```

**With TypeScript:**
```typescript
interface Customer {
  id: string;
  name: string;
  company: string;
  status: 'active' | 'inactive' | 'lead';
}

function getCustomer(id: string): Promise<Customer> {
  return api.get(`/customers/${id}`);
  // TypeScript catches: passing number, missing return, accessing wrong property
}
```

**Key TypeScript features in AtlasAI:**
- **Interfaces** — Define shapes of objects (`Customer`, `Task`, `User`)
- **Union types** — `'PENDING' | 'IN_PROGRESS' | 'COMPLETED'`
- **Optional fields** — `avatar?: string`
- **Generics** — `useQuery<Customer[]>({...})`
- **Strict mode** — `noUnusedLocals: true` catches dead code

### 3.12 Custom Hooks

**Q: What are custom hooks and how does AtlasAI use them?**

**A:** Custom hooks let you extract reusable logic from components.

**Example — useCustomers hook:**
```typescript
function useCustomers(filters?: CustomerFilters) {
  return useQuery({
    queryKey: ['customers', filters],
    queryFn: () => customerService.getAll(filters),
    staleTime: 30_000,
  });
}
```

**Using the hook:**
```tsx
function CustomerListPage() {
  const { data: customers, isLoading, error } = useCustomers({ industry: 'Tech' });
  
  if (isLoading) return <Skeleton />;
  if (error) return <ErrorState message={error.message} />;
  
  return customers?.map(customer => <CustomerCard customer={customer} />);
}
```

**Benefits:**
- **Reusability** — Same hook used in CustomerListPage + DashboardPage
- **Separation of concerns** — Data fetching logic in hooks, presentation in components
- **Testability** — Hooks can be tested independently

### 3.13 Vite Build Tool

**Q: What is Vite and why was it chosen over Create React App?**

**A:** Vite is a modern build tool that's significantly faster than webpack/CRA:

| Feature | CRA (webpack) | Vite |
|---------|---------------|------|
| Dev server start | 20-30 seconds | < 1 second (ES modules) |
| Hot reload | 2-5 seconds | Instant |
| Build time | 30-60 seconds | 10-15 seconds |
| Config | Hidden (eject needed) | Explicit (vite.config.ts) |

**Vite config from AtlasAI:**
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',  // Dev proxy to backend
    },
  },
});
```

### 3.14 Debouncing Search Input

**Q: How would you implement a search that doesn't fire on every keystroke?**

**A:** Debouncing — wait for the user to stop typing before making the API call.

```typescript
function CustomerListPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  // Debounce effect — updates debouncedSearch 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);  // Clears previous timer
  }, [search]);
  
  // Only fetch when debouncedSearch changes
  const { data } = useCustomers({ search: debouncedSearch });
  
  return (
    <TextField
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search customers..."
    />
  );
}
```

---

# Part 4: Project-Specific Questions — AtlasAI

---

## 🟢 Beginner Project Questions

### 4.1 Tell me about this project.

**Q: What is AtlasAI and what does it do?**

**A:** AtlasAI is a **microservices-based sales workflow automation platform**. It helps sales teams automate repetitive tasks like sending follow-up emails, scheduling meetings, and managing customer relationships.

**Key features:**
1. **User Authentication** — JWT-based login with role-based access (User, Manager, Admin)
2. **Customer Management** — CRUD operations on customers with search and pagination
3. **Opportunity Tracking** — Sales pipeline with stages (Prospect → Negotiation → Won/Lost)
4. **Workflow Automation** — AI agents execute multi-step workflows automatically
5. **Task Management** — Kanban board with task types (email, meeting, call, follow-up, review)
6. **Analytics Dashboard** — Metrics, charts, and sales reports

**Tech stack:** Java 21 + Spring Boot 3 (backend), React 18 + TypeScript (frontend), PostgreSQL (database), Docker + Railway (deployment).

### 4.2 What challenges did you face?

**Q: What was the most difficult bug you fixed?**

**A:** The **`bytea` column bug** was the most challenging to diagnose and fix.

**The problem:** When we deployed our Customer Service to Railway for the first time, the `GET /api/customers` endpoint would crash with `ERROR: function lower(bytea) does not exist`. This meant we couldn't list or search customers.

**The debugging process:**
1. At first, we thought it was a code bug — maybe our JPQL query was wrong
2. We checked the SQL logs and saw the tables were created with `bytea` column type instead of `varchar`
3. This is a Hibernate/PostgreSQL compatibility issue — Hibernate sometimes creates columns as `bytea` instead of `varchar` depending on the JDBC URL format
4. We applied a **three-layer fix**: immediate fallback in service code, permanent prevention in entity annotations, and SQL ALTER TABLE for existing data

**What I learned:** Always explicitly specify `columnDefinition = "VARCHAR(255)"` on String fields when deploying to cloud PostgreSQL, and always handle database schema issues defensively.

### 4.3 Why microservices?

**Q: Why did you choose a microservices architecture for this project?**

**A:** The decision was driven by three factors:

1. **Technology diversity** — We wanted the AI Agent Service in Python (it uses OpenAI SDK), but the rest in Java. Microservices make this possible.
2. **Independent scaling** — The Auth Service handles every request, while AI Agents are only used when running workflows. They should scale independently.
3. **Fault isolation** — If the AI Agent Service crashes (e.g., OpenAI API timeout), users can still access customers, tasks, and other features.

**Trade-off:** We accepted higher deployment complexity for better separation of concerns and independent scalability.

### 4.4 How does authentication work?

**Q: Walk me through the JWT authentication flow.**

**A:** 

**Registration/Login:**
1. User sends email + password to `POST /api/auth/login`
2. Spring Security `AuthenticationManager` validates credentials against BCrypt hash in database
3. On success, `JwtService` generates two tokens:
   - **Access Token** (1 hour) — Contains userId, email, role; used for API authorization
   - **Refresh Token** (7 days) — Contains token type "refresh"; stored as SHA-256 hash
4. Tokens returned to frontend, stored in Zustand + localStorage

**Authenticated Requests:**
1. Axios interceptor attaches `Authorization: Bearer <access_token>` to every request
2. Backend `JwtAuthenticationFilter` extracts and validates the JWT
3. If valid → `SecurityContextHolder` gets authentication → request proceeds
4. If invalid/expired → returns 401

**Token Refresh:**
1. On 401, Axios response interceptor catches it
2. Sends refresh token to `POST /api/auth/refresh`
3. Auth service verifies: not expired, is refresh token type, hash matches stored hash
4. Returns new token pair → original request retried

**Logout:**
1. Frontend clears localStorage
2. Backend clears stored refresh token hash → token can no longer be used for refresh

### 4.5 How do the frontend and backend communicate?

**Q: How does the React frontend talk to the backend services?**

**A:** Through **Nginx reverse proxy**:

```
Browser → Nginx (port 80) → Backend Service

/api/auth/*          → Auth Service (port 8081)
/api/customers/*     → Customer Service (port 8082)
/api/opportunities/* → Customer Service (port 8082)
/api/workflows/*     → Workflow Service (port 8083)
/api/tasks/*         → Task Service (port 8084)
```

The frontend only knows about `/api/...` — it doesn't know or care which backend handles each request. Nginx routes based on the URL path. This means:
- The frontend has a single base URL
- Backend services can be moved/scaled independently
- CORS isn't an issue (same origin)

### 4.6 What's the demo mode?

**Q: Explain the demo/real mode toggle.**

**A:** The demo mode lets the app work fully offline without any backend services running. It was built because:

1. We wanted to demo the frontend without running all backend services
2. For development, so frontend developers can work without the backend stack

**How it works:**
1. `uiStore` has a `demoMode` boolean (persisted to localStorage, default `true`)
2. The Axios request interceptor checks `demoMode` before attaching JWT
3. If enabled, it routes to `demoApiHandlers.ts` instead of making real HTTP calls
4. Handlers return realistic mock data (24 customers, 18 opportunities, 8 workflows, 16 tasks)
5. A "Quick Demo Access" button on the login page logs in as the demo user (Arjun Mehta, Admin)
6. A badge in the header shows "Demo" or "Live" — clickable to toggle instantly

---

## 🟡 Intermediate Project Questions

### 4.7 How is error handling implemented?

**Q: How does AtlasAI handle errors consistently across all services?**

**A:** Three layers of error handling:

**1. Backend — GlobalExceptionHandler (@ControllerAdvice):**
Each microservice has a `GlobalExceptionHandler` with handlers for common exceptions:
- `IllegalArgumentException` → 400 Bad Request
- `BadCredentialsException` → 401 Unauthorized
- `AccessDeniedException` → 403 Forbidden
- `DataIntegrityViolationException` → 409 Conflict
- All errors returned as `{ "error": "message" }` JSON

**2. Frontend — TanStack Query error states:**
Every data-fetching hook returns an `error` object:
```tsx
if (error) return <Alert severity="error">Failed to load customers</Alert>;
```

**3. Frontend — Axios interceptor (401 handling):**
On 401, automatically attempts token refresh. If refresh fails, logs out.

**4. HTTP Status codes for each error type:**
| Situation | Status | Example |
|-----------|--------|---------|
| Invalid input | 400 | Missing required field |
| Wrong credentials | 401 | Bad email/password |
| Insufficient role | 403 | User trying admin endpoint |
| Not found | 404 | Customer ID doesn't exist |
| Duplicate | 409 | Email already registered |

### 4.8 How would you add a new microservice?

**Q: Walk me through adding a new service to AtlasAI.**

**A:** Following the established pattern from auth/customer/workflow services:

**Step 1 — Create the service structure:**
```
services/new-service/
├── Dockerfile           # Multi-stage Maven build
├── pom.xml              # Dependencies (spring-boot-starter-web, data-jpa, security)
└── src/main/java/.../
    ├── NewServiceApplication.java
    ├── config/
    │   ├── DataSourceConfig.java    # Parse DATABASE_URL
    │   ├── SecurityConfig.java      # JWT auth filter
    │   ├── JwtAuthFilter.java       # Token validation
    │   └── GlobalExceptionHandler.java
    ├── controller/
    ├── service/
    ├── repository/
    └── model/
        ├── entity/
        ├── enums/
        ├── request/
        └── response/
```

**Step 2 — Follow established patterns:**
- All String fields: `@Column(columnDefinition = "VARCHAR(255)")`
- UUID primary keys: `@GeneratedValue(strategy = GenerationType.UUID)`
- `server.port` in `application.yml` (unique port per service)
- Remove Redis/Kafka deps (not available on Railway)

**Step 3 — Update Nginx config:**
```nginx
location /api/new-service {
    proxy_pass https://new-service.onrender.com;
    proxy_set_header Host new-service.onrender.com;
}
```

**Step 4 — Deploy:**
- Push to GitHub → Railway auto-deploys
- Add `DATABASE_URL` + `JWT_SECRET` env vars
- Generate domain with correct target port

### 4.9 What security measures are in place?

**Q: What security measures does AtlasAI implement?**

**A:**

1. **JWT Authentication** — Stateless, signed with HMAC-SHA256
2. **BCrypt Password Hashing** — Passwords never stored in plaintext
3. **Role-Based Access Control (RBAC)** — USER, MANAGER, ADMIN roles
4. **Refresh Token Revocation** — Stored as SHA-256 hash, cleared on logout
5. **Input Validation** — `@Valid` + Bean Validation (`@NotBlank`, `@Email`, `@Size`)
6. **Global Error Handling** — No stack traces exposed to clients
7. **Nginx Security Headers** — X-Frame-Options, X-Content-Type-Options, XSS-Protection
8. **No CORS issues** — Same-origin (Nginx proxies all requests)
9. **Stateless sessions** — No HttpSession (no session fixation attacks)

### 4.10 How does the CI/CD pipeline work?

**Q: Explain the GitHub Actions CI/CD pipeline.**

**A:** On every push to `main`, GitHub Actions runs 7 parallel build jobs:

```yaml
jobs:
  build-auth-service:       # Java 21 + Maven (./mvnw clean verify)
  build-customer-service:   # Java 21 + Maven
  build-workflow-service:   # Java 21 + Maven
  build-task-service:       # Java 21 + Maven
  build-notification-service:
  build-search-service:
  build-frontend:           # Node 18 + npm ci + npm run build
```

**Key features:**
- **Parallel execution** — All 7 services build simultaneously (~2-3 min total)
- **Dependency caching** — Maven cache + npm cache for faster subsequent builds
- **Maven Wrapper** — No need to install Maven locally (`./mvnw`)
- **Auto-deploy** — Railway detects the push and auto-deploys successful builds

---

## 🔴 Advanced Project Questions

### 4.11 How would you handle 1000+ concurrent users?

**Q: Your app is getting popular. How do you handle scaling?**

**A:** A multi-phase approach:

**Phase 1 — Immediate (Zero cost):**
- JWT is stateless — any instance can handle any request (no sticky sessions)
- Nginx as load balancer (can handle 10k+ concurrent connections)
- HikariCP connection pool tuning (increase `maximum-pool-size`)
- Database query optimization (add missing indexes)

**Phase 2 — Horizontal scaling (Low cost):**
- Deploy more instances of each service behind Nginx
- Least-request is almost free (just pay for additional instances)
- Add read replicas for PostgreSQL

**Phase 3 — Caching (Medium cost):**
- Add Redis cache for frequently accessed data (customer lists, user profiles)
- Implement response caching in Nginx for public endpoints (`/count`, `/templates`)
- Client-side TanStack Query cache (30s staleTime reduces backend load)

**Phase 4 — Database optimization:**
- Add connection pooling at the database level (PgBouncer)
- Partition large tables (opportunities by quarter)
- Archive old data to separate tables

### 4.12 How would you implement real-time updates?

**Q: How would you show live workflow status updates?**

**A:** Three approaches, each with trade-offs:

**Option 1 — Polling (Simplest, used for MVP):**
```typescript
// useQuery with refetchInterval
function useWorkflow(id: string) {
  return useQuery({
    queryKey: ['workflow', id],
    queryFn: () => workflowService.getById(id),
    refetchInterval: 5000,  // Poll every 5 seconds
  });
}
```
- ✅ Simple to implement
- ❌ Inefficient (redundant requests when nothing changed)

**Option 2 — WebSockets (Best for real-time):**
```
Client connects via WebSocket to /ws/workflow/{id}
Backend pushes updates when workflow status changes
```
- ✅ Truly real-time
- ❌ More complex — need WebSocket support in Nginx + backend

**Option 3 — Server-Sent Events (SSE):**
```
Client subscribes to /api/workflows/{id}/events
Backend streams events as they happen
```
- ✅ Simpler than WebSockets (one-way communication)
- ✅ Good for push notifications

### 4.13 Database Migration Strategy

**Q: How do you handle database schema changes in production?**

**A:** Currently, Hibernate's `ddl-auto: update` auto-creates/updates tables. This is fine for development but dangerous for production.

**Better approach — Flyway migrations:**

```java
// V1__create_users_table.sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

// V2__add_refresh_token_hash.sql
ALTER TABLE users ADD COLUMN refresh_token_hash VARCHAR(64);

// V3__fix_bytea_columns.sql
ALTER TABLE customers ALTER COLUMN name TYPE VARCHAR(255);
```

**Benefits of Flyway:**
- Version-controlled migrations (never run twice)
- Explicit schema changes (no surprises from Hibernate)
- Rollback support
- `ddl-auto: validate` — validates schema matches entities at startup

### 4.14 How would you add monitoring?

**Q: How would you monitor AtlasAI in production?**

**A:**

**Phase 1 — Basic (Free):**
- Spring Boot Actuator health endpoints (`/actuator/health`)
- Railway deployment logs
- Browser console for client-side errors

**Phase 2 — Structured logging:**
```yaml
logging:
  pattern:
    console: "{\"timestamp\":\"%d{ISO8601}\",\"level\":\"%p\",\"service\":\"auth-service\",\"message\":\"%m\"}%n"
```
Each log line becomes a JSON object → queryable with log aggregation tools.

**Phase 3 — Full observability stack:**
- **Prometheus + Grafana** — Metrics (request rate, latency, error rate)
- **Jaeger** — Distributed tracing (track a request across auth → customer → workflow)
- **Sentry** — Error tracking with stack traces

### 4.15 Explain the Nginx proxy configuration.

**Q: Walk me through the Nginx configuration for routing.**

**A:** The Nginx config serves two purposes:
1. **Static file server** — Serves the built React SPA
2. **API gateway** — Routes API calls to the correct backend

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    
    # API routing — each backend gets its own location block
    location /api/auth {
        proxy_pass https://auth-service:8081;
        proxy_set_header Host auth-service:8081;
    }
    
    location /api/customers {
        proxy_pass https://customer-service:8082;
        proxy_set_header Host customer-service:8082;
    }
    
    # SPA routing — all non-file routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Long-lived asset caching
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

**Key Nginx features used:**
- **`proxy_pass`** — Forward request to backend
- **`proxy_set_header Host`** — Must match backend's domain (how Railway routes)
- **`expires 1y`** — Cache static assets for 1 year
- **`try_files $uri $uri/ /index.html`** — SPA fallback routing
- **Gzip** — Compress JSON, JS, CSS responses

---

# Part 5: DevOps, Deployment & Infrastructure

---

## Common DevOps Questions

### 5.1 Docker Multi-Stage Builds

**Q: Explain the multi-stage Dockerfile pattern.**

**A:** Multi-stage builds create smaller production images by separating the build environment from the runtime environment.

**AtlasAI's Java Dockerfile:**
```dockerfile
# Stage 1 — Build (includes full JDK + Maven)
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline -q  # Cache dependencies
COPY src/ src/
RUN mvn package -DskipTests -q    # Build JAR

# Stage 2 — Run (only JRE, much smaller)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Why it matters:** 
- Stage 1 image: ~800MB (JDK + Maven + dependencies)
- Stage 2 image: ~150MB (only JRE + app JAR)
- Smaller image = faster deploy, less storage, smaller attack surface

### 5.2 Railway vs Traditional Hosting

**Q: What are the pros and cons of using Railway vs a VPS?**

**A:**

| Feature | Railway | VPS (Oracle Cloud, Hetzner) |
|---------|---------|----------------------------|
| **Setup** | Push-to-deploy, auto HTTPS | Manual Docker/SSL setup |
| **Cost** | $5-20/mo for all services | $0-7/mo (Oracle Free Tier) |
| **Cold starts** | Free tier spins down after 15min | Always on, no cold starts |
| **Data persistence** | Limited (free PG expires 30 days) | Full control, persistent storage |
| **Scaling** | Built-in | Manual |
| **Control** | Limited (no SSH access) | Full root access |

### 5.3 Docker Compose vs Production Deployments

**Q: What's the difference between `docker-compose.yml` and `docker-compose.prod.yml`?**

**A:**

| Aspect | Local Dev (docker-compose.yml) | Production (docker-compose.prod.yml) |
|--------|-------------------------------|--------------------------------------|
| **Purpose** | Local development | Production deployment |
| **PostgreSQL** | Exposed on port 5432 | Internal network only |
| **Volume** | Named volume for persistence | Named volume + backup config |
| **Memory limits** | None (use full machine) | `deploy.resources.limits.memory: 256M` |
| **Health checks** | Optional | Required for each service |
| **Java heap** | Full heap available | `-Xmx128m` to limit memory |
| **Restart policy** | Not set | `restart: unless-stopped` |

### 5.4 Environment Variables Management

**Q: How do you manage environment variables across environments?**

**A:**

**Local development:** `.env` file (gitignored) with local values
```
DB_USER=atlasai
DB_PASSWORD=atlasai_secret
JWT_SECRET=dev-secret-key-change-in-production
```

**Railway:** Dashboard → Variables per service
- `DATABASE_URL` = `${{ Postgres.DATABASE_URL }}` (Railway template variable)
- `JWT_SECRET` = actual secret (must match across all services)

**Oracle Cloud VPS:** `.env` file on the server
```
JWT_SECRET=<generated-by-setup-script>
DB_PASSWORD=<auto-generated>
```

### 5.5 Nginx Trailing Slash Bug

**Q: Explain the trailing slash bug you encountered.**

**A:** In Nginx, `location /api/customers/` (with trailing slash) does NOT match `GET /api/customers` (without trailing slash).

The frontend makes calls like:
- `api.get('/customers')` → `/api/customers` ❌ won't match `/api/customers/`
- `api.get('/customers/123')` → `/api/customers/123` ✅ matches both

**Fix:** Always use location blocks without trailing slashes:
```nginx
# ❌ Wrong — doesn't match /api/customers
location /api/customers/ { ... }

# ✅ Correct — matches /api/customers AND /api/customers/123
location /api/customers { ... }
```

---

# Part 6: System Design & Architecture

---

## 🔴 System Design Questions

### 6.1 Design a URL Shortener (like TinyURL)

**Q: Design a URL shortener. How would you generate short URLs?**

**A:**

**Requirements:**
- Shorten a long URL to a 7-character string
- Redirect to original URL on access
- Handle 10M URLs, 100M reads/day

**Approach:**

**1. Encoding (Base62):**
```java
public class UrlShortener {
    private static final String BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    public String encode(long id) {
        StringBuilder sb = new StringBuilder();
        while (id > 0) {
            sb.append(BASE62.charAt((int)(id % 62)));
            id /= 62;
        }
        // Pad to 7 chars
        while (sb.length() < 7) sb.append('0');
        return sb.reverse().toString();
    }
    
    // 62^7 = 3.5 trillion unique URLs
}
```

**2. Database:**
```sql
CREATE TABLE urls (
    id BIGSERIAL PRIMARY KEY,       -- Auto-increment → encoded to short URL
    original_url TEXT NOT NULL,
    short_code VARCHAR(7) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    click_count INT DEFAULT 0
);
```

**3. API:**
```
POST /api/shorten   { "url": "https://very-long-url.com/..." }
  → 201 { "shortUrl": "https://short.url/abc1234" }

GET /{shortCode}    → 302 Redirect to original URL
```

**4. Scaling:**
- Read-heavy (90% reads, 10% writes)
- Cache popular URLs in Redis (LRU eviction)
- Database read replicas for redirect queries

### 6.2 Design a Chat System

**Q: Design a real-time chat application.**

**A:**

**Architecture:**
```
Client → WebSocket Gateway → Message Service → Database
                            ↕
                         Kafka Queue
                            ↕
                     Notification Service → Push notification
```

**Key components:**
1. **WebSocket** — Persistent connection for real-time messaging
2. **Message Queue (Kafka)** — Decouples message sending from notification
3. **Database** — PostgreSQL for message history
4. **Cache** — Redis for online status, last seen

**Database schema:**
```sql
CREATE TABLE conversations (
    id UUID PRIMARY KEY,
    type VARCHAR(10),  -- direct | group
    created_at TIMESTAMP
);

CREATE TABLE messages (
    id UUID PRIMARY KEY,
    conversation_id UUID REFERENCES conversations,
    sender_id UUID REFERENCES users,
    content TEXT,
    sent_at TIMESTAMP
);

CREATE TABLE conversation_participants (
    conversation_id UUID,
    user_id UUID,
    last_read_at TIMESTAMP,
    PRIMARY KEY (conversation_id, user_id)
);
```

### 6.3 How would you handle the Database DATABASE_URL format mismatch?

**Q: Explain how you solved the Railway DATABASE_URL issue.**

**A:** Railway provides PostgreSQL connection info as a `DATABASE_URL` environment variable in this format:
```
postgresql://user:password@host:5432/dbname
```

But Spring Boot's JDBC driver expects:
```
jdbc:postgresql://host:5432/dbname
```

**Solution — DataSourceConfig.java:** Parse the URI and build the JDBC URL manually:

```java
URI uri = new URI(databaseUrl);
String[] userInfo = uri.getUserInfo().split(":");
String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + uri.getPort() + uri.getPath();
```

**Fallback:** If `DATABASE_URL` isn't set (local development), use application.yml defaults.

---

# Part 7: Data Structures, Algorithms & Coding

---

## 🔴 Coding Questions

### 7.1 Two Sum

**Problem:** Given an array of integers and a target, return indices of two numbers that add up to target.

**Solution (HashMap approach, O(n)):**
```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}
```

### 7.2 Reverse a Linked List

**Problem:** Reverse a singly linked list.

**Solution (Iterative, O(n)):**
```java
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    while (current != null) {
        ListNode next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}
```

### 7.3 Valid Parentheses

**Problem:** Given a string with '(', ')', '{', '}', '[', ']', determine if brackets are valid (properly closed and ordered).

**Solution (Stack, O(n)):**
```java
public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> map = Map.of(')', '(', '}', '{', ']', '[');
    
    for (char c : s.toCharArray()) {
        if (map.containsKey(c)) {
            // Closing bracket — check top of stack
            char top = stack.isEmpty() ? '#' : stack.pop();
            if (top != map.get(c)) return false;
        } else {
            // Opening bracket — push to stack
            stack.push(c);
        }
    }
    return stack.isEmpty();
}
```

### 7.4 Custom Functional Interface

**Problem:** Write a `@FunctionalInterface` and use it with a lambda.

```java
@FunctionalInterface
interface Transformer<T, R> {
    R transform(T input);
}

// Usage
Transformer<String, Integer> lengthTransformer = str -> str.length();
System.out.println(lengthTransformer.transform("Hello"));  // 5
```

### 7.5 Stream API — Filter and Map

**Problem:** Given a list of customers, get names of active customers in sorted order.

```java
List<String> activeCustomerNames = customers.stream()
    .filter(c -> c.getStatus() == CustomerStatus.ACTIVE)
    .map(Customer::getName)
    .sorted()
    .collect(Collectors.toList());
```

---

# Part 8: Behavioral Questions & Mock Scenarios

---

## 💬 Behavioral Questions

### 8.1 Tell me about yourself.

**Sample Answer (tailored for intern role):**
> "I'm a full stack developer with experience building a microservices-based sales automation platform called AtlasAI. I used Java 21 with Spring Boot for the backend and React with TypeScript for the frontend. I deployed everything on Railway with Docker and set up a CI/CD pipeline with GitHub Actions.
> 
> What I'm most proud of is debugging a tricky PostgreSQL issue where binary columns were being created instead of text columns — I had to trace it from the database error back through Hibernate's auto-DDL to find the root cause and implement a three-layer fix.
> 
> I'm looking for an internship where I can work on production systems, collaborate with experienced engineers, and deepen my full stack skills. I'm particularly interested in backend development and distributed systems."

### 8.2 Tell me about a time you fixed a difficult bug.

**STAR Method:**

- **Situation:** After deploying our Customer Service to Railway, the list endpoint returned a 500 error with `function lower(bytea) does not exist`.
- **Task:** I needed to fix the search functionality so users could browse customers.
- **Action:** I first added a fallback to `findAll(Pageable)` when no search filters are provided — this immediately restored the list endpoint. Then I traced the root cause: Hibernate was creating String columns as `bytea` (binary) instead of `varchar`. I added `@Column(columnDefinition = "VARCHAR(255)")` to all String fields to prevent this in the future.
- **Result:** The list endpoint was restored immediately, and the `columnDefinition` fix prevents the issue for any new tables. I also documented the fix in our debugging docs so future developers don't hit the same issue.

### 8.3 How do you approach learning a new technology?

**Sample Answer:**
> "I follow a three-step approach:
> 1. **Build with it** — I don't just read docs. I create a small working project first (like a todo app or API endpoint) to understand the basics.
> 2. **Read the docs** — After I've felt the pain points, I read the official documentation to understand best practices and why things work the way they do.
> 3. **Teach it** — I explain what I learned to someone else or document it. This reveals gaps in my understanding.
> 
> For example, when learning React Query (TanStack Query), I first replaced a simple `useEffect` fetch in a component, then read the docs about caching strategies, and finally documented the hook patterns we used across our project."

### 8.4 Tell me about a time you worked on a team project.

> "Building AtlasAI taught me a lot about collaboration. I worked on both the frontend and backend, which meant I was constantly context-switching between React components and Spring Boot services. I learned to write clean API contracts (request/response DTOs) before implementing either side, so frontend and backend could be developed independently.
> 
> I also documented our debugging experiences extensively — every time I fixed a bug, I added it to our `Debugging.md` with root cause and resolution. This helped me when similar issues came up in other services."

### 8.5 Where do you see yourself in 5 years?

> "In 5 years, I see myself as a senior full stack engineer who can architect and build complex distributed systems. I want to deepen my backend skills — particularly in system design, database optimization, and cloud infrastructure. I also want to mentor junior developers, the way experienced engineers mentored me during this internship."

---

## 🎭 Mock Interview Scenarios

### Scenario 1: Code Review

**The interviewer shows you this code. What feedback would you give?**

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User createUser(String name, String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        return userRepository.save(user);
    }
}
```

**Your answer:**
> "I have a few suggestions:
> 
> 1. **Constructor injection over field injection** — `@Autowired` on fields makes testing harder. Use `@RequiredArgsConstructor` with `private final` fields instead.
> 2. **DTO pattern** — Return a `UserResponse` DTO instead of the `User` entity directly. This avoids exposing the password field.
> 3. **Input validation** — Add `@Valid` annotations on request DTOs. The current code doesn't validate email format or missing fields.
> 4. **Duplicate email check** — `createUser` should check if email already exists and return 409 Conflict instead of crashing.
> 5. **Password encoding** — If this is a user registration endpoint, passwords should be BCrypt-encoded before saving."

### Scenario 2: Design a New Feature

**"We need to add role-based permissions to AtlasAI. Currently there are 3 roles: USER, MANAGER, ADMIN. We need granular permissions like 'can delete customers', 'can view reports', etc. How would you design this?"**

**Your answer:**
> "I'd design a **permission-based RBAC system**:

> **1. Backend — Permissions as constants:**
> ```java
> // Instead of hardcoding permission checks per role
> public enum Permission {
>     CUSTOMER_READ, CUSTOMER_CREATE, CUSTOMER_UPDATE, CUSTOMER_DELETE,
>     USER_READ, USER_CREATE, USER_DELETE,
>     REPORT_READ, REPORT_EXPORT,
>     WORKFLOW_CREATE, WORKFLOW_CANCEL
> }
> 
> // Role now contains a SET of permissions
> public class Role {
>     private String name;  // USER, MANAGER, ADMIN
>     private Set<Permission> permissions;
> }
> ```

> **2. Database:**
> ```sql
> CREATE TABLE roles (
>     id UUID PRIMARY KEY,
>     name VARCHAR(20) UNIQUE NOT NULL
> );
> CREATE TABLE role_permissions (
>     role_id UUID REFERENCES roles(id),
>     permission VARCHAR(50) NOT NULL,
>     PRIMARY KEY (role_id, permission)
> );
> CREATE TABLE user_roles (
>     user_id UUID REFERENCES users(id),
>     role_id UUID REFERENCES roles(id),
>     PRIMARY KEY (user_id, role_id)
> );
> ```

> **3. Custom annotation for permission checking:**
> ```java
> @Target(METHOD)
> @Retention(RUNTIME)
> public @interface RequiresPermission {
>     Permission value();
> }
> 
> // AOP aspect checks permission before method execution
> @Aspect
> public class PermissionAspect {
>     @Around("@annotation(requiresPermission)")
>     public Object checkPermission(ProceedingJoinPoint pjp, RequiresPermission requiresPermission) {
>         User currentUser = getCurrentUser();
>         if (!currentUser.hasPermission(requiresPermission.value())) {
>             throw new AccessDeniedException("Missing permission: " + requiresPermission.value());
>         }
>         return pjp.proceed();
>     }
> }
> ```

> **4. Usage in controllers:**
> ```java
> @RequiresPermission(Permission.CUSTOMER_DELETE)
> @DeleteMapping("/{id}")
> public ResponseEntity<Void> deleteCustomer(@PathVariable UUID id) { ... }
> ```

> **Benefits over hardcoded role checks:**
> - More flexible — can give MANAGER report access without customer delete
> - Maintainable — permissions are tracked in the database, not scattered in code
> - Auditable — can see exactly who has which permission"

### Scenario 3: Debugging a Production Issue

**"Users are reporting that the dashboard is loading slowly. What do you check?"**

> **Step 1 — Identify the bottleneck:**
> - Check browser DevTools Network tab — which API calls are slow?
> - Check backend logs — any slow queries or errors?
> - Check Railway dashboard — CPU/memory usage spiking?
> 
> **Step 2 — Check database queries:**
> - Enable Hibernate SQL logging: `spring.jpa.show-sql: true`
> - Look for N+1 queries (loading customers, then loading opportunities for each)
> - Check if missing indexes cause full table scans
> 
> **Step 3 — Apply fixes based on findings:**
> - **Missing index:** `CREATE INDEX idx_customers_status ON customers(status)`
> - **N+1 query:** Add `@EntityGraph` or `JOIN FETCH` to load related entities in one query
> - **Too much data:** Reduce default page size from 50 to 20
> - **Uncached data:** Increase TanStack Query `staleTime` for dashboard data

---

# Part 9: Cheat Sheets & Quick References

---

## 🚀 Quick Cheat Sheets

### Git Commands

```bash
git status                    # See what's changed
git add -A                    # Stage all changes
git commit -m "message"       # Commit staged changes
git push origin main          # Push to GitHub
git pull origin main          # Pull latest
git log --oneline             # View commit history
git diff                      # See unstaged changes
git checkout -b feature-branch  # Create and switch to new branch
```

### Docker Commands

```bash
docker compose up -d          # Start containers in background
docker compose down           # Stop containers
docker compose logs -f        # Follow logs
docker ps                     # List running containers
docker images                 # List images
docker build -t name:tag .    # Build image
docker exec -it container sh  # SSH into container
```

### Java/Spring Boot Commands

```bash
./mvnw spring-boot:run        # Run service
./mvnw package -DskipTests    # Build JAR
./mvnw clean verify           # Build + test
java -jar target/app.jar      # Run JAR
curl /actuator/health         # Health check
```

### React/TypeScript Commands

```bash
npm run dev                   # Start dev server
npm run build                 # Build for production
npx tsc --noEmit              # Typecheck without emitting files
npx vite build                # Production build with Vite
```

### PostgreSQL Commands

```bash
# Connect to database
psql -h host -U user -d dbname

# Common queries
\dt                    # List tables
\d+ table_name         # Describe table
\l                     # List databases
SELECT * FROM users;   # Query data
EXPLAIN ANALYZE SELECT ...; # Analyze query performance
```

---

## 🎯 Key Definitions to Memorize

| Term | Simple Definition |
|------|------------------|
| **JWT** | JSON Web Token — digitally signed token for stateless authentication |
| **CORS** | Cross-Origin Resource Sharing — browser security mechanism |
| **ORM** | Object-Relational Mapping — maps database tables to objects (Hibernate) |
| **ACID** | Atomicity, Consistency, Isolation, Durability — database transaction guarantees |
| **REST** | Representational State Transfer — API design principles |
| **DTO** | Data Transfer Object — object that carries data between layers |
| **Dependency Injection** | Framework provides dependencies instead of objects creating them |
| **Microservices** | Architectural style where app is a collection of loosely coupled services |
| **JPA** | Java Persistence API — specification for ORM in Java |
| **MVC** | Model-View-Controller — software design pattern |
| **HMAC** | Hash-based Message Authentication Code — used to sign JWTs |
| **BCrypt** | Password hashing function (slow, salted) |
| **Nginx** | High-performance web server and reverse proxy |
| **HikariCP** | Default connection pool in Spring Boot (extremely fast) |
| **TanStack Query** | Library for managing server state (caching, refetching) |
| **Zustand** | Lightweight state management library for React |
| **Axios** | Promise-based HTTP client for browser/Node.js |
| **Vite** | Fast build tool for frontend projects |

---

## 📊 Behavioral Questions — Quick Framework

Use the **STAR** method for every behavioral answer:

| Letter | Step | Example |
|--------|------|---------|
| **S**ituation | Context | "We deployed to Railway and got a 500 error on our list endpoint" |
| **T**ask | Your goal | "I needed to fix the search functionality" |
| **A**ction | What you did | "I added a fallback, traced root cause, implemented permanent fix" |
| **R**esult | Outcome | "List endpoint restored, bug documented, future occurrences prevented" |

---

## ✅ Interview Day Checklist

- [ ] Have your project's README.md fresh in mind
- [ ] Be ready to share your screen and walk through code
- [ ] Know the tech stack — be able to explain WHY each technology was chosen
- [ ] Have 2-3 bug-fixing stories ready with STAR format
- [ ] Know your deployment architecture (Nginx → backend → database)
- [ ] Understand JWT flow in detail (login → request → refresh)
- [ ] Be honest about what you don't know — "I haven't worked with that, but here's how I'd approach learning it..."
- [ ] Ask questions at the end! (see below)

### Good Questions to Ask the Interviewer

1. "What does a typical day look like for an intern on this team?"
2. "What technologies would I be working with most?"
3. "How does the team handle code reviews?"
4. "Is there a mentorship program for interns?"
5. "What's the most challenging technical problem the team is solving right now?"

---

> **Last updated:** July 2026  
> **Good luck with your interview! 🚀**
