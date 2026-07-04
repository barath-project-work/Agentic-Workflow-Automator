# AtlasAI — Project Implementation Plan

> **Project:** Agentic Sales Workflow Automation Platform
> **Last Updated:** July 4, 2026

---

## 📋 Status Overview

| Layer | Completion | Status |
|-------|-----------|--------|
| **Frontend Pages** | ~95% | ✅ All 43 pages built — auth wired to real backend |
| **Auth Service** | 100% | ✅ Running on port 8081 — register, login, refresh, RBAC verified |
| **Founder Page Redesign** | 100% | ✅ Premium 3-column dashboard layout with responsive grid |
| **Frontend Dockerfile + Nginx** | 100% | ✅ Multi-stage Docker build + production Nginx config |
| **AI Agent Service** | 80% | ✅ Python structure done — needs OpenAI key |
| **Customer/CRM Service** | 0% | ❌ Not started |
| **Workflow Service** | 0% | ❌ Not started |
| **Task Service** | 0% | ❌ Not started |
| **Notification Service** | 0% | ❌ Not started |
| **Search Service** | 0% | ❌ Not started |
| **Frontend→Backend Integration** | 20% | 🟡 Auth wired (login, register, refresh, route protection) |

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
- `shouldNotFilter` for public endpoints (register, login, refresh, actuator)

**Frontend — Auth Integration**
- `LoginPage.tsx` — real API calls, login + register mode toggle, reads `/register` route to auto-switch
- `authStore.ts` — stores `accessToken` + `refreshToken` from backend, `setTokens()` for refresh
- `api.ts` — full token refresh interceptor with request queuing (prevents infinite loops)
- `ProtectedRoute.tsx` — redirects to `/login` if unauthenticated
- `App.tsx` — wraps authenticated routes in `<ProtectedRoute>`, adds `/register` route
- `vite.config.ts` — proxies `/api` → `localhost:8081` (auth-service)
- Mock demo auth completely removed

**Infrastructure**
- Docker Compose running: PostgreSQL 16, Redis 7, Kafka + Zookeeper, PgAdmin
- Auth service verified: register → login → /me → refresh → logout all tested via curl
- TypeScript compiles with zero errors

### 📝 Auth Flow
1. Register → `POST /api/auth/register` (name, email, password)
2. Login → `POST /api/auth/login` (email, password)
3. Backend returns `{ accessToken, refreshToken, tokenType, expiresIn, userId, name, email, role }`
4. Frontend stores tokens in `localStorage` (Zustand `authStore`)
5. Every API request: `Authorization: Bearer <accessToken>`
6. On 401: attempt refresh via `POST /api/auth/refresh`
7. If refresh fails: logout + redirect to /login

---

## 🎨 Phase 1.5: Founder Page & UI Redesign ✅ Complete

### What Was Built

**FounderPage.tsx — Premium Redesign**
- Desktop-first 3-column CSS grid layout: `[Social Links | Contact Info | Actions]`
- Tablet (sm): 2 columns with Resume + Business Card side-by-side below
- Mobile (xs): 1 column — everything stacks
- Content container widened from 520px → 1100px on desktop
- All vertical dividers removed, sections separated by grid gap
- `SocialLinkCard` and `ContactInfoCard` — identical dimensions (`minHeight: 56`, `px: 2.5, py: 1.75`, `borderRadius: 2`, 40px icon containers)
- Text overflow handled with `noWrap` + `minWidth: 0` + `text-overflow: ellipsis`
- Resume CTA uses `fontWeight: 700`, gradient background, solid red icon container
- Subtle hover states: `translateY(-1px)`, layered shadows (Linear/Vercel/Stripe-inspired)
- Section headings: `0.6875rem`, `#A0A0A0`, uppercase, `letterSpacing: 0.08em`

**PublicLayout.tsx — Mobile Founder Access**
- On mobile (xs): added top bar with AtlasAI logo + compact "Founder" pill button
- Navigates to `/founder` — same as desktop "Meet the Founder" section

### Validated
- [x] TypeScript compiles with zero errors
- [x] Production build succeeds (`npm run build`)

---

## 📦 Phase 1.6: Frontend Deployment Files ✅ Complete

### What Was Built

**frontend/Dockerfile** — Multi-stage production Docker build:
- Stage 1 (`node:20-alpine`): installs deps, runs `npm run build`
- Stage 2 (`nginx:stable-alpine`): serves built `dist/` via Nginx on port 80
- HEALTHCHECK via `/health` endpoint

**frontend/nginx.conf** — Production Nginx config:
- SPA routing via `try_files $uri /index.html`
- `/api/` proxy pass to auth-service backend (configurable upstream)
- Gzip compression for JS, CSS, JSON, SVG, fonts
- Security headers: X-Frame-Options, X-Content-Type, XSS-Protection, Referrer-Policy
- Cache headers: assets (1 year immutable), static images (30 days), index.html (no-cache)

### Build & Run
```bash
cd frontend
docker build -t atlasai-frontend .
docker run -p 8080:80 atlasai-frontend
```

---

## 🗺️ Phase 2: Customer/CRM Service (Port 8082)

### To Build
- [ ] JPA entities: `Customer`, `Opportunity`
- [ ] Spring Data JPA repositories with search/filter methods
- [ ] Service layer with CRUD + business logic
- [ ] REST controllers matching frontend expectations
- [ ] Kafka producer for `customer.updated` events
- [ ] Redis cache integration
- [ ] DTOs with validation + unit tests

### Frontend Pages That Will Connect
| Page | Route | Endpoints Needed |
|------|-------|-----------------|
| CustomerListPage | `/customers` | `GET /api/customers?search=&industry=&location=` |
| CustomerDetailPage | `/customers/:id` | `GET /api/customers/{id}` |
| CustomerFormPage | `/customers/create`, `/customers/:id/edit` | `POST /api/customers`, `PUT /api/customers/{id}` |
| OpportunityListPage | `/opportunities` | `GET /api/opportunities` |
| OpportunityDetailPage | `/opportunities/:id` | `GET /api/opportunities/{id}` |
| OpportunityFormPage | `/opportunities/create`, `/opportunities/:id/edit` | `POST /api/opportunities`, `PUT /api/opportunities/{id}` |

---

## 🔄 Phase 3: Workflow Service (Port 8083)

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

## 📋 Phase 4: Task Service (Port 8084)

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

## 📧 Phase 5: Notification Service (Port 8085)

### To Build
- [ ] Kafka consumer for email notification events
- [ ] Email sending via Spring Mail (SendGrid)
- [ ] Calendar event creation (Google Calendar API)
- [ ] REST controller for notification history

---

## 🔎 Phase 6: Search Service (Port 8086)

### To Build
- [ ] pgvector vector store integration
- [ ] Embedding generation pipeline (OpenAI API)
- [ ] Semantic search endpoints
- [ ] RAG support for AI agents

---

## 🔗 Phase 7: Frontend → Backend Integration

### To Build
- [ ] Replace mock data with TanStack Query API calls for each domain (Customers, Opportunities, Workflows, Tasks, Analytics, Admin)
- [ ] Add loading skeletons to all list pages
- [ ] Add error states for failed API calls
- [x] Token refresh interceptor in `api.ts` with request queuing
- [x] Route protection via `ProtectedRoute.tsx`
- [ ] Implement proper 404/error pages from mock data placeholders

---

## 🐳 Phase 8: Infrastructure & DevOps

### Completed
- [x] Frontend Dockerfile (multi-stage build with Nginx)
- [x] Frontend nginx.conf (SPA routing + API proxy + caching + security)
- [x] Auth service Dockerfile (exists and ready)

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
- [ ] Deploy PostgreSQL (managed: Neon, Supabase, or Railway)
- [ ] Deploy auth service (Railway, Render, or Fly.io)
- [ ] Deploy frontend (Vercel, Netlify, or Railway)
- [ ] Set up custom domain + SSL
- [ ] Configure JWT secret in production
- [ ] Run end-to-end auth flow test on production
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
