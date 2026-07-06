# 📡 API Reference

> **Base URLs:**
> - Auth Service: `https://agentic-workflow-automator-production.up.railway.app`
> - Customer Service: `https://customer-service-production-0ff7.up.railway.app`
> - All endpoints return JSON. Protected endpoints require `Authorization: Bearer <token>` header.

---

## Authentication Endpoints

### `POST /api/auth/register`

Create a new user account.

```json
// Request
{ "name": "John Doe", "email": "john@company.com", "password": "securePass123" }

// Response (201 Created)
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "userId": "362b4a35-...",
  "name": "John Doe",
  "email": "john@company.com",
  "role": "ROLE_USER"
}
```

### `POST /api/auth/login`

Authenticate and receive JWT tokens.

```json
// Request
{ "email": "john@company.com", "password": "securePass123" }

// Response (200 OK)
// Same schema as register response
```

### `POST /api/auth/refresh`

Get a new access token using a refresh token.

```json
// Request
{ "refreshToken": "eyJhbGciOiJIUzI1NiJ9..." }

// Response (200 OK)
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

### `POST /api/auth/logout`

Revoke the current refresh token.

```
Header: Authorization: Bearer <accessToken>
Response: 200 OK (no body)
```

### `GET /api/auth/me`

Get the currently authenticated user's profile.

```
Header: Authorization: Bearer <accessToken>

Response (200 OK):
{
  "id": "362b4a35-...",
  "name": "John Doe",
  "email": "john@company.com",
  "role": "ROLE_USER",
  "createdAt": "2026-07-02T12:00:00"
}
```

---

## Customer Endpoints

### `GET /api/customers`

List customers with pagination and filtering.

```
Header: Authorization: Bearer <token>

Query Parameters:
  search            (optional) Search name, company, email
  industry          (optional) Filter by industry
  location          (optional) Filter by location
  status            (optional) Filter by status (LEAD, ACTIVE, CHURNED, etc.)
  daysSinceContact  (optional) Filter by days since last contact
  page              (default: 0) Page number
  size              (default: 50) Items per page
  sort              (default: updatedAt) Sort field
  direction         (default: desc) asc or desc

Response (200 OK):
{
  "content": [
    {
      "id": "uuid",
      "name": "Acme Corp",
      "company": "Acme Inc",
      "industry": "Tech",
      "location": "Chennai",
      "email": "contact@acme.com",
      "phone": "+91-1234567890",
      "contactPerson": "Dr. Sharma",
      "lastContacted": "2026-06-20T10:30:00",
      "status": "ACTIVE",
      "tags": "healthcare,enterprise",
      "notes": "Key account in healthcare sector",
      "website": "https://acme.com",
      "createdAt": "2026-06-01T08:00:00",
      "updatedAt": "2026-07-05T14:30:00"
    }
  ],
  "totalElements": 42,
  "totalPages": 3,
  "number": 0,
  "size": 20
}
```

### `GET /api/customers/{id}`

Get a single customer by ID.

```
Header: Authorization: Bearer <token>
Response (200 OK): Single customer object
Response (400): { "error": "Customer not found: <id>" }
```

### `POST /api/customers`

Create a new customer.

```
Header: Authorization: Bearer <token>
Header: Content-Type: application/json

Request:
{
  "name": "Acme Corp",
  "company": "Acme Inc",
  "industry": "Tech",
  "location": "Chennai",
  "email": "contact@acme.com",
  "phone": "+91-1234567890",
  "contactPerson": "Dr. Sharma",
  "website": "https://acme.com",
  "notes": "Key account",
  "tags": "healthcare,enterprise",
  "status": "LEAD"
}

Response (201 Created): Single customer object
```

### `PUT /api/customers/{id}`

Update an existing customer.

```
Header: Authorization: Bearer <token>
Request: Same body as POST
Response (200 OK): Updated customer object
```

### `DELETE /api/customers/{id}`

Delete a customer.

```
Header: Authorization: Bearer <token>
Response: 204 No Content
```

### `GET /api/customers/count`

Get total customer count. (Public — no auth required)

```
Response (200 OK): 42
```

---

## Opportunity Endpoints

### `GET /api/opportunities`

List opportunities with pagination and filtering.

```
Header: Authorization: Bearer <token>

Query Parameters:
  search     (optional) Search by name, customer name
  stage      (optional) Filter by stage (PROSPECT, QUALIFIED, PROPOSAL, NEGOTIATION, CLOSED_WON, CLOSED_LOST)
  minValue   (optional) Minimum deal value
  maxValue   (optional) Maximum deal value
  page       (default: 0)
  size       (default: 50)
  sort       (default: updatedAt)
  direction  (default: desc)

Response (200 OK):
{
  "content": [
    {
      "id": "uuid",
      "name": "Enterprise License Deal",
      "customerId": "uuid",
      "customerName": "Acme Corp",
      "stage": "NEGOTIATION",
      "value": 50000.00,
      "probability": 75,
      "closeDate": "2026-08-15",
      "assignedTo": "John Doe",
      "description": "Enterprise-wide license agreement",
      "createdAt": "2026-06-15T10:00:00",
      "updatedAt": "2026-07-05T16:00:00"
    }
  ],
  "totalElements": 15,
  "totalPages": 1,
  "number": 0,
  "size": 50
}
```

### `GET /api/opportunities/{id}`

Get a single opportunity by ID.

### `GET /api/opportunities/by-customer/{customerId}`

Get all opportunities for a specific customer.

### `POST /api/opportunities`

Create a new opportunity.

```json
// Request
{
  "name": "Enterprise License Deal",
  "customerId": "uuid",
  "customerName": "Acme Corp",
  "stage": "PROSPECT",
  "value": 50000.00,
  "probability": 25,
  "closeDate": "2026-08-15",
  "assignedTo": "John Doe",
  "description": "Enterprise-wide license agreement"
}

// Response (201 Created)
```

### `PUT /api/opportunities/{id}`

Update an existing opportunity.

### `DELETE /api/opportunities/{id}`

Delete an opportunity.

### `GET /api/opportunities/count`

Get total opportunity count. (Public — no auth required)

---

## Error Responses

All errors follow a consistent JSON format:

```json
// 400 Bad Request — Invalid input
{ "error": "Customer not found: 123e4567-e89b-12d3-a456-426614174000" }

// 400 Bad Request — Validation failure
{
  "error": "Validation failed",
  "fieldErrors": {
    "email": "must be a well-formed email address",
    "name": "must not be blank"
  }
}

// 401 Unauthorized — JWT expired or invalid
{ "error": "Invalid or expired authentication token" }

// 403 Forbidden — Insufficient permissions
{ "error": "Access denied. You do not have permission to perform this action." }

// 409 Conflict — Database constraint
{
  "error": "Data integrity violation",
  "detail": "duplicate key value violates unique constraint \"users_email_key\""
}

// 500 Internal Server Error
{ "error": "An unexpected error occurred. Please try again later." }
```

---

## Error HTTP Status Codes

| Status | Meaning | When |
|--------|---------|------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input, missing params, validation failure |
| 401 | Unauthorized | Invalid/expired JWT |
| 403 | Forbidden | Insufficient role |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate entry, constraint violation |
| 500 | Internal Error | Unexpected server error |

---

## Related Documentation

| Document | Link |
|----------|------|
| Authentication | [Authentication.md](Authentication.md) |
| Architecture | [Architecture.md](Architecture.md) |
| Database schema | [Database.md](Database.md) |
