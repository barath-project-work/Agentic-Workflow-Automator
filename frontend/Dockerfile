# ═══════════════════════════════════════════════════════════════════
# Stage 1: Build the Vite + React frontend
# ═══════════════════════════════════════════════════════════════════
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files first (for better layer caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --frozen-lockfile || npm install

# Copy the rest of the source code
COPY tsconfig.json tsconfig.node.json vite.config.ts ./
COPY index.html ./
COPY public/ public/
COPY src/ src/

# Build the app (runs tsc && vite build)
RUN npm run build

# ═══════════════════════════════════════════════════════════════════
# Stage 2: Serve with Nginx
# ═══════════════════════════════════════════════════════════════════
FROM nginx:stable-alpine

# Install envsubst (part of gettext) for template variable substitution
RUN apk add --no-cache gettext

# Copy nginx config template (env vars substituted at boot via entrypoint)
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

# Also copy static nginx.conf as fallback (used when env vars aren't set)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Use entrypoint that substitutes backend URLs at boot time
ENTRYPOINT ["/docker-entrypoint.sh"]
