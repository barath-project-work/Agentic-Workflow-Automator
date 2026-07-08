import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';
import { handleDemoApiRequest } from './demoApiHandlers';

const api = axios.create({
  baseURL: '/api',
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

// Request interceptor — attach JWT token (skip for public auth endpoints)
api.interceptors.request.use(async (config) => {
  // Check if demo mode is active — if so, intercept and return mock data
  if (useUIStore.getState().demoMode) {
    try {
      const data = await handleDemoApiRequest(config);
      // Return a mock response that Axios will treat as a successful response
      (config as any)._demoResponse = {
        data,
        status: config.method === 'post' ? 201 : 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        config,
      };
      return config;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // Don't attach token for register, login, or refresh — those are public endpoints
  if (
    config.url?.includes('/auth/register') ||
    config.url?.includes('/auth/login') ||
    config.url?.includes('/auth/refresh')
  ) {
    return config;
  }
  const token = localStorage.getItem('atlasai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle demo mode + 401 with token refresh
api.interceptors.response.use(
  (response) => {
    // If this is a demo-mode response, return the intercepted data
    if ((response.config as any)._demoResponse) {
      return (response.config as any)._demoResponse;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the request failed but we have a demo response cached (e.g. network error), use it
    if (originalRequest?._demoResponse) {
      return originalRequest._demoResponse;
    }

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
      const response = await axios.post('/api/auth/refresh', {
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
