# 🌟 Phase 04: Project Audit, Current State & Next Steps

> **Project:** AtlasAI — Agentic Sales Workflow Automation Platform
> **Status:** ✅ Updated — Full Project Audit Complete
> **Date:** July 2026
> **Author:** AI-Assisted Project Analysis

---

## 📋 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Complete Project Inventory](#-complete-project-inventory)
3. [Frontend — Detailed State](#-frontend--detailed-state)
4. [Backend — Detailed State](#-backend--detailed-state)
5. [Infrastructure — Detailed State](#-infrastructure--detailed-state)
6. [What Was Built Across All Phases](#-what-was-built-across-all-phases)
7. [Critical Gaps & Blockers](#-critical-gaps--blockers)
8. [Priority Roadmap — What To Do Next](#-priority-roadmap--what-to-do-next)
9. [Known Issues & Technical Debt](#-known-issues--technical-debt)
10. [Accounts & Secrets Needed](#-accounts--secrets-needed)

---

## 📊 Executive Summary

AtlasAI has progressed through **3 full phases** and significant additional frontend work:

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 01** | Foundation & Environment Setup | ✅ Complete |
| **Phase 02** | Design & Planning (Architecture, UI Inventory) | ✅ Complete |
| **Phase 03** | Project Scaffolding & Core Implementation | ✅ Complete |
| **Phase 03 Enhancement** | Full Frontend Implementation (46 pages, mock data, demo auth) | ✅ Complete |
| **Phase 03 Polish** | Founder Page, Login UX improvements, image fixes | ✅ Complete |
| **Phase 04** | **Business Logic Implementation — WHERE WE ARE NOW** | 🟡 **Starting** |

### Current State Snapshot

| Area | Completion | Details |
|------|-----------|---------|
| **Frontend Pages** | ~95% | 43 of ~46 pages implemented with Zomato design, mock data, routing |
| **Auth Service** | 100% | Full JWT implementation with refresh tokens, RBAC, security |
| **Other Backend Services** | ~10% | 5 of 6 services are stubs (Application.java + config only) |
| **AI Agent Service** | 80% | Full Python structure, agent definitions, but no real OpenAI key |
| **Infrastructure** | 70% | Docker Compose ready, CI pipeline set, but not yet started/verified |
| **Integration Testing** | 0% | No services connected end-to-end yet |
| **Test Coverage** | 0% | No tests anywhere in the project |

---

## 📁 Complete Project Inventory

### Project File Tree (Current)

```
atlasai/                              # Project root
├── .github/
│   └── workflows/
│       └── ci.yml                    # CI pipeline (build & test)
├── .gitignore                        # Comprehensive gitignore
├── README.md                         # Full project documentation
│
├── docs/
│   ├── architecture.md               # ✅ Architecture deep dive
│   ├── auth-implement-reason.md      # ✅ Auth service design doc
│   ├── deep-research-report.md       # ✅ Comprehensive research report
│   ├── frontend-implementation.md    # ✅ Frontend Phase 03 completion doc
│   ├── pages.md                      # ✅ UI page inventory
│   ├── PHASE01-ATLAS.md              # ✅ Phase 01 tracking
│   ├── PHASE02-ATLAS.md              # ✅ Phase 02 tracking
│   ├── PHASE03-ATLASAI.md            # ✅ Phase 03 tracking
│   ├── previews/
│   │   └── login-preview.html        # ✅ Login page design preview
│   └── PHASE04-atlasai.md            # ✅ **THIS FILE**
│
├── infra/
│   ├── docker-compose.yml            # ✅ PostgreSQL, Redis, Kafka, ZK, PgAdmin
│   ├── init-scripts/
│   │   └── .gitkeep                  # 📁 Ready for DB init scripts
│   └── k8s/                          # 📁 Empty — K8s manifests needed
│
├── services/
│   ├── auth-service/                 # ✅ FULL implementation (secure)
│   ├── customer-service/             # 🟡 Stub only
│   ├── workflow-service/             # 🟡 Stub only
│   ├── task-service/                 # 🟡 Stub only
│   ├── notification-service/         # 🟡 Stub only
│   ├── search-service/               # 🟡 Stub only
│   └── ai-agent-service/             # ✅ Full Python structure
│
├── frontend/
│   ├── index.html                    # ✅ Google Fonts, favicon
│   ├── package.json                  # ✅ All deps installed
│   ├── vite.config.ts                # ✅ Vite config
│   ├── tsconfig.json                 # ✅ Strict TypeScript
│   ├── public/
│   │   └── founder/                  # ✅ Founder assets
│   │       ├── logo-atlasAI.png
│   │       ├── thumbnail.png
│   │       ├── founder image.png
│   │       ├── business-card.png
│   │       ├── Resume(CV).pdf
│   │       ├── linkedin.jfif
│   │       ├── github.png
│   │       └── leetcode.png
│   └── src/
│       ├── App.tsx                   # ✅ Route definitions (44+ routes)
│       ├── main.tsx                  # ✅ Entry point
│       ├── styles/
│       │   ├── theme.ts              # ✅ Zomato MUI theme
│       │   └── globals.css           # ✅ Base styles
│       ├── layouts/
│       │   ├── PublicLayout.tsx       # ✅ Split-screen auth (+ founder icon)
│       │   └── AppLayout.tsx         # ✅ Sidebar + header + content
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── LoginPage.tsx      # ✅ Demo login + email/password
│       │   │   ├── ForgotPasswordPage.tsx  # ✅
│       │   │   ├── ResetPasswordPage.tsx   # ✅
│       │   │   └── FounderPage.tsx    # ✅ NEW — full founder profile page
│       │   ├── dashboard/
│       │   │   └── DashboardPage.tsx  # ✅ Metrics, charts, workflows
│       │   ├── workflows/
│       │   │   ├── WorkflowListPage.tsx      # ✅ Grid/list toggle, filters
│       │   │   ├── WorkflowCreatePage.tsx    # ✅ Goal input, suggestions
│       │   │   ├── WorkflowDetailPage.tsx    # ✅ Step timeline, results
│       │   │   └── WorkflowTemplatesPage.tsx # ✅ Template cards
│       │   ├── customers/
│       │   │   ├── CustomerListPage.tsx      # ✅ Card grid, search, badges
│       │   │   ├── CustomerDetailPage.tsx    # ✅ 360° view
│       │   │   └── CustomerFormPage.tsx      # ✅ Create/edit form
│       │   ├── opportunities/
│       │   │   ├── OpportunityListPage.tsx   # ✅ Kanban + table toggle
│       │   │   ├── OpportunityDetailPage.tsx # ✅ Deal info, probability
│       │   │   └── OpportunityFormPage.tsx   # ✅ Create/edit form
│       │   ├── tasks/
│       │   │   ├── TaskListPage.tsx          # ✅ Tabbed list, type icons
│       │   │   ├── TaskDetailPage.tsx        # ✅ Full task info
│       │   │   └── TaskBoardPage.tsx         # ✅ Kanban columns
│       │   ├── analytics/
│       │   │   ├── AnalyticsPage.tsx         # ✅ Metrics, charts
│       │   │   ├── SalesReportsPage.tsx      # ✅ Revenue stats
│       │   │   ├── AgentReportsPage.tsx      # ✅ Agent performance
│       │   │   └── CustomReportPage.tsx      # ✅ Report builder
│       │   ├── admin/
│       │   │   ├── UserManagementPage.tsx    # ✅ User list, invite dialog
│       │   │   ├── RoleManagementPage.tsx    # ✅ Role cards, permissions
│       │   │   ├── AuditLogPage.tsx          # ✅ Searchable log entries
│       │   │   ├── SystemSettingsPage.tsx    # ✅ Config sections
│       │   │   ├── IntegrationsPage.tsx      # ✅ Integration cards
│       │   │   ├── ApiKeyManagementPage.tsx  # ✅ API key management
│       │   │   ├── EmailTemplatesPage.tsx    # ✅ Template editor
│       │   │   └── GuardrailsPage.tsx        # ✅ Guardrail cards
│       │   ├── settings/
│       │   │   ├── ProfilePage.tsx           # ✅ Avatar, name, email, bio
│       │   │   ├── AccountSettingsPage.tsx   # ✅ Password, sessions
│       │   │   ├── NotificationSettingsPage.tsx # ✅ Notification toggles
│       │   │   ├── PersonalApiKeysPage.tsx   # ✅ Personal keys
│       │   │   └── AppearancePage.tsx        # ✅ Theme, font size
│       │   ├── help/
│       │   │   ├── DocsPage.tsx              # ✅ Documentation cards
│       │   │   ├── ApiReferencePage.tsx      # ✅ Endpoint browser
│       │   │   ├── ChangelogPage.tsx         # ✅ Version history
│       │   │   └── ContactPage.tsx           # ✅ Support form
│       │   └── errors/
│       │       ├── NotFoundPage.tsx          # ✅ 404
│       │       ├── ForbiddenPage.tsx         # ✅ 403
│       │       ├── ServerErrorPage.tsx       # ✅ 500
│       │       ├── OfflinePage.tsx           # ✅ Offline
│       │       └── MaintenancePage.tsx       # ✅ Maintenance
│       ├── components/
│       │   └── FounderModal.tsx      # ✅ Founder detail modal (still exists)
│       ├── services/
│       │   ├── api.ts                # ✅ Axios + JWT interceptor
│       │   └── mockData.ts           # ✅ Comprehensive mock data (14 datasets)
│       ├── stores/
│       │   ├── authStore.ts          # ✅ Zustand auth store
│       │   └── uiStore.ts            # ✅ UI preferences store
│       └── styles/
│           ├── globals.css
│           └── theme.ts
```

---

## 🖥️ Frontend — Detailed State

### Pages Implemented (43 of ~46)

| Module | Pages | Status | Notes |
|--------|-------|--------|-------|
| **Auth** | LoginPage, ForgotPasswordPage, ResetPasswordPage, FounderPage | ✅ All Complete | Demo auth, Zomato design, founder page with CV download |
| **Dashboard** | DashboardPage | ✅ Complete | Metrics, charts, workflows, tasks |
| **Workflows** | WorkflowListPage, WorkflowCreatePage, WorkflowDetailPage, WorkflowTemplatesPage | ✅ All Complete | Grid/list toggle, step timeline, templates |
| **Customers** | CustomerListPage, CustomerDetailPage, CustomerFormPage | ✅ All Complete | 360° view, create/edit forms |
| **Opportunities** | OpportunityListPage, OpportunityDetailPage, OpportunityFormPage | ✅ All Complete | Kanban + table, pipeline |
| **Tasks** | TaskListPage, TaskDetailPage, TaskBoardPage | ✅ All Complete | Kanban board, tabbed list |
| **Analytics** | AnalyticsPage, SalesReportsPage, AgentReportsPage, CustomReportPage | ✅ All Complete | Charts, reports builder |
| **Admin** | UserManagementPage, RoleManagementPage, AuditLogPage, SystemSettingsPage, IntegrationsPage, ApiKeyManagementPage, EmailTemplatesPage, GuardrailsPage | ✅ All Complete | Full admin panel |
| **Settings** | ProfilePage, AccountSettingsPage, NotificationSettingsPage, PersonalApiKeysPage, AppearancePage | ✅ All Complete | Profile, security, appearance |
| **Help** | DocsPage, ApiReferencePage, ChangelogPage, ContactPage | ✅ All Complete | Documentation, API ref |
| **Errors** | NotFoundPage, ForbiddenPage, ServerErrorPage, OfflinePage, MaintenancePage | ✅ All Complete | All error states |

### Frontend Architecture

| Layer | Implementation | Status |
|-------|---------------|--------|
| **Design System** | Zomato-inspired (#E23744 red, Poppins + Inter fonts) | ✅ Complete |
| **Theme** | MUI custom theme with 50+ component overrides | ✅ Complete |
| **Routing** | React Router v6, nested PublicLayout/AppLayout | ✅ Complete |
| **State Management** | Zustand (auth, UI) + TanStack Query (installed) | ✅ Zustand done, TanStack unused |
| **API Layer** | Axios with JWT interceptor, 401 handling | ✅ Ready for backend |
| **Mock Data** | 100+ records across 14 datasets | ✅ Complete |
| **Demo Auth** | One-click Quick Demo Access button | ✅ Complete |
| **Founder Page** | Photo, social links, contact, resume download, business card | ✅ Complete |

### Frontend Gaps

| Gap | Severity | Details |
|-----|----------|---------|
| No route protection | 🔴 High | Navigating to `/dashboard` without login shows empty layout |
| Demo auth not wired to real backend | 🔴 High | Login uses mock data, not auth-service API |
| No loading/error states | 🟡 Medium | All pages render instantly with mock data |
| No dark mode | 🟡 Medium | Theme only has light mode |
| No responsive design | 🟡 Medium | Desktop-only optimization |
| No unit tests | 🟡 Medium | Zero test coverage |
| No TanStack Query integration | 🟡 Medium | Mock data used everywhere, no real API calls |
| Missing `/register` route | 🟢 Low | Route removed, hits 404 |
| `api.ts` uses hard page reload on 401 | 🟢 Low | `window.location.href` instead of graceful redirect |

---

## ⚙️ Backend — Detailed State

### Auth Service (Port 8081) — 100% Complete ✅

| Component | Status | Details |
|-----------|--------|---------|
| SecurityConfig | ✅ Complete | JWT filter chain, BCrypt, stateless sessions, CSRF disabled |
| JwtConfig | ✅ Complete | HMAC-SHA256, access token 1hr, refresh token 7 days |
| JwtAuthenticationFilter | ✅ Complete | Extracts JWT from Bearer header, validates, sets security context |
| GlobalExceptionHandler | ✅ Complete | JwtException, BadCredentialsException, validation errors |
| AuthController | ✅ Complete | register, login, refresh, logout, me endpoints |
| UserController | ✅ Complete | list users, get user (admin-only) |
| AuthService | ✅ Complete | Full auth business logic with refresh token revocation |
| JwtService | ✅ Complete | Token generation, parsing, validation |
| User (Entity) | ✅ Complete | JPA entity with refresh token hash, timestamps |
| UserRepository | ✅ Complete | findByEmail, existsByEmail |
| application.yml | ✅ Complete | PostgreSQL, JWT secrets, Actuator |
| Dockerfile | ✅ Complete | eclipse-temurin:21-jre-alpine |
| Build | ✅ Verified | `mvnw compile` — BUILD SUCCESS |

### Customer/CRM Service (Port 8082) — Stub 🟡

| Component | Status |
|-----------|--------|
| Application.java | ✅ Complete |
| application.yml | ✅ Complete |
| pom.xml | ✅ Complete (Web, JPA, PostgreSQL, Redis, Kafka, Cache) |
| Dockerfile | ✅ Complete |
| **Entities (Customer, Opportunity, Contact)** | ❌ Not implemented |
| **Repositories** | ❌ Not implemented |
| **Service layer** | ❌ Not implemented |
| **REST controllers** | ❌ Not implemented |
| **Kafka producer/consumer** | ❌ Not implemented |
| **Redis cache** | ❌ Not implemented |

### Workflow Service (Port 8083) — Stub 🟡

| Component | Status |
|-----------|--------|
| Application.java | ✅ Complete |
| application.yml | ✅ Complete |
| pom.xml | ✅ Complete |
| Dockerfile | ✅ Complete |
| **Entities (Workflow, WorkflowStep, WorkflowExecution)** | ❌ Not implemented |
| **Repositories** | ❌ Not implemented |
| **Service layer** | ❌ Not implemented |
| **REST controllers** | ❌ Not implemented |
| **Kafka consumer/producer** | ❌ Not implemented |

### Task Service (Port 8084) — Stub 🟡

| Component | Status |
|-----------|--------|
| Application.java | ✅ Complete |
| application.yml | ✅ Complete |
| pom.xml | ✅ Complete |
| Dockerfile | ✅ Complete |
| **Everything else** | ❌ Not implemented |

### Notification Service (Port 8085) — Stub 🟡

| Component | Status |
|-----------|--------|
| Application.java | ✅ Complete |
| application.yml | ✅ Complete |
| pom.xml | ✅ Complete |
| Dockerfile | ✅ Complete |
| **Everything else** | ❌ Not implemented |

### Search Service (Port 8086) — Stub 🟡

| Component | Status |
|-----------|--------|
| Application.java | ✅ Complete |
| application.yml | ✅ Complete |
| pom.xml | ✅ Complete |
| Dockerfile | ✅ Complete |
| **Everything else** | ❌ Not implemented |

### AI Agent Service (Port 8087) — Python ✅

| Component | Status | Details |
|-----------|--------|---------|
| app.py | ✅ Complete | FastAPI entry, /health, /api/agent/start, /api/agent/status |
| config.py | ✅ Complete | Environment-based config for OpenAI, services, DB |
| requirements.txt | ✅ Complete | FastAPI, openai, openai-agents, psycopg2, redis |
| Dockerfile | ✅ Complete | Python 3.11-slim |
| agents/orchestrator.py | ✅ Complete | Main orchestrator agent |
| agents/crm_agent.py | ✅ Complete | CRM query agent |
| agents/email_agent.py | ✅ Complete | Email agent |
| agents/calendar_agent.py | ✅ Complete | Calendar agent |
| tools/crm_tools.py | ✅ Complete | CRM API tools |
| tools/email_tools.py | ✅ Complete | Email API tools |
| tools/calendar_tools.py | ✅ Complete | Calendar tools |
| vectordb/pgvector_client.py | ✅ Complete | pgvector integration |
| **OpenAI API key** | ❌ Missing | Placeholder — needs real key |
| **Status tracking** | ❌ Always "RUNNING" | Never returns COMPLETED/FAILED |
| **Unit tests** | ❌ None | No tests |

---

## 🐳 Infrastructure — Detailed State

| Component | Status | Details |
|-----------|--------|---------|
| docker-compose.yml | ✅ Complete | PostgreSQL 16, Redis 7, Zookeeper, Kafka (Confluent), PgAdmin |
| Health checks | ✅ Complete | All services have health checks |
| Persistent volumes | ✅ Complete | PostgreSQL, Redis, Kafka, ZK all have volumes |
| Network config | ✅ Complete | `atlasai-net` bridge network |
| CI pipeline (.github/workflows/ci.yml) | ✅ Complete | Build & test workflow |
| .gitignore | ✅ Complete | 108-line comprehensive gitignore |
| **Services not in docker-compose** | ❌ Missing | None of the 7 microservices are in docker-compose |
| **DB init scripts** | ❌ Empty | `init-scripts/` only has .gitkeep |
| **K8s manifests** | ❌ Empty | `k8s/` directory is empty |
| **Docker Compose never started** | ❌ Not run | Infrastructure never verified |
| **.env file** | ❌ Not committed | Need `.env.example` |

---

## ✅ What Was Built Across All Phases

### Phase 01 — Foundation
- System prerequisites verified (Java 21, Node 24, Docker, etc.)
- Docker images pulled (PostgreSQL 16, Redis 7, Kafka, Zookeeper)
- `.env` file created with placeholder values
- Deep research report completed

### Phase 02 — Design & Planning
- Architecture deep dive document (1,036 lines)
- Complete UI page & component inventory (50+ pages, 250+ components)
- `.gitignore` created
- Docker Desktop design language selected

### Phase 03 — Scaffolding & Core Implementation
- Docker Compose with PostgreSQL, Redis, Kafka, Zookeeper, PgAdmin
- **Auth Service**: Full JWT implementation (register, login, refresh, logout, RBAC)
- **AI Agent Service**: Full Python structure (4 agents, 3 tools, pgvector client)
- 5 other Spring Boot services scaffolded (stubs)
- CI pipeline set up
- Frontend with Zomato-inspired design (theme, layout, auth pages)

### Phase 03 Enhancement — Full Frontend
- **43 pages** implemented with Zomato design
- **Mock data service** with 100+ records across 14 datasets
- **Demo auth** — one-click Quick Demo Access
- **Full navigation** — collapsible sidebar, header, notifications
- All pages: Dashboard, Workflows, Customers, Opportunities, Tasks, Analytics, Admin, Settings, Help, Errors
- TypeScript compiles with zero errors

### Phase 03 Polish — UX Improvements
- **Login page left panel**: Redesigned with atlasAI logo, thumbnail, big "Meet the Founder" icon
- **FounderPage**: Full standalone page with photo, social links (LinkedIn/GitHub/LeetCode), contact info (phone/email), resume download (`Resume(CV).pdf`), business card
- Thumbnail also clickable → navigates to /founder
- Image paths fixed (logo, founder photo, favicon)
- "Full-Stack" chip removed from modal
- Email updated to `workmailbarathg@gmail.com`

---

## 🔴 Critical Gaps & Blockers

### Blocker #1: No OpenAI API Key
The AI Agent Service is fully coded but **cannot make a single LLM call** without a real OpenAI API key. This blocks:
- Agent orchestration (planning steps from goals)
- CRM search tool (LLM generates search params)
- Email generation (LLM writes personalized emails)
- RAG pipeline (embeddings generation)

**Action needed:** User must sign up at [platform.openai.com/api-keys](https://platform.openai.com/api-keys) and paste a key.

### Blocker #2: Infrastructure Never Started
Docker Compose has never been run. This means:
- PostgreSQL, Redis, Kafka are not running
- Auth service can't connect to its database
- No integration testing has been possible
- DB initialization scripts are empty

**Action needed:** Start Docker Compose, verify health checks, then run auth-service.

### Blocker #3: 5 Backend Services Are Stubs
The core business logic services (customer, workflow, task, notification, search) have:
- No JPA entities
- No repositories
- No service classes
- No REST controllers
- No Kafka producers/consumers
- No unit tests

**This is the biggest remaining implementation task.**

### Blocker #4: No Frontend-to-Backend Integration
The frontend uses mock data for everything. Even if the backend services were running, the frontend isn't wired to call them. Needed:
- Replace mock data with TanStack Query API calls
- Wire auth service login endpoint
- Implement JWT token refresh in frontend
- Add route protection

---

## 🗺️ Priority Roadmap — What To Do Next

Organized by dependency order. Each item unlocks the next.

### Tier 1: 🔴 Foundation (Do First)

| # | Task | Effort | Unlocks |
|---|------|--------|---------|
| 1 | **Start Docker Compose** — `docker compose -f infra/docker-compose.yml up -d` | 5 min | Database, cache, event bus |
| 2 | **Create DB init scripts** — SQL scripts to create per-service databases in PostgreSQL | 30 min | Services can connect to DB |
| 3 | **Build & run auth-service** — `mvnw spring-boot:run` and verify health + login endpoints | 30 min | First working backend service |
| 4 | **Test auth flow end-to-end** — Register → Login → Refresh → Logout via curl/Postman | 20 min | Confidence in auth |
| 5 | **Create `.env.example`** — Document all required env vars | 15 min | Onboarding for other devs |

### Tier 2: 🔴 Customer/CRM Service (Port 8082)

| # | Task | Effort |
|---|------|--------|
| 6 | Create JPA entities: `Customer`, `Opportunity`, `Contact` | 2 hrs |
| 7 | Create repositories with search/filter methods | 1 hr |
| 8 | Implement service layer with CRUD + business logic | 3 hrs |
| 9 | Implement REST controllers (full CRUD + search endpoints) | 2 hrs |
| 10 | Add DTOs with validation (request/response) | 1 hr |
| 11 | Add Kafka producer for `customer.updated` events | 1 hr |
| 12 | Add Redis cache integration | 1 hr |
| 13 | Write unit tests | 2 hrs |
| 14 | **Build & run** — verify with curl | 30 min |

### Tier 3: 🟡 Workflow Service (Port 8083)

| # | Task | Effort |
|---|------|--------|
| 15 | Create entities: `Workflow`, `WorkflowStep`, `WorkflowExecution` | 2 hrs |
| 16 | Create repositories | 1 hr |
| 17 | Implement service layer for workflow orchestration | 4 hrs |
| 18 | Implement REST controllers (CRUD + execution) | 2 hrs |
| 19 | Add Kafka consumer for step events + producer for lifecycle events | 2 hrs |
| 20 | Add Spring Retry for resilient execution | 1 hr |
| 21 | Write unit tests | 2 hrs |
| 22 | **Build & run** — verify end-to-end workflow flow | 30 min |

### Tier 4: 🟡 Task Service (Port 8084)

| # | Task | Effort |
|---|------|--------|
| 23 | Create entities: `Task`, `TaskAssignment` | 1.5 hrs |
| 24 | Create repositories with filtering | 1 hr |
| 25 | Implement service layer | 2 hrs |
| 26 | Implement REST controllers + Kafka consumer/producer | 2 hrs |
| 27 | Write unit tests | 1.5 hrs |

### Tier 5: 🟡 Notification Service (Port 8085)

| # | Task | Effort |
|---|------|--------|
| 28 | Kafka consumer for email notification events | 2 hrs |
| 29 | Email sending via Spring Mail (SendGrid integration) | 3 hrs |
| 30 | Calendar event creation (Google Calendar API) | 3 hrs |
| 31 | REST controller for notification history | 1 hr |
| 32 | Spring Retry for failed notifications | 30 min |

### Tier 6: 🟡 Search Service (Port 8086)

| # | Task | Effort |
|---|------|--------|
| 33 | pgvector vector store integration | 2 hrs |
| 34 | Embedding generation pipeline (OpenAI API) | 2 hrs |
| 35 | Semantic search endpoints | 1.5 hrs |
| 36 | RAG support for AI agents | 2 hrs |

### Tier 7: 🟢 Frontend — Backend Integration

| # | Task | Effort |
|---|------|--------|
| 37 | Add route protection (ProtectedRoute wrapper) | 1 hr |
| 38 | Wire LoginPage to real auth-service endpoint | 2 hrs |
| 39 | Implement token refresh interceptor in api.ts | 1.5 hrs |
| 40 | Replace mock data with TanStack Query API calls | 8+ hrs |
| 41 | Add loading skeletons to all list pages | 3 hrs |
| 42 | Add error states for failed API calls | 2 hrs |
| 43 | Demo mode toggle in authStore (fallback if backend unavailable) | 1 hr |

### Tier 8: 🟢 AI Agent — Production Readiness

| # | Task | Effort |
|---|------|--------|
| 44 | Add real OpenAI API key (user action) | 5 min |
| 45 | Implement proper workflow status tracking (not always "RUNNING") | 3 hrs |
| 46 | Add error handling for OpenAI API failures | 2 hrs |
| 47 | Add Redis for agent conversation memory | 1.5 hrs |
| 48 | Add unit tests for all agents and tools | 3 hrs |

### Tier 9: 🔵 Polish & Enhancement

| # | Task | Effort |
|---|------|--------|
| 49 | Add dark mode to frontend | 4 hrs |
| 50 | Add responsive design (tablet/mobile) | 6 hrs |
| 51 | Add frontend unit tests (Vitest + RTL) | 8 hrs |
| 52 | Add microservices to docker-compose.yml | 2 hrs |
| 53 | Add Prometheus + Grafana monitoring | 4 hrs |
| 54 | Create K8s deployment manifests | 6 hrs |
| 55 | Integrate SendGrid for real email sending | 3 hrs |
| 56 | Integrate Google Calendar API | 3 hrs |
| 57 | Global search (Cmd+K command palette) | 4 hrs |
| 58 | Export functionality (CSV/PDF) | 3 hrs |

---

## 🐛 Known Issues & Technical Debt

### Frontend Issues
1. **No route protection** — navigating directly to `/dashboard` without login shows empty layout
2. **No loading/error states** — pages render instantly with mock data, no skeletons
3. **No dark mode** — theme only has light mode
4. **No responsive design** — desktop-only
5. **`api.ts` uses hard page reload** on 401 instead of graceful redirect
6. **LoginPage catch uses `any` type** — should use AxiosError
7. **Missing `/register` route** — removed from App.tsx, hits 404
8. **Opportunity list table view** — missing header/toggle to switch back to Kanban view
9. **TanStack Query installed but unused** — no real API data fetching

### Backend Issues
10. **5 Spring Boot services are stubs** — no business logic
11. **Zero test coverage** — no tests anywhere
12. **Kafka advertised listeners** — uses `PLAINTEXT://localhost:9092` (won't work container-to-container)
13. **Kafka restart policy** — `restart: unless-stopped` not set
14. **PgAdmin exposed with default credentials** — security risk for production
15. **No `.env.example`** — missing for onboarding

### AI Agent Issues
16. **OpenAI API key not configured** — agent can't make real LLM calls
17. **Status always returns "RUNNING"** — no real state tracking
18. **No error handling** for OpenAI API failures

### Infrastructure Issues
19. **Docker Compose never started** — infrastructure unverified
20. **DB init scripts empty** — no database initialization
21. **K8s manifests missing** — no production deployment config
22. **No monitoring/observability** — Prometheus, Grafana, Jaeger not configured

---

## 🔑 Accounts & Secrets Needed

| Service | Purpose | Sign-Up Link | Priority | Status |
|---------|---------|-------------|----------|--------|
| **OpenAI API Key** | LLM calls for AI agents | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | 🔴 **Critical** — blocks all AI features | ❌ Not obtained |
| **SendGrid Account** | Email sending via notification service | [sendgrid.com](https://sendgrid.com) | 🟡 Medium — needed for real email | ❌ Not obtained |
| **Google Cloud Platform** | Calendar API for meeting scheduling | [console.cloud.google.com](https://console.cloud.google.com) | 🟡 Medium — needed for calendar | ❌ Not obtained |

---

## 📊 Effort Summary

| Tier | Focus Area | Tasks | Estimated Effort |
|------|-----------|-------|-----------------|
| 🔴 **Tier 1** | Foundation (Docker, auth-service, DB) | 5 tasks | ~1.5 hours |
| 🔴 **Tier 2** | Customer/CRM Service | 9 tasks | ~12 hours |
| 🟡 **Tier 3** | Workflow Service | 8 tasks | ~14 hours |
| 🟡 **Tier 4** | Task Service | 5 tasks | ~8 hours |
| 🟡 **Tier 5** | Notification Service | 5 tasks | ~10 hours |
| 🟡 **Tier 6** | Search Service | 4 tasks | ~8 hours |
| 🟢 **Tier 7** | Frontend Backend Integration | 7 tasks | ~18 hours |
| 🟢 **Tier 8** | AI Agent Production Readiness | 5 tasks | ~10 hours |
| 🔵 **Tier 9** | Polish & Enhancement | 10 tasks | ~40 hours |

### Total Remaining: ~58 core implementation hours + ~40 polish hours

---

## 🔗 Related Documents

| Document | Description |
|----------|-------------|
| [`README.md`](../README.md) | Full project documentation |
| [`architecture.md`](./architecture.md) | Architecture deep dive |
| [`pages.md`](./pages.md) | Complete UI page inventory |
| [`frontend-implementation.md`](./frontend-implementation.md) | Frontend Phase 03 completion |
| [`auth-implement-reason.md`](./auth-implement-reason.md) | Auth service design rationale |
| [`PHASE01-ATLAS.md`](./PHASE01-ATLAS.md) | Phase 01 — Foundation |
| [`PHASE02-ATLAS.md`](./PHASE02-ATLAS.md) | Phase 02 — Design & Planning |
| [`PHASE03-ATLASAI.md`](./PHASE03-ATLASAI.md) | Phase 03 — Scaffolding |
| [`infra/docker-compose.yml`](../infra/docker-compose.yml) | Docker Compose configuration |

---

<p align="center">
  <i>Built with ❤️ by the AtlasAI Team</i>
</p>
