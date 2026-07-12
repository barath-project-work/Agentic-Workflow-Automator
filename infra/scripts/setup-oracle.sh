#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# AtlasAI — Oracle Cloud Setup Script
# Run this ONCE on a fresh Oracle Cloud Free Tier instance.
# Installs Docker, Docker Compose, and clones the project.
#
# Usage: chmod +x infra/scripts/setup-oracle.sh && ./infra/scripts/setup-oracle.sh
# ═══════════════════════════════════════════════════════════════════

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        AtlasAI — Oracle Cloud Setup                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# ─── Store the actual user ─────────────────────
ACTUAL_USER=$(who am i | awk '{print $1}' || echo "$SUDO_USER" || echo "opc")
echo "📋 Running as: $(whoami) (actual user: ${ACTUAL_USER})"

# ─── Detect OS ──────────────────────────────────
if [ -f /etc/oracle-release ]; then
  OS="oracle"
elif [ -f /etc/os-release ]; then
  . /etc/os-release
  OS=$ID
else
  OS="unknown"
fi
echo "📋 Detected OS: ${OS}"

# ─── System Update ──────────────────────────────
echo ""
echo "📦 Updating system packages..."
case $OS in
  oracle|rhel|centos)
    sudo dnf update -y
    sudo dnf install -y curl wget git yum-utils
    ;;
  ubuntu|debian)
    sudo apt-get update -y
    sudo apt-get install -y curl wget git ca-certificates
    ;;
  *)
    echo "⚠️  Unknown OS. Please install Docker manually."
    exit 1
    ;;
esac

# ─── Configure Firewall ─────────────────────────
echo ""
echo "🔓 Opening ports 80, 443, and 8081-8084..."
case $OS in
  oracle|rhel|centos)
    sudo firewall-cmd --permanent --add-service=http 2>/dev/null || true
    sudo firewall-cmd --permanent --add-service=https 2>/dev/null || true
    sudo firewall-cmd --permanent --add-port=8081-8084/tcp 2>/dev/null || true
    sudo firewall-cmd --reload 2>/dev/null || true
    ;;
  ubuntu|debian)
    if command -v ufw &> /dev/null; then
      sudo ufw allow 80/tcp
      sudo ufw allow 443/tcp
      sudo ufw allow 8081:8084/tcp
    fi
    ;;
esac

# ─── Remove podman conflict (Oracle Linux) ──────
echo ""
echo "🐳 Checking for conflicting container runtimes..."
if command -v podman &> /dev/null; then
  echo "   ⚠️  Podman detected — removing to avoid conflict with Docker..."
  sudo dnf remove -y podman podman-docker 2>/dev/null || true
fi

# ─── Install Docker ─────────────────────────────
echo ""
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
  case $OS in
    oracle)
      # Oracle Linux — use the official docker-ce repo (RHEL-compatible)
      sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
      sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
      ;;
    rhel|centos)
      sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
      sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
      ;;
    ubuntu|debian)
      sudo install -m 0755 -d /etc/apt/keyrings
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
      echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      sudo apt-get update -y
      sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
      ;;
  esac
  sudo systemctl enable docker
  sudo systemctl start docker
  echo "   ✅ Docker installed"
else
  echo "   ✅ Docker already installed ($(docker --version))"
fi

# ─── Add User to Docker Group ───────────────────
echo ""
echo "👤 Adding ${ACTUAL_USER} to docker group..."
sudo usermod -aG docker ${ACTUAL_USER}
echo "   ✅ User '${ACTUAL_USER}' added to docker group"
echo "   ⚠️  Log out and back in (or run 'newgrp docker') for this to take effect."

# ─── Verify Docker Compose ──────────────────────
echo ""
echo "📦 Checking Docker Compose..."
if docker compose version &> /dev/null; then
  echo "   ✅ Docker Compose plugin available ($(docker compose version --short))"
elif command -v docker-compose &> /dev/null; then
  echo "   ✅ Docker Compose standalone available ($(docker-compose --version))"
else
  echo "   ⚠️  docker compose not found — installing plugin..."
  DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
  mkdir -p $DOCKER_CONFIG/cli-plugins
  sudo curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/libexec/docker/cli-plugins/docker-compose 2>/dev/null || \
    sudo curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose
  echo "   ✅ Docker Compose installed"
fi

# ─── Repository already cloned ──────────────────
echo ""
echo "📂 Repository: $(basename $(pwd))"
echo "   ✅ Repository ready (you're in it!)"

# ─── Create .env if missing ─────────────────────
if [ ! -f .env ]; then
  echo ""
  echo "📝 Creating .env from .env.example..."
  cp .env.example .env
  # Generate a random JWT secret
  JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
  if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "s/change-this-to-a-long-random-string-at-least-32-chars/$JWT_SECRET/" .env
  else
    sed -i "s/change-this-to-a-long-random-string-at-least-32-chars/$JWT_SECRET/" .env
  fi
  echo "   ✅ .env created with random JWT_SECRET"
  echo "   ⚠️  Edit .env to set your SERVER_IP before deploying!"
else
  echo ""
  echo "   ✅ .env already exists"
fi

# ─── Summary ────────────────────────────────────
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "YOUR_SERVER_IP")

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║            ✅ Setup Complete!                               ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║                                                              ║"
echo "║  Next steps:                                                 ║"
echo "║                                                              ║"
echo "║  1. Log out and back in (to enable docker group):            ║"
echo "║     exit && ssh ...                                          ║"
echo "║                                                              ║"
echo "║  2. Edit .env with your values:                              ║"
echo "║     nano .env                                                ║"
echo "║                                                              ║"
echo "║  3. Build and start all services:                            ║"
echo "║     docker compose -f infra/docker-compose.prod.yml up -d    ║"
echo "║                                                              ║"
echo "║  4. Check service health:                                    ║"
echo "║     docker compose -f infra/docker-compose.prod.yml ps       ║"
echo "║                                                              ║"
echo "║  5. Open your browser to:                                    ║"
echo "║     http://${SERVER_IP}                                      ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
