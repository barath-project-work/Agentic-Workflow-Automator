// ──────────────────────────────────────────────
// Demo API Handlers — returns mock data instead
// of making real HTTP calls when demo mode is on.
// ──────────────────────────────────────────────

import type { AxiosRequestConfig } from 'axios';
import {
  demoUser,
  demoCustomers,
  demoOpportunities,
  demoWorkflows,
  demoTemplates,
  demoTasks,
  demoAuditLogs,
  demoIntegrations,
  demoApiKeys,
  demoChangelog,
  demoUsers,
} from './mockData';

// Simulate network latency (150-400ms)
function delay(): Promise<void> {
  const ms = 150 + Math.random() * 250;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Extract path segments from the request URL
function parsePath(config: AxiosRequestConfig): { base: string; id?: string; action?: string; params: Record<string, string> } {
  const url = config.url || '';
  const segments = url.replace(/^\/api\//, '').split('/');
  const base = segments[0] || '';
  const id = segments.length > 1 ? segments[1] : undefined;
  const action = segments.length > 2 ? segments[2] : undefined;
  const params: Record<string, string> = {};
  if (config.params) {
    for (const [k, v] of Object.entries(config.params as Record<string, unknown>)) {
      if (v !== undefined && v !== null && v !== '') {
        params[k] = String(v);
      }
    }
  }
  return { base, id, action, params };
}

function paginate<T>(items: T[], page: number, size: number) {
  const start = page * size;
  const content = items.slice(start, start + size);
  return {
    content,
    totalElements: items.length,
    totalPages: Math.ceil(items.length / size),
    number: page,
    size,
  };
}

// ─── Route Handlers ────────────────────────────

const handlers: Record<string, (config: AxiosRequestConfig) => Promise<unknown>> = {};

// ── Auth ──────────────────────────────────────

handlers['auth/login'] = async () => ({
  accessToken: 'demo_access_token_' + Date.now(),
  refreshToken: 'demo_refresh_token_' + Date.now(),
  tokenType: 'Bearer',
  expiresIn: 3600,
  userId: demoUser.id,
  name: demoUser.name,
  email: demoUser.email,
  role: demoUser.role,
});

handlers['auth/register'] = async (config) => {
  const body = JSON.parse(config.data || '{}');
  return {
    accessToken: 'demo_access_token_' + Date.now(),
    refreshToken: 'demo_refresh_token_' + Date.now(),
    tokenType: 'Bearer',
    expiresIn: 3600,
    userId: 'user_demo_' + Date.now(),
    name: body.name || 'New User',
    email: body.email || 'user@demo.com',
    role: 'ROLE_USER',
  };
};

handlers['auth/refresh'] = async () => ({
  accessToken: 'demo_access_token_' + Date.now(),
  refreshToken: 'demo_refresh_token_' + Date.now(),
});

handlers['auth/me'] = async () => demoUser;

handlers['auth/logout'] = async () => ({});

// ── Customers ─────────────────────────────────

handlers['customers'] = async (config) => {
  const { params } = parsePath(config);
  const page = parseInt(params['page'] || '0', 10);
  const size = parseInt(params['size'] || '20', 10);
  let filtered = [...demoCustomers];

  if (params['search']) {
    const s = params['search'].toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.company.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s)
    );
  }
  if (params['status']) {
    filtered = filtered.filter((c) => c.status === params['status']);
  }

  return paginate(filtered, page, size);
};

handlers['customers/count'] = async () => demoCustomers.length;

// Dynamic: /customers/{id}
function handleCustomerById(config: AxiosRequestConfig, id: string) {
  if (config.method === 'get') {
    return delay().then(() => demoCustomers.find((c) => c.id === id) || null);
  }
  if (config.method === 'put') {
    return delay().then(() => ({
      ...demoCustomers.find((c) => c.id === id),
      ...JSON.parse(config.data || '{}'),
      id,
    }));
  }
  if (config.method === 'delete') {
    return delay().then(() => ({}));
  }
  return delay().then(() => demoCustomers[0]);
}

// ── Opportunities ─────────────────────────────

handlers['opportunities'] = async (config) => {
  const { params } = parsePath(config);
  const page = parseInt(params['page'] || '0', 10);
  const size = parseInt(params['size'] || '20', 10);
  let filtered = [...demoOpportunities];

  if (params['stage']) {
    filtered = filtered.filter((o) => o.stage === params['stage']);
  }
  if (params['search']) {
    const s = params['search'].toLowerCase();
    filtered = filtered.filter((o) => o.name.toLowerCase().includes(s));
  }

  return paginate(filtered, page, size);
};

handlers['opportunities/count'] = async () => demoOpportunities.length;

// Dynamic: /opportunities/by-customer/{customerId}
function handleOpportunitiesByCustomer(_config: AxiosRequestConfig, customerId: string) {
  return delay().then(() =>
    demoOpportunities.filter((o) => o.customerId === customerId)
  );
}

function handleOpportunityById(config: AxiosRequestConfig, id: string) {
  if (config.method === 'get') {
    return delay().then(() => demoOpportunities.find((o) => o.id === id) || null);
  }
  if (config.method === 'put') {
    return delay().then(() => ({
      ...demoOpportunities.find((o) => o.id === id),
      ...JSON.parse(config.data || '{}'),
      id,
    }));
  }
  if (config.method === 'delete') {
    return delay().then(() => ({}));
  }
  return delay().then(() => demoOpportunities[0]);
}

// ── Workflows ─────────────────────────────────

handlers['workflows'] = async (config) => {
  const { params } = parsePath(config);
  const page = parseInt(params['page'] || '0', 10);
  const size = parseInt(params['size'] || '20', 10);
  let filtered = [...demoWorkflows];

  if (params['status']) {
    filtered = filtered.filter((w) => w.status === params['status']);
  }

  return paginate(filtered, page, size);
};

handlers['workflows/count'] = async () => demoWorkflows.length;

handlers['workflows/templates'] = async () => demoTemplates;

function handleWorkflowById(config: AxiosRequestConfig, id: string) {
  if (config.method === 'get') {
    return delay().then(() => demoWorkflows.find((w) => w.id === id) || null);
  }
  if (config.method === 'delete') {
    return delay().then(() => ({}));
  }
  return delay().then(() => demoWorkflows[0]);
}

function handleWorkflowCancel(_config: AxiosRequestConfig, id: string) {
  return delay().then(() => ({
    ...demoWorkflows.find((w) => w.id === id),
    id,
    status: 'CANCELLED',
  }));
}

// ── Tasks ─────────────────────────────────────

handlers['tasks'] = async (config) => {
  const { params } = parsePath(config);
  const page = parseInt(params['page'] || '0', 10);
  const size = parseInt(params['size'] || '50', 10);
  let filtered = [...demoTasks];

  if (params['status']) {
    filtered = filtered.filter((t) => t.status === params['status']);
  }
  if (params['type']) {
    filtered = filtered.filter((t) => t.type === params['type']);
  }
  if (params['priority']) {
    filtered = filtered.filter((t) => t.priority === params['priority']);
  }

  return paginate(filtered, page, size);
};

handlers['tasks/count'] = async () => demoTasks.length;

function handleTaskById(config: AxiosRequestConfig, id: string) {
  if (config.method === 'get') {
    return delay().then(() => demoTasks.find((t) => t.id === id) || null);
  }
  if (config.method === 'put') {
    return delay().then(() => ({
      ...demoTasks.find((t) => t.id === id),
      ...JSON.parse(config.data || '{}'),
      id,
    }));
  }
  if (config.method === 'delete') {
    return delay().then(() => ({}));
  }
  return delay().then(() => demoTasks[0]);
}

function handleTaskStatus(config: AxiosRequestConfig, id: string) {
  const body = JSON.parse(config.data || '{}');
  return delay().then(() => ({
    ...demoTasks.find((t) => t.id === id),
    id,
    status: body.status || 'COMPLETED',
  }));
}

// ── Users ─────────────────────────────────────

handlers['users'] = async () => demoUsers;

// ── Admin / Misc ──────────────────────────────

handlers['admin/audit-logs'] = async () => demoAuditLogs;
handlers['admin/integrations'] = async () => demoIntegrations;
handlers['admin/api-keys'] = async () => demoApiKeys;
handlers['admin/changelog'] = async () => demoChangelog;

// ── Help ──────────────────────────────────────

handlers['help/docs'] = async () => [];
handlers['help/changelog'] = async () => demoChangelog;

// ── Main Router ───────────────────────────────

export async function handleDemoApiRequest(config: AxiosRequestConfig): Promise<unknown> {
  await delay();

  const { base, id, action } = parsePath(config);
  const method = config.method || 'get';

  // Handle POST requests (create) — return the request body as the created entity
  if (method === 'post') {
    const body = config.data ? JSON.parse(config.data) : {};
    return {
      ...body,
      id: `${base.slice(0, -1)}_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
  }

  // Exact match first (e.g. "customers/count", "workflows/templates")
  const exactKey = id ? `${base}/${id}` : base;
  if (handlers[exactKey]) {
    return handlers[exactKey](config);
  }

  // Dynamic routes with second-level action (e.g. /workflows/{id}/cancel, /tasks/{id}/status)
  if (id && action) {
    if (action === 'cancel') return handleWorkflowCancel(config, id);
    if (action === 'status') return handleTaskStatus(config, id);
  }

  // CRUD by ID
  if (id) {
    // /opportunities/by-customer/{customerId}
    if (base === 'opportunities' && id === 'by-customer' && action) {
      return handleOpportunitiesByCustomer(config, action);
    }
    // /customers/{id}, /opportunities/{id}, /workflows/{id}, /tasks/{id}
    if (base === 'customers') return handleCustomerById(config, id);
    if (base === 'opportunities') return handleOpportunityById(config, id);
    if (base === 'workflows') return handleWorkflowById(config, id);
    if (base === 'tasks') return handleTaskById(config, id);
  }

  // Fallback — return empty data
  console.warn(`[Demo API] No handler for: ${method.toUpperCase()} /api/${url(config)}`);
  return null;
}

function url(config: AxiosRequestConfig): string {
  let path = config.url || '';
  if (config.params) {
    const qs = Object.entries(config.params as Record<string, unknown>)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&');
    if (qs) path += '?' + qs;
  }
  return path;
}
