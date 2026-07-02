# 🌟 Phase 02: Design & Planning — UI Architecture & Blueprint

> **Project:** AtlasAI — Agentic Sales Workflow Automation Platform
> **Status:** ✅ Complete (Design Phase)
> **Duration:** Architecture & Planning Session
> **Date:** July 2026

---

## 🎯 Phase Objective

Complete the full design and planning phase: define the complete system architecture documentation, create a comprehensive UI page/component inventory, establish project scaffolding (gitignore), and lock in design decisions — all before any code is written.

---

## ✅ What We've Accomplished

### 1. 📄 Architecture Documentation

| Deliverable | Status | Description |
|-------------|--------|-------------|
| **`architecture.md`** | ✅ Complete | 1,036-line comprehensive architecture deep dive covering all 4 layers: backend service topology, database schema & indexing, frontend component hierarchy & state management, AI agent orchestration design, end-to-end data flow, security architecture, observability stack, and key architecture decisions |

The architecture document covers the following sections in depth:

- **Backend Architecture** — Service topology (7 microservices), sync/async communication patterns (REST + Kafka), API Gateway role (Spring Cloud Gateway), Resilience4j error handling strategy
- **Database Architecture** — Complete ER schema (7 tables), PostgreSQL + pgvector indexing strategy (HNSW), Redis multi-purpose usage (5 use cases), Kafka Schema Registry event contracts (3 sample schemas)
- **Frontend Architecture** — Full component tree map (50+ pages), 4-tier state management strategy (TanStack Query + URL state + Zustand + local), API integration patterns, real-time update strategy
- **AI Agent Architecture** — Agent hierarchy (Orchestrator + 4 specialist agents), full workflow (planning → execution → reporting), RAG pipeline with pgvector, framework decision analysis (OpenAI Agents SDK vs LangGraph)
- **Security & Observability** — JWT structure, RBAC matrix, Micrometer custom metrics, Jaeger tracing
- **35+ key architecture decisions** documented with rationale

### 2. 📋 Complete UI Page & Component Inventory

| Deliverable | Status | Description |
|-------------|--------|-------------|
| **`pages.md`** | ✅ Complete | 1,097-line comprehensive inventory of every page, component, and state variation across the entire application |

The pages inventory catalogs:

| Module | Pages | Components |
|--------|-------|------------|
| **Authentication** | 4 pages + 1 modal | 25+ components |
| **Layout & Navigation** | 4 shared layouts | 20+ components |
| **Dashboards** | 3 role-specific dashboards | 30+ components |
| **Workflows** | 5 pages | 50+ components |
| **Customers/CRM** | 4 pages + 1 import | 45+ components |
| **Opportunities** | 3 pages | 25+ components |
| **Tasks** | 3 pages | 20+ components |
| **Analytics** | 4 pages | 30+ components |
| **Admin** | 8 pages | 45+ components |
| **Settings** | 5 pages | 25+ components |
| **Help & Support** | 4 pages | 12+ components |
| **Error Pages** | 5 pages | 5+ components |
| **Shared Components** | 5 categories | 60+ reusable components |
| **Totals** | **~50 pages** | **~250+ components** |

Every component is documented with:
- **Component name and purpose**
- **Description of functionality**
- **All state variations** (loading, loaded, empty, error, hover, active, disabled, etc.)

### 3. 🛡️ Project Scaffolding — .gitignore

| Deliverable | Status | Description |
|-------------|--------|-------------|
| **`.gitignore`** | ✅ Complete | 108-line comprehensive gitignore covering all project layers |

The .gitignore covers:
- ✅ **Environment & Secrets** — `.env`, `.env.local`, `.env.*.local`
- ✅ **Java/Spring Boot** — `target/`, `*.class`, `*.jar`, `*.war`
- ✅ **Python** — `__pycache__/`, `*.pyc`, `.venv/`, `venv/`
- ✅ **Node.js/React/TypeScript** — `node_modules/`, `build/`, `dist/`
- ✅ **Docker** — `.docker/`, `docker-compose.override.yml`
- ✅ **IDE & Editor** — `.idea/`, `*.iml`, `.vscode/`, `*.swp`
- ✅ **OS Files** — `.DS_Store`, `Thumbs.db`
- ✅ **Build Artifacts** — `*.log`, `logs/`, `*.tmp`
- ✅ **Project Specific** — `out/`, `generated/`, `kubeconfig`, `**/values.local.yaml`

---

## 🎨 Design Decision: Docker Desktop UI

### Decision

The AtlasAI frontend will be designed to visually mirror the **Docker Desktop** application.

### Rationale

The user specified that Docker Desktop's UI "looks professional" and asked for AtlasAI to follow the same design language — colors, icons, fonts, component styling, and overall aesthetic.

### Design System Reference

Docker Desktop is built on **React + Material UI (MUI)** with a custom theme (`@docker/docker-mui-theme`). Key characteristics:

#### Color Palette
| Role | Light Mode | Dark Mode |
|------|-----------|-----------|
| **Primary (Ocean Blue)** | `#0D7CFF` | `#4D9FFF` |
| **Deep Blue** | `#0052CC` | `#2684FF` |
| **Surface/Background** | `#FFFFFF` | `#1A1A2E` |
| **Sidebar Background** | `#F7F7F8` | `#16162A` |
| **Card Background** | `#FFFFFF` | `#22223A` |
| **Text Primary** | `#1A1A2E` | `#EDEDED` |
| **Text Secondary** | `#6B7280` | `#A1A1AA` |
| **Success** | `#10B981` | `#34D399` |
| **Warning** | `#F59E0B` | `#FBBF24` |
| **Error** | `#EF4444` | `#F87171` |
| **Border** | `#E5E7EB` | `#2D2D4A` |

#### Typography
| Property | Value |
|----------|-------|
| **Font Family** | System sans-serif stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` |
| **Headings** | Semi-bold (600), larger letter-spacing |
| **Body** | Regular (400), 14px base |
| **Monospace** | `'SF Mono', Monaco, 'Cascadia Code', 'Consolas', monospace` (for logs/CLI) |

#### Icons
- **Material Design Icons** (MUI icon library)
- **Custom Docker icons** for containers, images, volumes, networks
- 24px default size
- Outlined style for navigation, filled for status indicators

#### Layout Patterns
| Pattern | Docker Desktop Approach |
|---------|------------------------|
| **Sidebar** | Persistent left sidebar (~240px), collapsible to icon-only (~64px). Contains nav sections with icons + labels. Active item highlighted with accent color. |
| **Header** | Thin top bar with breadcrumbs, global search (Cmd+K style), notifications bell, user avatar menu |
| **Main Content** | Single scrollable area with cards, tables, and status indicators |
| **Modals** | Centered overlay with backdrop blur (subtle), rounded corners (8px), clear title + close button |
| **Tables** | Clean rows with subtle hover highlight, sortable column headers, status badges, row actions on hover |
| **Cards** | White/gray rounded containers (8px border-radius), subtle shadow, clean padding (16-24px) |
| **Status Badges** | Rounded pills with colored dots: green (running), yellow (pending), red (error), gray (stopped) |
| **Buttons** | MUI-style: text, outlined, contained variants. Primary = Ocean Blue. Secondary = subtle gray. |

#### Key UI Behaviors
- **Dark/Light mode toggle** with smooth transition
- **Collapsible sidebar** with animated width transition
- **Search/Command Palette** (Ctrl+K / Cmd+K) for quick navigation
- **Hover states** with subtle background color change on all clickable elements
- **Loading states** with skeleton placeholders (not spinners)
- **Empty states** with centered illustrations and action CTAs
- **Tooltips** on icon-only buttons
- **Responsive** — adapts from full desktop down to tablet

### Implementation Plan

The frontend will be built using:
- **React 18.x** with **TypeScript 5.x** — strict mode
- **Material UI (MUI) 5.x** — component library (same as Docker Desktop)
- **Custom MUI Theme** — to match Docker Desktop's exact color palette, typography, spacing, and component overrides
- **Material Icons** — for all iconography
- **Zustand** — for global state (auth, UI preferences)
- **TanStack Query** — for server state management

The custom MUI theme will be defined in `frontend/src/styles/theme.ts` with:
- Docker Desktop's exact color tokens for both light and dark modes
- Typography settings matching their system font stack
- Component style overrides for buttons, cards, tables, dialogs, badges
- Spacing and border-radius consistency

---

## 📝 Design Decisions Locked

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **UI Design Language** | Docker Desktop (Material UI) | Professional, clean, developer-familiar aesthetic |
| **Frontend Framework** | React + TypeScript + MUI | Docker Desktop's exact stack — proven pattern |
| **Theme Architecture** | Custom MUI theme with Docker colors | Full control over every component's appearance |
| **Icon Set** | Material Icons | Same as Docker Desktop, comprehensive library |
| **Layout** | Fixed sidebar + top header + scrollable content | Docker Desktop's proven navigation pattern |
| **Dark Mode** | First-class support alongside light mode | Enterprise requirement, matches Docker |
| **Component States** | Every component has defined: default, hover, active, loading, empty, error, disabled states | Ensures no UI is built without considering all states |

---

## 📋 Accounts Still Needed

> **Note:** These remain unchanged from Phase 01 as we are still in the design/planning phase.

| Service | Purpose | Sign-Up Link | Priority |
|---------|---------|-------------|----------|
| 🔑 **OpenAI API Key** | LLM calls for AI agents | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | 🔴 **High** — needed for coding AI agent |
| 📧 **SendGrid Account** | Email sending | [sendgrid.com](https://sendgrid.com) | 🟡 Medium — needed week 5 |
| 📅 **Google Cloud Platform** | Calendar API | [console.cloud.google.com](https://console.cloud.google.com) | 🟡 Medium — needed week 5 |

---

## 🚀 What's Next — Phase 03: Project Scaffolding & Infrastructure

### Step 1: Create Project Directory Structure

Create all the directories for the microservices and frontend:

```bash
atlasai/
├── services/
│   ├── auth-service/
│   ├── customer-service/
│   ├── workflow-service/
│   ├── task-service/
│   ├── notification-service/
│   ├── search-service/
│   └── ai-agent-service/
├── frontend/
├── infra/
│   ├── k8s/
│   │   ├── deployments/
│   │   ├── services/
│   │   └── ingress.yaml
│   └── helm/
├── docs/
│   ├── diagrams/
│   └── api-specs/
└── .github/
    └── workflows/
```

### Step 2: Create `infra/docker-compose.yml`

Define all infrastructure services:

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| **PostgreSQL** | postgres:16-alpine | 5432 | Primary database + pgvector |
| **Redis** | redis:7-alpine | 6379 | Cache, sessions, rate limiting |
| **Zookeeper** | confluentinc/cp-zookeeper | 2181 | Kafka coordination |
| **Kafka** | confluentinc/cp-kafka | 9092 | Event streaming bus |
| **MinIO** (optional) | minio/minio | 9000, 9001 | Object storage |

Include health checks, persistent volumes, and network configuration.

### Step 3: Scaffold 6 Spring Boot Microservices

Create each service via Spring Initializr or manually with Maven:

| Service | Dependencies | Port | Priority |
|---------|-------------|------|----------|
| **auth-service** | Web, Security, OAuth2 Resource Server, JPA, PostgreSQL, Validation, Actuator, Lombok | 8081 | 🥇 First |
| **customer-service** | Web, JPA, PostgreSQL, Redis, Kafka, Cache, Validation, Actuator, Lombok | 8082 | 🥇 First |
| **workflow-service** | Web, Kafka, Validation, Actuator, Retry, Lombok | 8083 | 🥇 First |
| **task-service** | Web, JPA, PostgreSQL, Kafka, Validation, Actuator, Lombok | 8084 | 🥇 First |
| **notification-service** | Web, Mail, Kafka, Validation, Actuator, Retry, Lombok | 8085 | 🥈 Second |
| **search-service** | Web, JPA, PostgreSQL, Validation, Actuator, Lombok | 8086 | 🥈 Second |

Each service will include:
- Maven POM with `spring-boot-starter-parent` (3.x)
- `application.yml` with service name, port, DB/Kafka/Redis connection config
- `Dockerfile` using `eclipse-temurin:21-jre-alpine`
- Basic REST controller for health check
- JPA entity + repository for services with databases

### Step 4: Scaffold Python AI Agent Service

```bash
services/ai-agent-service/
├── agents/
│   ├── __init__.py
│   ├── orchestrator.py      # Main orchestrator agent
│   ├── crm_agent.py          # CRM query agent
│   ├── email_agent.py        # Email sending agent
│   └── calendar_agent.py     # Meeting scheduling agent
├── tools/
│   ├── __init__.py
│   ├── crm_tools.py          # CRM API call tools
│   ├── email_tools.py        # Email API call tools
│   └── calendar_tools.py     # Calendar API call tools
├── vectordb/
│   ├── __init__.py
│   └── pgvector_client.py    # pgvector integration
├── requirements.txt          # OpenAI SDK, FastAPI, psycopg2, etc.
├── Dockerfile                # Python 3.11-slim
├── app.py                    # FastAPI entry point
└── config.py                 # Configuration
```

### Step 5: Scaffold React Frontend with Docker Desktop Theme

```bash
# Create React + TypeScript app
npx create-react-app frontend --template typescript

# Install dependencies
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install react-router-dom axios @tanstack/react-query zustand
npm install react-hook-form @hookform/resolvers
npm install date-fns recharts

# Create Docker Desktop theme
frontend/src/styles/
├── theme.ts                  # Custom MUI theme (Docker colors)
├── globals.css               # Global styles
└── variables.css             # CSS custom properties
```

### Step 6: Frontend Page Implementation Order

Pages will be implemented in this priority order (matching the 8-week roadmap):

| Priority | Pages | Week |
|----------|-------|------|
| **P0 — Auth & Layout** | LoginPage, ForgotPasswordPage, ResetPasswordPage, AppLayout, Sidebar, Header | Week 6 |
| **P0 — Dashboard** | DashboardPage (Rep view) | Week 6 |
| **P0 — Workflows** | CreateWorkflowPage, WorkflowListPage, WorkflowDetailPage | Week 6 |
| **P1 — CRM** | CustomerListPage, CustomerDetailPage, CustomerFormPage | Week 6-7 |
| **P1 — Tasks** | TaskListPage, TaskDetailPage | Week 7 |
| **P2 — Opportunities** | OpportunityListPage, OpportunityDetailPage, OpportunityFormPage, KanbanBoard | Week 7 |
| **P2 — Analytics** | AnalyticsPage, SalesReportsPage, AgentReportsPage | Week 7 |
| **P3 — Admin** | UserManagementPage, AuditLogPage, SystemSettingsPage, IntegrationsPage, etc. | Week 8 |
| **P3 — Settings** | ProfilePage, AccountSettingsPage, NotificationSettingsPage, etc. | Week 8 |
| **P3 — Help** | DocsPage, ApiReferencePage, ChangelogPage, ContactPage | Week 8 |

### Step 7: Integration Test — Docker Compose Smoke Test

1. Start Docker Compose (PostgreSQL, Redis, Kafka, Zookeeper)
2. Build and run auth-service
3. Verify auth-service connects to PostgreSQL and starts
4. Verify health endpoint returns 200
5. Test login flow against running auth-service

---

## 📊 Current Project File Tree

```
atlasai/                          # Project root
├── .env                          # 🔐 Environment secrets (gitignored)
├── .gitignore                    # 🛡️ Git exclusion rules (NEW)
├── deep-research-report.md       # 📄 Comprehensive research & design document
├── README.md                     # 📘 Full project documentation
├── PHASE01-ATLAS.md              # 📋 Phase 01 tracking (complete)
├── PHASE02-ATLAS.md              # 📋 This file — Phase 02 tracking (complete)
├── architecture.md               # 🏛️ Architecture deep dive (NEW — 1,036 lines)
├── pages.md                      # 📋 UI page & component inventory (NEW — 1,097 lines)
│
├── services/                     # 🔜 To be created in Phase 03
│   ├── auth-service/
│   ├── customer-service/
│   ├── workflow-service/
│   ├── task-service/
│   ├── notification-service/
│   ├── search-service/
│   └── ai-agent-service/
│
├── frontend/                     # 🔜 To be created in Phase 03
│   └── (React/TypeScript SPA)
│
├── infra/                        # 🔜 To be created in Phase 03
│   ├── docker-compose.yml
│   └── k8s/
│
├── docs/                         # 🔜 To be created in Phase 03
│   ├── diagrams/
│   └── api-specs/
│
└── .github/                      # 🔜 To be created in Phase 03
    └── workflows/
        └── ci.yml
```

---

## 🔗 Related Documents

| Document | Description |
|----------|-------------|
| [`README.md`](./README.md) | Full project documentation — vision, tech stack, roadmap, getting started |
| [`deep-research-report.md`](./deep-research-report.md) | 13-section comprehensive research & design document |
| [`architecture.md`](./architecture.md) | Complete architecture deep dive — backend, database, frontend, AI |
| [`pages.md`](./pages.md) | Complete UI page & component inventory — all 50+ pages, 250+ components |
| [`PHASE01-ATLAS.md`](./PHASE01-ATLAS.md) | Phase 01 tracking — system audit, Docker images, env setup |
| [`.env`](./.env) | Environment variables (placeholder values) |
| [`.gitignore`](./.gitignore) | Git exclusion rules for the entire project |

---

## 💡 Key Takeaways for Phase 03

1. **Start with infrastructure** — Docker Compose first, then services
2. **Auth service first** — every other service depends on it
3. **Frontend = Docker Desktop theme** — build custom MUI theme before any pages
4. **Implement pages in priority order** — P0 pages first (auth, layout, dashboard, workflows)
5. **No code written yet** — all documentation is in place, ready for scaffolding
