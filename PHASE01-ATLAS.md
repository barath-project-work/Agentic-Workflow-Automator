# 🌟 Phase 01: Foundation & Environment Setup

> **Project:** AtlasAI — Agentic Sales Workflow Automation Platform
> **Status:** ✅ Complete
> **Duration:** Kickoff Session
> **Date:** July 2026

---

## 🎯 Phase Objective

Set up the complete development foundation: verify system prerequisites, pull infrastructure Docker images, create environment configuration, and establish project documentation.

---

## ✅ What We've Accomplished

### 1. 📄 Project Research & Documentation

| Deliverable | Status | Description |
|-------------|--------|-------------|
| **Deep Research Report** | ✅ Complete | Comprehensive 13-section report covering architecture, agent design, tech stack, roadmap, and security |
| **README.md** | ✅ Complete | Full project README with architecture diagrams (Mermaid), tech stack table, getting started guide, API overview, 8-week roadmap |
| **PHASE01-ATLAS.md** | ✅ Complete | *(This file)* — Phase tracking document |

### 2. 💻 System Audit — Prerequisites Verified

| Tool | Version | Status |
|------|---------|--------|
| **Java (JDK)** | 21.0.10 | ✅ Installed |
| **Apache Maven** | 3.9.16 | ✅ Installed |
| **Node.js** | v24.16.0 | ✅ Installed |
| **npm** | 11.13.0 | ✅ Installed |
| **Python** | 3.11.9 | ✅ Installed |
| **pip** | 24.0 | ✅ Installed |
| **Docker** | 29.5.3 | ✅ Installed |
| **Git** | 2.45.1 | ✅ Installed |
| **Chrome** | Latest | ✅ Available |

**Result:** `0` new installations needed — everything was already on the system.

### 3. 🐳 Docker Images Pulled

| Image | Purpose | Status |
|-------|---------|--------|
| **postgres:16-alpine** | Primary relational database | ✅ Pulled |
| **redis:7-alpine** | In-memory cache & sessions | ✅ Pulled |
| **confluentinc/cp-kafka:latest** | Event streaming bus | ✅ Pulled |
| **confluentinc/cp-zookeeper:latest** | Kafka coordination | ✅ Pulled |

> **Note:** Used **Confluent** images instead of Bitnami (Bitnami tags were unavailable). The `docker-compose.yml` will use these Confluent image names.

### 4. 🔐 Environment Configuration

| File | Status | Purpose |
|------|--------|---------|
| **`.env`** | ✅ Created | Centralized environment variables (secrets — not committed) |

The `.env` file includes configuration for:
- PostgreSQL connection (user, password, host, port + per-service database names)
- Redis connection
- Kafka bootstrap servers
- JWT authentication (with placeholder secret)
- OpenAI API key (placeholder — needs real key)
- SendGrid email API (placeholder)
- Google Calendar API (placeholder)
- Monitoring ports (Prometheus, Grafana, Jaeger)
- All microservice ports (8081–8087)

### 5. 🏗️ Project Structure (Conceptual)

```
atlasai/                          # Project root
├── deep-research-report.md       # 📄 Research & design document
├── README.md                     # 📘 Full project README
├── PHASE01-ATLAS.md              # 📋 This phase document
├── .env                          # 🔐 Environment secrets (gitignored)
├── services/                     # ⚙️ Backend microservices (to be created)
│   ├── auth-service/             #     🔐 OAuth2/JWT
│   ├── customer-service/         #     📇 CRM
│   ├── workflow-service/         #     🔄 Orchestrator
│   ├── task-service/             #     📋 Tasks
│   ├── notification-service/     #     📧 Email/Calendar
│   ├── search-service/           #     🔎 Vector Search
│   └── ai-agent-service/         #     🤖 Python Agents
├── frontend/                     # 🖥 React/TypeScript (to be created)
└── infra/                        # 🐳 Docker/K8s (to be created)
    └── docker-compose.yml
```

---

## 📋 Accounts Still Needed

Before development can proceed to coding, the following accounts are required:

| Service | Purpose | Sign-Up Link | Priority |
|---------|---------|-------------|----------|
| 🔑 **OpenAI API Key** | LLM calls for AI agents | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | 🔴 **High** — blocks AI agent work |
| 📧 **SendGrid Account** *(optional for now)* | Email sending | [sendgrid.com](https://sendgrid.com) | 🟡 Medium — needed week 5 |
| 📅 **Google Cloud Platform** *(optional for now)* | Calendar API | [console.cloud.google.com](https://console.cloud.google.com) | 🟡 Medium — needed week 5 |

---

## 🚀 What's Next — Phase 02: Project Scaffolding

### Step 1: Create `.gitignore`
- Ignore `.env`, `target/`, `node_modules/`, `__pycache__/`, IDE files, etc.

### Step 2: Create `infra/docker-compose.yml`
- Define services: PostgreSQL, Redis, Kafka, Zookeeper
- Port mappings and volumes
- Health checks

### Step 3: Scaffold Spring Boot Services
Create 6 Maven projects via [start.spring.io](https://start.spring.io) with JDK 21:

| Service | Dependencies | Port |
|---------|-------------|------|
| **auth-service** | Web, Security, OAuth2 Resource Server, JPA, PostgreSQL, Actuator | 8081 |
| **customer-service** | Web, JPA, PostgreSQL, Redis, Kafka, Actuator, Cache | 8082 |
| **workflow-service** | Web, Kafka, Actuator, Retry | 8083 |
| **task-service** | Web, JPA, PostgreSQL, Kafka, Actuator | 8084 |
| **notification-service** | Web, Mail, Kafka, Actuator, Retry | 8085 |
| **search-service** | Web, JPA, PostgreSQL, Actuator | 8086 |

### Step 4: Scaffold Python AI Agent Service
- Create directory structure with `agents/`, `tools/`, `vectordb/` folders
- `requirements.txt` with OpenAI SDK, LangChain, etc.
- Basic Flask/FastAPI app skeleton

### Step 5: Scaffold React Frontend
- `npx create-react-app frontend --template typescript`
- Install dependencies (React Router, Material UI, Axios)

### Step 6: Integration Test — "Hello World" Smoke Test
- Start Docker Compose
- Run one Spring Boot service (e.g., auth-service)
- Verify it connects to PostgreSQL and starts without errors

---

## 📊 Key Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Database** | PostgreSQL 16 via Docker | ACID compliance, pgvector support, no Windows installation |
| **Cache** | Redis 7 via Docker | Industry standard, Spring Cache integration |
| **Event Bus** | Kafka (Confluent) via Docker | Event-driven decoupling, stream processing |
| **LLM Provider** | OpenAI API | Best-in-class function calling for agent tool use |
| **AI Agent Framework** | OpenAI Agents SDK (Python) | Official SDK, native tool calling, minimal boilerplate |
| **Build Tool** | Maven | Already installed, widely adopted for Spring Boot |
| **Java Version** | 21 LTS | Latest LTS, already installed |

---

## 🔗 Related Documents

- [`README.md`](./README.md) — Full project documentation with architecture diagrams
- [`deep-research-report.md`](./deep-research-report.md) — Comprehensive research & design document
- [`.env`](./.env) — Environment variables (placeholders — fill real values)
