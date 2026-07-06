# 💾 Database Schema

> **Database:** PostgreSQL 16
> **Services:** Auth Service (users), Customer Service (customers, opportunities)
> **ORM:** Hibernate via Spring Data JPA (ddl-auto: update)

---

## Schema Overview

```
┌──────────────────────────────────┐
│         Auth Database             │
│  ┌────────────────────────────┐  │
│  │          users              │  │
│  │  id (UUID PK)              │  │
│  │  name VARCHAR(255)         │  │
│  │  email VARCHAR(255) UNIQUE │  │
│  │  password VARCHAR(255)     │  │
│  │  role VARCHAR(20)          │  │
│  │  refresh_token_hash VARCHAR│  │
│  │  created_at TIMESTAMP      │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│       Customer Database           │
│  ┌────────────────────────────┐  │
│  │         customers           │  │
│  │  id (UUID PK)              │  │
│  │  name VARCHAR(255) NOT NULL│──┐
│  │  company VARCHAR(255) NOT  │  │
│  │  industry VARCHAR(255)     │  │
│  │  location VARCHAR(255)     │  │
│  │  email VARCHAR(255)        │  │
│  │  phone VARCHAR(255)        │  │
│  │  contact_person VARCHAR    │  │
│  │  last_contacted TIMESTAMP  │  │
│  │  status VARCHAR(20)        │  │
│  │  tags TEXT                 │  │
│  │  notes TEXT                │  │
│  │  website VARCHAR(255)      │  │
│  │  created_at TIMESTAMP      │  │
│  │  updated_at TIMESTAMP      │  │
│  └───────────┬────────────────┘  │
│              │                    │
│  ┌───────────▼────────────────┐  │
│  │       opportunities         │  │
│  │  id (UUID PK)              │  │
│  │  name VARCHAR(255) NOT NULL│  │
│  │  customer_id UUID NOT NULL │──┘
│  │  customer_name VARCHAR(255)│  │
│  │  stage VARCHAR(20) NOT NULL│  │
│  │  value NUMERIC(15,2)       │  │
│  │  probability INT NOT NULL  │  │
│  │  close_date DATE           │  │
│  │  assigned_to VARCHAR(255)  │  │
│  │  description TEXT          │  │
│  │  created_at TIMESTAMP      │  │
│  │  updated_at TIMESTAMP      │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

---

## Table Definitions (DDL)

### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,           -- BCrypt hashed
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',
    refresh_token_hash VARCHAR(255),          -- SHA-256 of refresh token
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Customers Table

```sql
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    location VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    contact_person VARCHAR(255),
    last_contacted TIMESTAMP,
    status VARCHAR(20) DEFAULT 'LEAD',        -- LEAD | ACTIVE | CHURNED | INACTIVE
    tags TEXT,                                 -- Comma-separated
    notes TEXT,
    website VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

### Opportunities Table

```sql
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    customer_name VARCHAR(255),               -- Denormalized for quick display
    stage VARCHAR(20) NOT NULL DEFAULT 'PROSPECT',
        -- PROSPECT | QUALIFIED | PROPOSAL | NEGOTIATION | CLOSED_WON | CLOSED_LOST
    value NUMERIC(15, 2),                     -- Deal value with 2 decimal places
    probability INT NOT NULL DEFAULT 0,       -- 0-100 percentage
    close_date DATE,
    assigned_to VARCHAR(255),                 -- User name/email
    description TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

---

## Entity Definitions

### User Entity

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;  // BCrypt hash

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Role role;

    private String refreshTokenHash;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
```

### Customer Entity

```java
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, columnDefinition = "VARCHAR(255)")
    private String name;

    @Column(nullable = false, columnDefinition = "VARCHAR(255)")
    private String company;

    @Column(columnDefinition = "VARCHAR(255)")
    private String industry;

    @Column(columnDefinition = "VARCHAR(255)")
    private String location;

    @Column(columnDefinition = "VARCHAR(255)")
    private String email;

    @Column(columnDefinition = "VARCHAR(255)")
    private String phone;

    @Column(name = "contact_person", columnDefinition = "VARCHAR(255)")
    private String contactPerson;

    @Column(name = "last_contacted")
    private LocalDateTime lastContacted;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private CustomerStatus status;

    @Column(columnDefinition = "TEXT")
    private String tags;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(columnDefinition = "VARCHAR(255)")
    private String website;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
```

### Opportunity Entity

```java
@Entity
@Table(name = "opportunities")
public class Opportunity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, columnDefinition = "VARCHAR(255)")
    private String name;

    @Column(name = "customer_id", nullable = false)
    private UUID customerId;

    @Column(name = "customer_name", columnDefinition = "VARCHAR(255)")
    private String customerName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OpportunityStage stage;

    @Column(precision = 15, scale = 2)
    private BigDecimal value;

    @Column(nullable = false)
    private int probability = 0;

    @Column(name = "close_date")
    private LocalDate closeDate;

    @Column(name = "assigned_to", columnDefinition = "VARCHAR(255)")
    private String assignedTo;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
```

---

## Enums

### CustomerStatus

```java
public enum CustomerStatus {
    LEAD,       // Initial contact, not yet qualified
    ACTIVE,     // Engaged customer with ongoing relationship
    CHURNED,    // Customer lost
    INACTIVE    // No recent activity
}
```

### OpportunityStage

```java
public enum OpportunityStage {
    PROSPECT,     // Early stage lead
    QUALIFIED,    // Lead qualifies as opportunity
    PROPOSAL,     // Proposal sent
    NEGOTIATION,  // Active negotiations
    CLOSED_WON,   // Deal closed successfully
    CLOSED_LOST   // Deal lost to competitor or abandoned
}
```

---

## Column Type Gotcha: `bytea` vs `VARCHAR`

When deploying Spring Boot services to cloud PostgreSQL (Railway), string columns can be created as **`bytea` (binary)** instead of `varchar`/`text`. This happens due to Hibernate's type detection with certain PostgreSQL configurations.

### Symptom
```
ERROR: function lower(bytea) does not exist
Hint: No function matches the given name and argument types.
```

### Prevention
Add `columnDefinition` to all `String` fields in JPA entities:

```java
@Column(columnDefinition = "VARCHAR(255)")
private String name;

@Column(columnDefinition = "TEXT")
private String description;
```

### Fix for Existing Tables
```sql
ALTER TABLE customers
  ALTER COLUMN name TYPE VARCHAR(255),
  ALTER COLUMN company TYPE VARCHAR(255),
  ALTER COLUMN email TYPE VARCHAR(255),
  ALTER COLUMN industry TYPE VARCHAR(255),
  ALTER COLUMN location TYPE VARCHAR(255),
  ALTER COLUMN phone TYPE VARCHAR(255),
  ALTER COLUMN contact_person TYPE VARCHAR(255),
  ALTER COLUMN website TYPE VARCHAR(255),
  ALTER COLUMN tags TYPE TEXT,
  ALTER COLUMN notes TYPE TEXT;

ALTER TABLE opportunities
  ALTER COLUMN name TYPE VARCHAR(255),
  ALTER COLUMN customer_name TYPE VARCHAR(255),
  ALTER COLUMN assigned_to TYPE VARCHAR(255),
  ALTER COLUMN description TYPE TEXT;
```

---

## Database Configuration

### application.yml (Auth Service)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/atlasai  # Railway overrides via DataSourceConfig
    username: atlasai
    password: atlasai_secret
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update           # Auto-create/update tables
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
```

### DataSourceConfig (Railway Parsing)

Every service has a `DataSourceConfig.java` that overrides these defaults when `DATABASE_URL` is present:

```java
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

---

## Related Documentation

| Document | Link |
|----------|------|
| Architecture | [Architecture.md](Architecture.md) |
| API Reference | [API.md](API.md) |
| Deployment | [Deployment.md](Deployment.md) |
| Debugging | [Debugging.md](Debugging.md) |
