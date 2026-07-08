#!/bin/sh
# ═══════════════════════════════════════════════════════════════════
# AtlasAI Frontend — Docker Entrypoint
# Injects Render backend service URLs into nginx.conf at container
# boot time using environment variables.
# ═══════════════════════════════════════════════════════════════════

set -e

# Default backend URLs (Render assigns service-name.onrender.com)
AUTH_SERVICE_URL="${AUTH_SERVICE_URL:-https://auth-service.onrender.com}"
CUSTOMER_SERVICE_URL="${CUSTOMER_SERVICE_URL:-https://customer-service.onrender.com}"
WORKFLOW_SERVICE_URL="${WORKFLOW_SERVICE_URL:-https://workflow-service.onrender.com}"
TASK_SERVICE_URL="${TASK_SERVICE_URL:-https://task-service.onrender.com}"

# Extract hostnames from URLs (strip protocol and path)
AUTH_SERVICE_HOST="${AUTH_SERVICE_HOST:-$(echo "$AUTH_SERVICE_URL" | sed 's|https\?://||' | sed 's|/.*$||')}"
CUSTOMER_SERVICE_HOST="${CUSTOMER_SERVICE_HOST:-$(echo "$CUSTOMER_SERVICE_URL" | sed 's|https\?://||' | sed 's|/.*$||')}"
WORKFLOW_SERVICE_HOST="${WORKFLOW_SERVICE_HOST:-$(echo "$WORKFLOW_SERVICE_URL" | sed 's|https\?://||' | sed 's|/.*$||')}"
TASK_SERVICE_HOST="${TASK_SERVICE_HOST:-$(echo "$TASK_SERVICE_URL" | sed 's|https\?://||' | sed 's|/.*$||')}"

# Substitute variables into nginx config template
if [ -f /etc/nginx/conf.d/default.conf.template ]; then
  echo "=== AtlasAI Frontend: Substituting backend URLs ==="
  echo "  Auth:      ${AUTH_SERVICE_URL}"
  echo "  Customer:  ${CUSTOMER_SERVICE_URL}"
  echo "  Workflow:  ${WORKFLOW_SERVICE_URL}"
  echo "  Tasks:     ${TASK_SERVICE_URL}"

  export AUTH_SERVICE_URL AUTH_SERVICE_HOST
  export CUSTOMER_SERVICE_URL CUSTOMER_SERVICE_HOST
  export WORKFLOW_SERVICE_URL WORKFLOW_SERVICE_HOST
  export TASK_SERVICE_URL TASK_SERVICE_HOST

  # Only substitute our specific variables — nginx variables ($http_upgrade,
  # $remote_addr, etc.) are left untouched by envsubst's variable list filter
  envsubst '${AUTH_SERVICE_URL} ${AUTH_SERVICE_HOST} ${CUSTOMER_SERVICE_URL} ${CUSTOMER_SERVICE_HOST} ${WORKFLOW_SERVICE_URL} ${WORKFLOW_SERVICE_HOST} ${TASK_SERVICE_URL} ${TASK_SERVICE_HOST}' \
    < /etc/nginx/conf.d/default.conf.template \
    > /etc/nginx/conf.d/default.conf

  echo "=== Nginx config generated ==="
fi

echo "Starting nginx..."
exec nginx -g 'daemon off;'
