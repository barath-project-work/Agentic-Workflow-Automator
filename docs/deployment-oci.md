# ☁️ Deploy AtlasAI on Oracle Cloud Free Tier

> **Cost:** $0/mo | **Resources:** 2 OCPUs, 12GB RAM, 200GB storage
> **Lasts:** Forever (Oracle's Always Free tier has no expiry)

---

## Overview

This guide walks through deploying all 5 Java microservices + PostgreSQL + Nginx on a single **Oracle Cloud Free Tier** instance using Docker Compose.

**Architecture:**
```
┌─────────────────────────────────────────────────┐
│           Oracle Cloud Free Tier VM             │
│                                                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │Auth  │  │Cust  │  │Work  │  │Task  │  ┌───┐ │
│  │:8081 │  │:8082 │  │:8083 │  │:8084 │  │FE │ │
│  └──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘  │80 │ │
│     │         │         │         │       └─┬─┘ │
│     └─────────┴─────────┴─────────┘         │   │
│                      │                      │   │
│               ┌──────▼──────┐               │   │
│               │ PostgreSQL  │               │   │
│               │   :5432     │               │   │
│               └─────────────┘               │   │
└─────────────────────────────────────────────┘
```

---

## Step 1: Create Your Oracle Cloud Account

1. Go to **[cloud.oracle.com](https://cloud.oracle.com)** → **"Try for free"**
2. Sign up with your email, phone, and credit card (for identity verification only)
3. Wait ~10 minutes for account approval
4. Log in to the **Oracle Cloud Console**

## Step 2: Launch a Free ARM Instance

1. In the Console, go to **Compute → Instances → Create instance**
2. **Name:** `atlasai`
3. **Image:** Select **Oracle Linux 9** (or **Ubuntu 24.04**)
4. **Shape:** Click **"Change shape"** → Select **"Ampere"** → **"VM.Standard.A1.Flex"**
5. **Configure:** Set OCPUs to **2**, Memory to **12 GB**
6. **SSH Keys:** Upload your public SSH key (or generate a new key pair)
7. **Boot volume:** Keep default (usually ~47GB, can resize up to 200GB total)
8. Click **"Create"**

## Step 3: Configure Network Security

1. Go to **Networking → Virtual Cloud Networks** → Click your VCN
2. Click **"Security Lists"** → **"Default Security List"**
3. Click **"Add Ingress Rules"** — Add these:

| Source | Protocol | Port | Purpose |
|--------|----------|------|---------|
| `0.0.0.0/0` | TCP | 80 | HTTP (frontend) |
| `0.0.0.0/0` | TCP | 443 | HTTPS (if using SSL) |
| `0.0.0.0/0` | TCP | 8081-8084 | Direct service access (optional) |

## Step 4: Connect & Set Up

```bash
# SSH into your instance
ssh -i ~/.ssh/your-key opc@<INSTANCE_PUBLIC_IP>

# Update packages
sudo dnf update -y

# Install Git
sudo dnf install -y git

# Clone the repo
git clone https://github.com/barath-project-work/Agentic-Workflow-Automator.git
cd Agentic-Workflow-Automator

# Make the script executable and run it
chmod +x scripts/setup-oracle.sh
./scripts/setup-oracle.sh
```

## Step 5: Configure and Start

```bash
# Copy the example env file and edit it
cp .env.example .env
nano .env

# Set at minimum:
#   JWT_SECRET = (generate with: openssl rand -base64 64)
#   SERVER_IP  = (your instance's public IP)

# Build and start everything
docker compose -f infra/docker-compose.prod.yml up -d

# Check status
docker compose -f infra/docker-compose.prod.yml ps

# Watch logs
docker compose -f infra/docker-compose.prod.yml logs -f
```

## Step 6: Verify Everything Works

```bash
# Test health endpoints
curl http://localhost:8081/actuator/health   # Auth Service
curl http://localhost:8082/actuator/health   # Customer Service
curl http://localhost:8083/actuator/health   # Workflow Service
curl http://localhost:8084/actuator/health   # Task Service
curl http://localhost/health                 # Frontend

# All should return: {"status":"UP"}
```

## Step 7: Access the Frontend

Open `http://<YOUR_INSTANCE_IP>` in your browser.

Click **"Quick Demo Access"** on the login page — the app will work with mock data immediately. To use real data, register a new account.

---

## 📊 Resource Usage Estimates

| Component | RAM | Notes |
|-----------|-----|-------|
| PostgreSQL | ~256MB | Tune shared_buffers |
| Auth Service | ~256MB | Java with -Xmx128m |
| Customer Service | ~256MB | Java with -Xmx128m |
| Workflow Service | ~256MB | Java with -Xmx128m |
| Task Service | ~256MB | Java with -Xmx128m |
| Frontend (Nginx) | ~32MB | Static file serving |
| OS overhead | ~512MB | |
| **Total** | **~1.8GB** | Leaves ~10GB free |

> **Tip:** You can adjust Java heap sizes in each service's Dockerfile by adding
> `-Xmx128m` to the `ENTRYPOINT`:
> `ENTRYPOINT ["java", "-Xmx128m", "-jar", "/app/app.jar"]`

---

## 🛡️ Keeping the Instance Active

Oracle may reclaim idle resources if utilization is below 20% for 7 days. With 5 microservices + PostgreSQL running, your baseline load will **easily exceed this threshold naturally**.

If you're worried, add this simple keep-alive cron job:
```bash
# Ping the services every hour to show activity
echo "*/30 * * * * curl -s http://localhost/health > /dev/null" | crontab -
```

---

## 🔐 Setting Up SSL (Optional)

If you have a domain name:

```bash
# Install certbot
sudo dnf install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Set up auto-renewal
echo "0 0 * * * certbot renew --quiet" | crontab -
```

---

## 🛑 Stopping / Updating

```bash
# Stop all services
docker compose -f infra/docker-compose.prod.yml down

# Update from GitHub
git pull origin main

# Rebuild and restart
docker compose -f infra/docker-compose.prod.yml up -d --build

# View logs
docker compose -f infra/docker-compose.prod.yml logs -f
```

---

## Support

If you run into issues, check:
- `docker compose logs` for container errors
- [Oracle Cloud Free Tier Docs](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier.htm)
- The project's [Debugging Guide](Debugging.md)
