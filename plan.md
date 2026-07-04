# AtlasAI — Project Implementation Plan

> **Project:** Agentic Sales Workflow Automation Platform
> **Last Updated:** July 4, 2026

---

## 📋 Status Overview

| Layer | Completion | Status |
|-------|-----------|--------|
| **Frontend Pages** | ~95% | ✅ All 43 pages built — auth wired to real backend |
| **Auth Service** | 100% | ✅ Running on port 8081 — register, login, refresh, RBAC verified |
| **Customer/CRM Service** | 100% | ✅ Full CRUD microservice — Customer + Opportunity endpoints |
| **Frontend→Backend Integration** | 40% | 🟡 Customers & Opportunities wired to real API with loading/error states |
| **Founder Page Redesign** | 100% | ✅ Premium 3-column dashboard layout with responsive grid |
| **Frontend Dockerfile + Nginx** | 100% | ✅ Multi-stage Docker build + production Nginx config |
| **AI Agent Service** | 80% | ✅ Python structure done — needs OpenAI key |
| **Workflow Service** | 0% | ❌ Not started |
| **Task Service** | 0% | ❌ Not started |
| **Notification Service** | 0% | ❌ Not started |
| **Search Service** | 0% | ❌ Not started |

---

## 🎯 Phase 1: Authentication ✅ Complete

### What Was Built

**Backend — Auth Service (Port 8081)**
- Spring Boot with Spring Security, JWT (HMAC-SHA256)
- `POST /api/auth/register` — create account (name, email, password)
- `POST /api/auth/login` — authenticate, returns JWT pair
- `POST /api/auth/refresh` — refresh access token using refresh token
- `POST /api/auth/logout` — revoke refresh token (SHA-256 hash stored in DB)
- `GET /api/auth/me` — current user profile
- `GET /api/users` — list users (admin only)
- BCrypt password hashing, role-based access (USER/MANAGER/ADMIN)
- Global exception handler for consistent error responses

**Frontend — Auth Integration**
- `LoginPage.tsx` — real API calls, login + register mode toggle
- `authStore.ts` — stores `accessToken` + `refreshToken` from backend
- `api.ts` — full token refresh interceptor with request queuing
- `ProtectedRoute.tsx` — redirects to `/login` if unauthenticated
- Mock demo auth completely removed

---

## 📦 Phase 2: Customer/CRM Service (Port 8082) ✅ Complete

### Backend — Full Java/Spring Boot Microservice

**Files created:**
```
services/customer-service/src/main/java/com/atlasai/customer/
├── CustomerApplication.java                 — Entry point (@EnableCaching)
├── config/
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
│   ├── CustomerRepository.java              — JPA with search query (industry, location, status, days)
│   └── OpportunityRepository.java           — JPA with search query (stage, value range)
└── model/
    ├── entity/
    │   ├── Customer.java                    — JPA entity (12 fields + timestamps)
    │   └── Opportunity.java                 — JPA entity (10 fields + timestamps)
    ├── enums/
    │   ├── CustomerStatus.java              — ACTIVE, INACTIVE, LEAD
    │   └── OpportunityStage.java            — PROSPECT → WON/LOST pipeline
    ├── request/
    │   ├── CustomerRequest.java             — With @NotBlank/@Email validation
    │   └── OpportunityRequest.java          — With validation
    └── response/
        ├── CustomerResponse.java            — @Builder pattern
        └── OpportunityResponse.java         — @Builder pattern
```

**API Endpoints:**

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/customers?search=&industry=&location=&status=&daysSinceContact=` | Search/filter customers |
| `GET` | `/api/customers/{id}` | Get customer by ID |
| `POST` | `/api/customers` | Create customer |
| `PUT` | `/api/customers/{id}` | Update customer |
| `DELETE` | `/api/customers/{id}` | Delete customer |
| `GET` | `/api/customers/count` | Customer count (public) |
| `GET` | `/api/opportunities?search=&stage=&minValue=&maxValue=` | Search/filter opportunities |
| `GET` | `/api/opportunities/{id}` | Get opportunity by ID |
| `GET` | `/api/opportunities/by-customer/{customerId}` | Get by customer |
| `POST` | `/api/opportunities` | Create opportunity |
| `PUT` | `/api/opportunities/{id}` | Update opportunity |
| `DELETE` | `/api/opportunities/{id}` | Delete opportunity |
| `GET` | `/api/opportunities/count` | Opportunity count (public) |

**Dockerfile** — Multi-stage Maven build (same pattern as auth-service)

### Frontend — Real API Connection

**New files created:**
- `frontend/src/services/customerService.ts` — API client with TypeScript interfaces
- `frontend/src/services/opportunityService.ts` — API client for opportunities
- `frontend/src/hooks/useCustomers.ts` — TanStack Query hooks (list, detail, create, update, delete)
- `frontend/src/hooks/useOpportunities.ts` — TanStack Query hooks for opportunities
- `frontend/src/hooks/useDashboard.ts` — Dashboard summary hooks

**Pages updated (now use real API with loading/error/empty states):**
- `CustomerListPage.tsx` — Loading spinner, error alert, empty state with CTA, search filter
- `CustomerDetailPage.tsx` — Loading, error, 360° view with linked opportunities
- `CustomerFormPage.tsx` — Create with validation, loading state, error handling
- `OpportunityListPage.tsx` — Kanban + table view, loading/error/empty states
- `OpportunityDetailPage.tsx` — Loading, error, deal info with probability bar
- `OpportunityFormPage.tsx` — Create with validation, loading state
- `DashboardPage.tsx` — Real customer/deal counts, recent customers & deals lists

---

## 🎨 Phase 1.5: Founder Page & UI Redesign ✅ Complete

### What Was Built
- Desktop-first 3-column CSS grid layout
- Tablet/mobile responsive variants
- Mobile responsive fixes for all auth pages (login, forgot password, reset password)

---

## 🔄 Phase 3: Workflow Service (Port 8083) ❌ Not Started

### To Build
- [ ] JPA entities: `WorkflowRun`, `WorkflowStep`
- [ ] JPA repositories
- [ ] Service layer for workflow orchestration
- [ ] REST controllers (CRUD + execution)
- [ ] Kafka consumer for step events + producer for lifecycle events
- [ ] Spring Retry for resilient execution

### Frontend Pages That Will Connect
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

### Frontend Pages That Will Connect
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
- [x] Frontend nginx.conf (SPA routing + API proxy + caching + security)
- [x] Auth service Dockerfile (multi-stage Maven build)
- [x] Customer service Dockerfile (multi-stage Maven build)

### To Build
- [ ] Add all microservices to `docker-compose.yml`
- [ ] Add Nginx reverse proxy service to docker-compose (routes `/api/*` to services)
- [ ] Create DB init scripts for all services
- [ ] Prometheus + Grafana monitoring
- [ ] K8s deployment manifests
- [ ] CI/CD pipeline with Docker image building
- [ ] Create `.dockerignore` files for each service

---

## 🚀 Phase 9: Deployment & Launch

### To Do
- [ ] Deploy Customer/CRM service to Railway
- [ ] Register Customer service domain + update Nginx proxy
- [ ] Set up custom domain + SSL
- [ ] Run end-to-end auth + customer CRUD flow test on production
- [ ] Monitor logs and error rates

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
- **Cache:** Redis 7
- **Event Bus:** Apache Kafka
- **Auth:** JWT (HMAC-SHA256)

### Frontend
- **Language:** TypeScript 5.x
- **Framework:** React 18.x
- **UI Library:** Material UI 5.x
- **State:** Zustand + TanStack Query
- **Routing:** React Router v6
- **Design:** Zomato-inspired (#E23744 primary)
- **Build:** Vite 5.x
- **Deployment:** Docker + Nginx (multi-stage)
