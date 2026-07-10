import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

// Backend service URLs
const AUTH_SERVICE_URL = 'https://agentic-workflow-automator-production.up.railway.app';
const CUSTOMER_SERVICE_URL = 'https://customer-service-production-0ff7.up.railway.app';
const WORKFLOW_SERVICE_URL = 'https://workflow-service-production.up.railway.app';

/**
 * Routes a request path to the correct backend service base URL.
 * Backend endpoints start with /api/* (e.g. /api/auth/login, /api/customers)
 *
 * Path routing:
 * - /auth/* or /api/auth/* → Auth Service
 * - /customers/*, /opportunities/*, /api/customers/*, /api/opportunities/* → Customer Service
 * - /workflows/*, /tasks/*, /api/workflows/*, /api/tasks/* → Workflow Service
 */
function getBaseUrl(path: string): string {
  const apiPath = path.startsWith('/api') ? path.substring(4) : path;
  if (apiPath.startsWith('/auth')) return AUTH_SERVICE_URL;
  if (apiPath.startsWith('/customers') || apiPath.startsWith('/opportunities')) return CUSTOMER_SERVICE_URL;
  if (apiPath.startsWith('/workflows') || apiPath.startsWith('/tasks')) return WORKFLOW_SERVICE_URL;
  return AUTH_SERVICE_URL; // fallback
}

/**
 * Ensures the path has the /api prefix that all backend endpoints expect.
 * Service files call e.g. api.get('/customers'), this converts to /api/customers.
 */
function ensureApiPrefix(path: string): string {
  if (path.startsWith('/api')) return path;
  return '/api' + path;
}

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track if we're already refreshing to avoid infinite loops
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

// Request interceptor — set backend URL dynamically + attach JWT token
api.interceptors.request.use((config) => {
  const path = config.url || '';

  // Normalize the path with /api prefix
  config.url = ensureApiPrefix(path);

  // Set the baseURL to the correct backend service
  config.baseURL = getBaseUrl(path);

  // Don't attach token for public auth endpoints
  if (path.includes('/auth/register') ||
      path.includes('/auth/login') ||
      path.includes('/auth/refresh')) {
    return config;
  }

  const token = localStorage.getItem('atlasai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401 with token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry if: no error response, not 401, already retried, or it's an auth endpoint
    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/')
    ) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem('atlasai_refresh_token');
    if (!refreshToken) {
      isRefreshing = false;
      useAuthStore.getState().logout();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/refresh`, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      useAuthStore.getState().setTokens(accessToken, newRefreshToken);

      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      useAuthStore.getState().logout();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
