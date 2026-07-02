# 🌟 Phase 03: Project Scaffolding & Core Implementation

> **Project:** AtlasAI — Agentic Sales Workflow Automation Platform
> **Status:** 🟡 In Progress (Core scaffolding complete, implementation in progress)
> **Duration:** Implementation Sessions
> **Date:** July 2026

---

## 🎯 Phase Objective

Transform the architectural blueprints from Phases 01-02 into working code: scaffold all 7 microservices, build the complete auth service with JWT security, create the Python AI agent service, set up Docker infrastructure, build the React frontend with a Zomato-inspired design system, and establish CI/CD pipelines.

---

## ✅ What We've Accomplished

### 1. 📋 Project Scaffolding — Complete

| Deliverable | Status | Description |
|-------------|--------|-------------|
| **`.gitignore`** | ✅ Complete | Comprehensive gitignore covering all languages (Java, Python, Node), IDE files, OS files, build artifacts |
| **`infra/docker-compose.yml`** | ✅ Complete | PostgreSQL 16, Redis 7, Zookeeper, Kafka (Confluent), PgAdmin — all with health checks, volumes, networks |
| **`infra/init-scripts/`** | 📁 Created | Directory exists (`.gitkeep`), ready for DB initialization scripts |
| **`infra/k8s/`** | 📁 Created | Directory exists, ready for K8s deployment manifests |
| **`.github/workflows/ci.yml`** | ✅ Complete | CI pipeline for build and test |
| **`docs/`** | ✅ Complete | Architecture docs, page inventory, phase tracking documents |
| **`README.md`** | ✅ Complete | Full project documentation with tech stack, architecture diagrams, API overview |

### 2. 🔐 Auth Service (Port 8081) — Fully Implemented ✅

| Component | Files | Status |
|-----------|-------|--------|
| **Config Layer** | `SecurityConfig.java`, `JwtConfig.java`, `JwtAuthenticationFilter.java`, `ApplicationConfig.java`, `GlobalExceptionHandler.java` | ✅ Complete |
| **Controller Layer** | `AuthController.java` (register, login, refresh, logout, me), `UserController.java` (list users, get user) | ✅ Complete |
| **Service Layer** | `AuthService.java` (full auth business logic), `JwtService.java` (JWT generation, parsing, validation) | ✅ Complete |
| **Model Layer** | `User.java` (JPA entity with refresh token hash support), `Role.java` (USER/MANAGER/ADMIN enum), 3 request DTOs, 2 response DTOs | ✅ Complete |
| **Repository Layer** | `UserRepository.java` (Spring Data JPA with `findByEmail`, `existsByEmail`) | ✅ Complete |
| **Configuration** | `application.yml` (PostgreSQL, JWT secrets, Actuator, logging) | ✅ Complete |
| **Dockerfile** | `eclipse-temurin:21-jre-alpine` based | ✅ Complete |
| **Maven Wrapper** | `mvnw`, `mvnw.cmd`, `.mvn/wrapper/` | ✅ Complete |

#### Auth Service Security Features Implemented:
- ✅ JWT access token (1hr TTL) + refresh token (7 day TTL) with HMAC-SHA256 signing
- ✅ Refresh token SHA-256 hash stored in user record for server-side revocation
- ✅ Token type claim validation (`type: refresh`) prevents access token misuse at refresh endpoint
- ✅ Proper JWT exception handling — malformed/expired tokens return 401 instead of 500
- ✅ `@Transactional` on all mutation operations (register, login, logout)
- ✅ BCrypt password encoding via Spring Security
- ✅ Stateless session management, CSRF disabled
- ✅ Role-based access: `/api/users/**` requires ADMIN role
- ✅ `GlobalExceptionHandler` covering `JwtException`, `BadCredentialsException`, validation errors

### 3. 📦 Other 5 Spring Boot Services — Scaffolded (Stubs)

| Service | Port | Dependencies | Status |
|---------|------|-------------|--------|
| **customer-service** | 8082 | Web, JPA, PostgreSQL, Redis, Kafka, Cache, Validation, Actuator, Lombok | 🟡 **Stub** — only `CustomerApplication.java` + `application.yml` |
| **workflow-service** | 8083 | Web, JPA, PostgreSQL, Kafka, Validation, Actuator, Retry, Lombok | 🟡 **Stub** — only `WorkflowApplication.java` + `application.yml` |
| **task-service** | 8084 | Web, JPA, PostgreSQL, Kafka, Validation, Actuator, Lombok | 🟡 **Stub** — only `TaskApplication.java` + `application.yml` |
| **notification-service** | 8085 | Web, Mail, Kafka, Validation, Actuator, Retry, Lombok | 🟡 **Stub** — only `NotificationApplication.java` + `application.yml` |
| **search-service** | 8086 | Web, JPA, PostgreSQL, Validation, Actuator, Lombok | 🟡 **Stub** — only `SearchApplication.java` + `application.yml` |

Each service has:
- ✅ Complete Maven POM with appropriate dependencies
- ✅ `application.yml` with port, service name, DB/Kafka config
- ✅ Dockerfile (`eclipse-temurin:21-jre-alpine`)
- ✅ Maven wrapper (mvnw)
- ✅ Compiled successfully (BUILD SUCCESS on `mvnw compile`)

What's **missing** in each:
- ❌ Domain entities / JPA models
- ❌ Repositories
- ❌ Service classes with business logic
- ❌ REST controllers
- ❌ Kafka event producers/consumers
- ❌ DTOs (request/response)
- ❌ Unit tests

### 4. 🤖 AI Agent Service (Port 8087) — Implemented ✅

| Component | Status |
|-----------|--------|
| **`app.py`** (FastAPI entry) | ✅ Complete — `/health`, `/api/agent/start`, `/api/agent/status` endpoints |
| **`config.py`** | ✅ Complete — environment-based configuration for OpenAI, services, DB, Redis |
| **`requirements.txt`** | ✅ Complete — FastAPI, uvicorn, openai, openai-agents, psycopg2, python-dotenv, redis |
| **`Dockerfile`** | ✅ Complete — Python 3.11-slim |
| **Agent Structure** | ✅ Complete — `agents/` (orchestrator, crm, email, calendar), `tools/` (crm, email, calendar), `vectordb/` (pgvector client) |

What's **missing** in AI Agent Service:
- ❌ OpenAI API key (placeholder — not yet configured)
- ❌ `/api/agent/status/{workflow_id}` always returns "RUNNING" — never shows COMPLETED/FAILED
- ❌ No unit tests
- ❌ No `.env` file created specifically for the AI service

### 5. 🖥️ Frontend — Zomato-Inspired Design ✅

#### Design System

| Element | Implementation | Details |
|---------|---------------|---------|
| **Primary Color** | `#E23744` (Zomato Red) | Gradient buttons, focus highlights, active states |
| **Typography** | Poppins (headings) + Inter (body) | Google Fonts loaded via CDN |
| **Background** | `#F4F4F2` (warm off-white) | Applied globally via MUI theme |
| **Surface** | `#FFFFFF` (white cards, panels) | Card-based layout |
| **Border Radius** | 6-12px (rounded) | Buttons: 6px, Cards: 12px, Inputs: 8px |
| **Shadows** | Subtle, layered | `0 2px 8px rgba(0,0,0,0.06)` |
| **Button Style** | Gradient red with hover lift | `translateY(-1px)` + red glow shadow |
| **Input Style** | Red focus border (2px), icon adornments | Email icon, password visibility toggle |

#### Files Created/Modified

| File | Purpose | Lines |
|------|---------|-------|
| `frontend/src/styles/theme.ts` | MUI theme with Zomato colors, typography, component overrides | ~250 |
| `frontend/src/styles/globals.css` | Base styles, scrollbar, selection color, focus-visible | ~60 |
| `frontend/index.html` | Google Fonts (Poppins + Inter), title | ~25 |
| `frontend/src/layouts/PublicLayout.tsx` | Split-screen auth layout (red brand panel + white auth panel) | ~160 |
| `frontend/src/layouts/AppLayout.tsx` | Sidebar + header with Zomato red accents | ~200 |
| `frontend/src/App.tsx` | Route definitions with `/login` and `/register` | ~45 |
| `frontend/src/pages/auth/LoginPage.tsx` | Sign In + Register with Zomato styling | ~280 |
| `frontend/src/stores/authStore.ts` | Zustand store with localStorage hydration | ~55 |
| `frontend/src/services/api.ts` | Axios with JWT interceptor + 401 handling | ~40 |

#### Pages Implemented

| Page | Status | Notes |
|------|--------|-------|
| **LoginPage (Sign In)** | ✅ Complete | Email with icon, password with toggle, gradient button, forgot password link |
| **LoginPage (Register)** | ✅ Complete | Same page with mode toggle — name field + email + password |
| **DashboardPage** | ✅ Complete | Metric cards, recent workflows section |
| **WorkflowListPage** | ✅ Complete | Empty state with "New Workflow" CTA |
| **WorkflowCreatePage** | 🟡 Skeleton | Basic page structure |
| **WorkflowDetailPage** | 🟡 Skeleton | Basic page structure |
| **CustomerListPage** | 🟡 Skeleton | Placeholder content |
| **TaskListPage** | 🟡 Skeleton | Placeholder content |
| **NotFoundPage** | ✅ Complete | 404 error page |

#### State Management

| Store | Status | Details |
|-------|--------|---------|
| **authStore** (Zustand) | ✅ Complete | Token + user persistence in localStorage, hydration on init |
| **uiStore** (Zustand) | ✅ Complete | UI preferences (sidebar state, theme) |
| **TanStack Query** | 📦 Installed | Ready for server state management |

#### Features Verified
- ✅ TypeScript compiles with zero errors
- ✅ Frontend dev server starts successfully (Vite on port 3000)
- ✅ Split-screen layout renders correctly in browser
- ✅ Auth form with email, password, visibility toggle renders
- ✅ Google + GitHub social login buttons with divider
- ✅ Sign In / Register toggle works, navigates between `/login` and `/register`
- ✅ Register mode shows name field
- ✅ No console errors in browser

#### Frontend Gaps (What Needs Work)
- ❌ DashboardPage uses hardcoded demo data (not connected to API)
- ❌ WorkflowCreatePage and WorkflowDetailPage are basic stubs
- ❌ CustomerListPage and TaskListPage are placeholders
- ❌ No TanStack Query integration yet (no API data fetching)
- ❌ No dark mode toggle (theme only has light mode)
- ❌ LoginPage doesn't redirect to dashboard if already authenticated
- ❌ No unit tests for any frontend component
- ❌ Several pages from the `pages.md` inventory are not implemented:
  - ForgotPasswordPage, ResetPasswordPage
  - CustomerDetailPage, CustomerFormPage
  - TaskDetailPage
  - All Opportunity/Analytics/Admin/Settings/Help pages

### 6. 🔄 Build Verification

| Build Check | Result |
|-------------|--------|
| **auth-service** `mvnw compile` | ✅ BUILD SUCCESS |
| **customer-service** `mvnw compile` | ✅ BUILD SUCCESS |
| **workflow-service** `mvnw compile` | ✅ BUILD SUCCESS |
| **task-service** `mvnw compile` | ✅ BUILD SUCCESS |
| **notification-service** `mvnw compile` | ✅ BUILD SUCCESS |
| **search-service** `mvnw compile` | ✅ BUILD SUCCESS |
| **Frontend** `tsc --noEmit` | ✅ Zero errors |

---

## 🚧 What Needs To Be Done

### Priority: 🔴 Critical (Foundational)

#### 1. Docker Infrastructure — Start Services
- [ ] Start Docker Compose: `docker compose -f infra/docker-compose.yml up -d`
- [ ] Verify PostgreSQL, Redis, Kafka, Zookeeper health checks pass
- [ ] Create database initialization scripts in `infra/init-scripts/` (per-service databases)
- [ ] Add `restart: unless-stopped` to Kafka service in docker-compose.yml (currently missing)

#### 2. .env Configuration
- [ ] Create `.env` file with real/placeholder values for:
  - PostgreSQL connection (all service databases)
  - Redis connection
  - Kafka bootstrap servers
  - JWT secret (minimum 256-bit for HS256)
  - OpenAI API key (needs real key)
  - SendGrid API key (placeholder)
  - Google Calendar API (placeholder)
- [ ] Create `.env.example` for documentation purposes

#### 3. Integration Test — Auth Service
- [ ] Start Docker Compose
- [ ] Build and run auth-service with `mvnw spring-boot:run`
- [ ] Verify auth-service connects to PostgreSQL
- [ ] Test health endpoint: `GET /actuator/health`
- [ ] Test registration: `POST /api/auth/register`
- [ ] Test login: `POST /api/auth/login`
- [ ] Test authenticated request: `GET /api/auth/me`
- [ ] Test token refresh: `POST /api/auth/refresh`
- [ ] Test logout: `POST /api/auth/logout`
- [ ] Test that refresh token is revoked after logout

### Priority: 🟡 High (Core Business Logic)

#### 4. Implement Customer/CRM Service (Port 8082)
- [ ] Domain entities: `Customer`, `Opportunity`, `Contact`
- [ ] JPA repositories with search/filter methods
- [ ] Service layer with CRUD + business logic
- [ ] REST controllers with full CRUD endpoints
- [ ] Kafka producer for `customer.updated` events
- [ ] Redis cache integration for frequently accessed customers
- [ ] DTOs with validation
- [ ] Unit tests

#### 5. Implement Workflow Service (Port 8083)
- [ ] Domain entities: `Workflow`, `WorkflowStep`, `WorkflowExecution`
- [ ] JPA repositories
- [ ] Service layer for workflow orchestration
- [ ] REST controllers for workflow CRUD + execution control
- [ ] Kafka consumer for workflow step events
- [ ] Kafka producer for workflow lifecycle events
- [ ] Spring Retry for resilient workflow execution
- [ ] Unit tests

#### 6. Implement Task Service (Port 8084)
- [ ] Domain entities: `Task`, `TaskAssignment`
- [ ] JPA repositories with filtering by status/assignee
- [ ] Service layer for task CRUD + assignment
- [ ] REST controllers
- [ ] Kafka consumer for AI-generated task creation
- [ ] Kafka producer for task lifecycle events
- [ ] Unit tests

#### 7. Implement Notification Service (Port 8085)
- [ ] Kafka consumer for email notification events
- [ ] Email sending via Spring Mail (SendGrid integration)
- [ ] Email template system (Thymeleaf or similar)
- [ ] Calendar event creation (Google Calendar API)
- [ ] REST controller for notification history
- [ ] Spring Retry for failed notifications
- [ ] Unit tests

#### 8. Implement Search Service (Port 8086)
- [ ] pgvector vector store integration
- [ ] Embedding generation pipeline (OpenAI API)
- [ ] Semantic search endpoints
- [ ] Document indexing service
- [ ] RAG (Retrieval-Augmented Generation) support for AI agents
- [ ] Unit tests

### Priority: 🟢 Medium (Frontend Expansion)

#### 9. Frontend — Complete Auth Flow
- [ ] Add route protection — redirect to `/login` if not authenticated
- [ ] Add token refresh interceptor in api.ts (use `/api/auth/refresh` before expiry)
- [ ] Add auto-redirect to `/dashboard` on LoginPage if already authenticated
- [ ] Add logout functionality in AppLayout (connect to authStore + API)
- [ ] Wire up `/api/auth/me` on app load to verify token validity

#### 10. Frontend — Dashboard Real Data
- [ ] Replace hardcoded metrics with real API data (TanStack Query)
- [ ] Add loading skeletons for dashboard cards
- [ ] Add error states for failed API calls
- [ ] Add real-time workflow status via polling or WebSocket

#### 11. Frontend — Implement Remaining P0/P1 Pages
- [ ] **Customer pages**: CustomerDetailPage, CustomerFormPage (with react-hook-form)
- [ ] **Workflow pages**: Fully implement CreateWorkflowPage, WorkflowDetailPage
- [ ] **Task pages**: TaskDetailPage with status management
- [ ] Add pagination, search, and filtering to list pages

#### 12. Frontend — Dark Mode
- [ ] Add dark mode toggle to AppLayout header
- [ ] Create dark theme variant (red accents on dark backgrounds)
- [ ] Persist theme preference in uiStore
- [ ] Detect system preference via `prefers-color-scheme`

### Priority: 🔵 Low (Polish & Enhancement)

#### 13. AI Agent Service — Production Readiness
- [ ] Add real OpenAI API key (user needs to provide)
- [ ] Implement proper workflow status tracking (not always "RUNNING")
- [ ] Add error handling for OpenAI API failures
- [ ] Add workflow execution history storage (PostgreSQL)
- [ ] Add Redis for agent conversation memory
- [ ] Add unit tests for all agents and tools
- [ ] Add request validation (Pydantic)

#### 14. Testing — Add Test Coverage

| Service | Current | Target |
|---------|---------|--------|
| **auth-service** | ❌ Zero tests | ✅ Unit tests for JwtService, AuthService, controllers |
| **customer-service** | ❌ Zero tests | ✅ Unit + integration tests |
| **workflow-service** | ❌ Zero tests | ✅ Unit + integration tests |
| **task-service** | ❌ Zero tests | ✅ Unit + integration tests |
| **notification-service** | ❌ Zero tests | ✅ Unit + integration tests |
| **search-service** | ❌ Zero tests | ✅ Unit + integration tests |
| **ai-agent-service** | ❌ Zero tests | ✅ Unit tests for agents + tools |
| **frontend** | ❌ Zero tests | ✅ Component tests (Vitest + React Testing Library) |

#### 15. Docker Compose — Add Microservices
- [ ] Add auth-service as a Docker Compose service
- [ ] Add customer-service as a Docker Compose service
- [ ] Add workflow-service as a Docker Compose service
- [ ] Add task-service as a Docker Compose service
- [ ] Add notification-service as a Docker Compose service
- [ ] Add search-service as a Docker Compose service
- [ ] Add ai-agent-service as a Docker Compose service
- [ ] Set up proper service dependencies and health checks

#### 16. Kubernetes Deployment Manifests
- [ ] Create deployment manifests for all 7 services
- [ ] Create service manifests (ClusterIP)
- [ ] Create Ingress for API Gateway
- [ ] Create ConfigMaps for service configuration
- [ ] Create Secrets for sensitive data (DB passwords, API keys)

#### 17. Monitoring & Observability
- [ ] Add Prometheus metrics configuration
- [ ] Add Grafana dashboards
- [ ] Add Jaeger distributed tracing
- [ ] Add structured logging (JSON format)
- [ ] Add health check endpoints for all services

#### 18. Remaining Frontend Pages (from `pages.md` inventory)
- [ ] **Opportunities**: List, Detail, Form, KanbanBoard
- [ ] **Analytics**: SalesReports, AgentReports, Charts
- [ ] **Admin**: UserManagement, AuditLog, SystemSettings, Integrations, Billing
- [ ] **Settings**: Profile, Account, Notifications, Security, API Keys
- [ ] **Help**: Docs, API Reference, Changelog, Contact, Roadmap
- [ ] **Error Pages**: 403, 500, Maintenance

#### 19. CI/CD Pipeline Enhancement
- [ ] Add automated testing to CI pipeline
- [ ] Add Docker image building and pushing
- [ ] Add deployment to staging environment
- [ ] Add linting (ESLint, Checkstyle)
- [ ] Add security scanning

---

## 📋 Accounts Still Needed

| Service | Purpose | Sign-Up Link | Priority | Status |
|---------|---------|-------------|----------|--------|
| 🔑 **OpenAI API Key** | LLM calls for AI agents | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | 🔴 **High** | ❌ Not yet obtained |
| 📧 **SendGrid Account** | Email sending for notifications | [sendgrid.com](https://sendgrid.com) | 🟡 Medium | ❌ Not yet obtained |
| 📅 **Google Cloud Platform** | Calendar API for meeting scheduling | [console.cloud.google.com](https://console.cloud.google.com) | 🟡 Medium | ❌ Not yet obtained |

---

## 🐛 Known Issues & Technical Debt

### Security
1. ~~**JWT exceptions cause 500 errors**~~ ✅ **FIXED** — Now properly returns 401
2. ~~**Logout doesn't revoke refresh tokens**~~ ✅ **FIXED** — SHA-256 hash stored in user record, cleared on logout
3. ~~**Refresh token endpoint accepts access tokens**~~ ✅ **FIXED** — Validates `type: refresh` claim
4. **api.ts still uses hard page reload** — `window.location.href` on 401, though authStore is cleared first
5. **No HTTPS** — Running on plain HTTP for development

### Infrastructure
6. **Kafka restart policy missing** — `restart: unless-stopped` not set on Kafka service
7. **Kafka advertised listeners** — `PLAINTEXT://localhost:9092` won't work for container-to-container communication
8. **PgAdmin exposed with default credentials** — Security risk for production, acceptable for dev
9. **No `.env` file committed** — Need `.env.example` for onboarding

### Code Quality
10. **5 Spring Boot services are stubs** — No business logic implemented
11. **No tests anywhere** — Zero test coverage across the entire project
12. **LoginPage catch uses `any` type** — Should use AxiosError type
13. **AI agent status endpoint always returns "RUNNING"** — Needs real state tracking
14. **Frontend doesn't use refresh token from login response** — Token refresh not implemented on frontend

---

## 🗺️ Project Roadmap (Updated)

```
Week 1  [✅] Phase 01: Foundation & Environment Setup
Week 2  [✅] Phase 02: Design & Planning
Week 3  [🔵] Phase 03: Project Scaffolding & Core Implementation
                ├── ✅ Infrastructure: Docker Compose, gitignore, CI
                ├── ✅ Auth Service: Full JWT implementation
                ├── 🟡 5 Spring Boot services: Stubs only
                ├── ✅ AI Agent Service: Full Python implementation
                ├── ✅ Frontend: Zomato theme, auth pages, layout
                └── ❌ Integration tests not yet run
Week 4  [🔄] Phase 04: Business Logic Implementation
                ├── 🔴 Customer/CRM Service
                ├── 🔴 Workflow Service
                ├── 🔴 Task Service
                └── 🔴 Docker Compose integration
Week 5  [📅] Phase 05: Notifications & Search
                ├── Notification Service (Email + Calendar)
                ├── Search Service (pgvector + RAG)
                └── AI Agent integration with all services
Week 6  [📅] Phase 06: Frontend Expansion
                ├── Complete CRM pages (detail, form)
                ├── Dashboard with real data
                ├── Workflow builder UI
                └── Dark mode
Week 7  [📅] Phase 07: Testing & Polish
                ├── Unit tests for all services
                ├── Integration tests
                ├── Frontend component tests
                └── Performance optimization
Week 8  [📅] Phase 08: Production Readiness
                ├── K8s deployment manifests
                ├── Monitoring (Prometheus, Grafana, Jaeger)
                ├── Security audit
                └── Documentation
```

---

## 📊 Current Project File Tree

```
atlasai/                              # Project root
├── .github/
│   └── workflows/
│       └── ci.yml                    # ✅ CI pipeline
├── .gitignore                        # ✅ Complete gitignore
├── README.md                         # ✅ Project documentation
│
├── docs/
│   ├── architecture.md               # ✅ Architecture deep dive
│   ├── deep-research-report.md       # ✅ Research report
│   ├── pages.md                      # ✅ UI page inventory
│   ├── PHASE01-ATLAS.md              # ✅ Phase 01 tracking
│   ├── PHASE02-ATLAS.md              # ✅ Phase 02 tracking
│   ├── PHASE03-ATLASAI.md            # ✅ THIS FILE
│   └── auth-implement-reason.md      # ✅ Auth service design doc
│
├── infra/
│   ├── docker-compose.yml            # ✅ PostgreSQL, Redis, Kafka, ZK, PgAdmin
│   ├── init-scripts/
│   │   └── .gitkeep                  # 📁 Ready for DB scripts
│   └── k8s/                          # 📁 Empty — deployment manifests needed
│
├── services/
│   ├── auth-service/                 # ✅ FULL implementation
│   ├── customer-service/             # 🟡 Stub (Application.java only)
│   ├── workflow-service/             # 🟡 Stub (Application.java only)
│   ├── task-service/                 # 🟡 Stub (Application.java only)
│   ├── notification-service/         # 🟡 Stub (Application.java only)
│   ├── search-service/               # 🟡 Stub (Application.java only)
│   └── ai-agent-service/             # ✅ Full Python implementation
│
├── frontend/
│   ├── index.html                    # ✅ Google Fonts (Poppins + Inter)
│   ├── package.json                  # ✅ All dependencies installed
│   ├── vite.config.ts                # ✅ Vite config with proxy
│   ├── tsconfig.json                 # ✅ TypeScript strict mode
│   └── src/
│       ├── App.tsx                   # ✅ Route definitions
│       ├── main.tsx                  # ✅ Entry point
│       ├── styles/
│       │   ├── theme.ts              # ✅ Zomato MUI theme (~250 lines)
│       │   └── globals.css           # ✅ Base styles
│       ├── layouts/
│       │   ├── AppLayout.tsx         # ✅ Sidebar + header (red accents)
│       │   └── PublicLayout.tsx      # ✅ Split-screen auth layout
│       ├── pages/
│       │   ├── auth/
│       │   │   └── LoginPage.tsx     # ✅ Sign In + Register with Zomato style
│       │   ├── customers/
│       │   │   └── CustomerListPage.tsx  # 🟡 Placeholder
│       │   ├── dashboard/
│       │   │   └── DashboardPage.tsx     # ✅ With metric cards
│       │   ├── errors/
│       │   │   └── NotFoundPage.tsx      # ✅ 404 page
│       │   ├── tasks/
│       │   │   └── TaskListPage.tsx      # 🟡 Placeholder
│       │   └── workflows/
│       │       ├── WorkflowListPage.tsx  # ✅ With empty state
│       │       ├── WorkflowCreatePage.tsx # 🟡 Skeleton
│       │       └── WorkflowDetailPage.tsx # 🟡 Skeleton
│       ├── services/
│       │   └── api.ts               # ✅ Axios with JWT + 401 handling
│       └── stores/
│           ├── authStore.ts          # ✅ Zustand with localStorage hydration
│           └── uiStore.ts            # ✅ UI preferences
```

---

## 🔗 Related Documents

| Document | Description |
|----------|-------------|
| [`README.md`](../README.md) | Full project documentation — vision, tech stack, roadmap |
| [`architecture.md`](./architecture.md) | Architecture deep dive — all 4 layers |
| [`pages.md`](./pages.md) | Complete UI page & component inventory (~250+ components) |
| [`deep-research-report.md`](./deep-research-report.md) | 13-section comprehensive research & design document |
| [`auth-implement-reason.md`](./auth-implement-reason.md) | Auth service implementation rationale & API design |
| [`PHASE01-ATLAS.md`](./PHASE01-ATLAS.md) | Phase 01 — Foundation & environment setup |
| [`PHASE02-ATLAS.md`](./PHASE02-ATLAS.md) | Phase 02 — Design & planning |

---

## 💡 Key Takeaways

1. **Auth service is production-ready** with JWT, refresh token revocation, and proper error handling
2. **5 Spring Boot services are stubs** — implementing them is the biggest remaining task
3. **Frontend has a beautiful Zomato-inspired design** but only auth pages are fully wired up
4. **No integration testing done yet** — Docker Compose needs to be started and services verified end-to-end
5. **Zero test coverage** — tests need to be written across the entire project
6. **OpenAI API key is the critical blocker** for the AI agent service to function
7. **All 6 Spring Boot services compile successfully** — Maven wrapper setup is verified
