// ──────────────────────────────────────────────
// AtlasAI — Mock Data for Frontend Development
// All data is dummy/simulated. No API calls needed.
// ──────────────────────────────────────────────

import { addDays, subDays } from 'date-fns';

// ─── Types ────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_MANAGER' | 'ROLE_ADMIN';
  avatar?: string;
  jobTitle: string;
  phone: string;
  bio: string;
  createdAt: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  contactPerson: string;
  lastContacted: string;
  status: 'active' | 'inactive' | 'lead';
  tags: string[];
  notes: string;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  stage: 'PROSPECT' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
  value: number;
  probability: number;
  closeDate: string;
  assignedTo: string;
  description: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'EMAIL' | 'MEETING' | 'CALL' | 'FOLLOW_UP' | 'REVIEW';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  assignedTo: string;
  relatedEntityType?: 'workflow' | 'customer' | 'opportunity';
  relatedEntityId?: string;
  relatedEntityName?: string;
  result?: string;
  createdAt: string;
}

export interface Workflow {
  id: string;
  goal: string;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED' | 'BLOCKED' | 'CANCELLED';
  requestedBy: string;
  steps: WorkflowStep[];
  result?: string;
  createdAt: string;
  completedAt?: string;
}

export interface WorkflowStep {
  id: number;
  tool: string;
  description: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  input?: string;
  output?: string;
  duration?: string;
}

export interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: number;
  popular: boolean;
  useCount: number;
}

export interface Notification {
  id: string;
  type: 'workflow' | 'task' | 'email' | 'meeting' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  timestamp: string;
}

export interface MetricCard {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  features: string[];
  fixes: string[];
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

// ─── Generators ──────────────────────────────

const industries = ['Healthcare', 'Finance', 'Technology', 'Manufacturing', 'Retail', 'Education', 'Real Estate', 'Energy', 'Media', 'Logistics'];
const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Chandigarh'];
const companies = ['Acme Corp', 'Globex Inc', 'Initech', 'Hooli', 'Stark Industries', 'Wayne Enterprises', 'Oscorp', 'Cyberdyne', 'Umbrella Corp', 'Wonka Industries', 'Massive Dynamic', 'Soylent Corp'];
const firstNames = ['Rahul', 'Priya', 'Amit', 'Sunita', 'Vikram', 'Anjali', 'Rajesh', 'Deepa', 'Sandeep', 'Neha', 'Arun', 'Kavita', 'Manoj', 'Pooja', 'Vivek', 'Shweta', 'Ravi', 'Meera', 'Sanjay', 'Nandini'];
const lastNames = ['Sharma', 'Verma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Reddy', 'Joshi', 'Nair', 'Menon', 'Iyer', 'Desai', 'Rao', 'Choudhury', 'Malhotra', 'Saxena', 'Bhatt', 'Pillai', 'Kohli', 'Mehta'];
const goals = [
  'Follow up with healthcare leads in Chennai',
  'Send promotional campaign to tech startups in Bangalore',
  'Schedule quarterly review meetings with top 10 clients',
  'Re-engage dormant leads from last quarter',
  'Welcome email sequence for new educational institution clients',
  'Cross-sell campaign to existing manufacturing clients',
  'Follow up on pending proposals in Mumbai region',
  'Annual check-in with all enterprise customers',
  'Product launch announcement to media industry contacts',
  'Renewal reminders for expiring contracts',
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomItems<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}

function randomId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 10)}`;
}

function randomDate(startDays: number, endDays: number): string {
  const d = addDays(new Date(), startDays + Math.floor(Math.random() * (endDays - startDays)));
  return d.toISOString();
}

// ─── Demo User ────────────────────────────────

export const demoUser: User = {
  id: 'user_demo_001',
  name: 'Arjun Mehta',
  email: 'arjun@atlasai.com',
  role: 'ROLE_ADMIN',
  jobTitle: 'Sales Director',
  phone: '+91 98765 43210',
  bio: 'Sales professional with 10+ years experience in enterprise SaaS sales. Passionate about leveraging AI to automate repetitive sales tasks.',
  createdAt: '2025-01-15T00:00:00Z',
  lastLogin: new Date().toISOString(),
  status: 'active',
};

export const demoUsers: User[] = [
  demoUser,
  { id: 'user_002', name: 'Priya Sharma', email: 'priya@atlasai.com', role: 'ROLE_MANAGER', jobTitle: 'Sales Manager', phone: '+91 98765 43211', bio: 'Managing a team of 8 sales reps.', createdAt: '2025-02-01T00:00:00Z', lastLogin: subDays(new Date(), 1).toISOString(), status: 'active' },
  { id: 'user_003', name: 'Vikram Patel', email: 'vikram@atlasai.com', role: 'ROLE_USER', jobTitle: 'Senior Sales Rep', phone: '+91 98765 43212', bio: 'Top performer Q1 2026.', createdAt: '2025-03-10T00:00:00Z', lastLogin: subDays(new Date(), 0).toISOString(), status: 'active' },
  { id: 'user_004', name: 'Anjali Reddy', email: 'anjali@atlasai.com', role: 'ROLE_USER', jobTitle: 'Sales Rep', phone: '+91 98765 43213', bio: 'New join, focused on healthcare vertical.', createdAt: '2025-06-01T00:00:00Z', lastLogin: subDays(new Date(), 2).toISOString(), status: 'active' },
  { id: 'user_005', name: 'Rajesh Kumar', email: 'rajesh@atlasai.com', role: 'ROLE_MANAGER', jobTitle: 'Regional Sales Manager', phone: '+91 98765 43214', bio: 'Managing South India region.', createdAt: '2024-11-20T00:00:00Z', lastLogin: subDays(new Date(), 3).toISOString(), status: 'active' },
  { id: 'user_006', name: 'Deepa Iyer', email: 'deepa@atlasai.com', role: 'ROLE_ADMIN', jobTitle: 'System Administrator', phone: '+91 98765 43215', bio: 'Manages platform configuration and integrations.', createdAt: '2024-08-15T00:00:00Z', lastLogin: subDays(new Date(), 0).toISOString(), status: 'active' },
  { id: 'user_007', name: 'Sanjay Gupta', email: 'sanjay@atlasai.com', role: 'ROLE_USER', jobTitle: 'Sales Rep', phone: '+91 98765 43216', bio: 'Focusing on enterprise accounts.', createdAt: '2025-04-05T00:00:00Z', lastLogin: subDays(new Date(), 5).toISOString(), status: 'inactive' },
];

// ─── Customers ────────────────────────────────

export const demoCustomers: Customer[] = Array.from({ length: 24 }, (_, i) => ({
  id: `cust_${String(i + 1).padStart(3, '0')}`,
  name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
  company: companies[i % companies.length],
  industry: industries[i % industries.length],
  location: locations[i % locations.length],
  email: `contact@${companies[i % companies.length].toLowerCase().replace(/\s/g, '')}.com`,
  phone: `+91 ${90000 + i * 111}`,
  contactPerson: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
  lastContacted: randomDate(-60, 0),
  status: i % 5 === 0 ? 'inactive' : i % 7 === 0 ? 'lead' : 'active',
  tags: randomItems(['vip', 'enterprise', 'startup', 'renewal', 'hot-lead', 'long-term'], 2),
  notes: i % 3 === 0 ? 'Key account — schedule quarterly review.' : '',
  createdAt: randomDate(-365, -30),
}));

// ─── Opportunities ────────────────────────────

const stageNames = ['PROSPECT', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'] as const;

export const demoOpportunities: Opportunity[] = Array.from({ length: 18 }, (_, i) => {
  const customer = demoCustomers[i % demoCustomers.length];
  const stage = stageNames[i % stageNames.length];
  return {
    id: `opp_${String(i + 1).padStart(3, '0')}`,
    name: `${customer.company} — ${['Q4 Platform Deal', 'Annual Renewal', 'Enterprise License', 'Consulting Engagement', 'SaaS Subscription', 'Implementation Project'][i % 6]}`,
    customerId: customer.id,
    customerName: customer.company,
    stage,
    value: Math.round(Math.random() * 5000000 + 500000),
    probability: stage === 'WON' ? 100 : stage === 'LOST' ? 0 : Math.round(Math.random() * 70 + 20),
    closeDate: randomDate(-30, 90),
    assignedTo: randomItem(demoUsers).id,
    description: `Deal with ${customer.company} in the ${customer.industry} sector.`,
    createdAt: randomDate(-120, -10),
  };
});

// ─── Workflows ────────────────────────────────

export const demoWorkflows: Workflow[] = Array.from({ length: 8 }, (_, i) => {
  const steps: WorkflowStep[] = [
    { id: 1, tool: 'search_customers', description: 'Search for matching leads in CRM', status: 'COMPLETED', input: '{"industry":"Healthcare","location":"Chennai","minDaysSinceContact":10}', output: 'Found 12 matching customers', duration: '1.2s' },
    { id: 2, tool: 'send_email', description: 'Send personalized follow-up emails', status: 'COMPLETED', input: '{"template":"follow_up_v2","count":12}', output: '12 emails sent, 0 failed', duration: '4.5s' },
    { id: 3, tool: 'schedule_meeting', description: 'Schedule meetings with interested leads', status: i < 3 ? 'COMPLETED' : i < 5 ? 'RUNNING' : 'PENDING', input: '{"maxMeetings":5}', output: i < 3 ? '3 meetings scheduled' : undefined, duration: i < 3 ? '3.1s' : undefined },
    { id: 4, tool: 'update_crm_record', description: 'Update CRM with latest contact activity', status: i < 3 ? 'COMPLETED' : 'PENDING', input: '{"fields":["lastContacted","status"]}', output: i < 3 ? '12 records updated' : undefined, duration: i < 3 ? '2.0s' : undefined },
    { id: 5, tool: 'generate_report', description: 'Generate workflow summary report', status: i < 3 ? 'COMPLETED' : 'PENDING', input: '{"format":"summary"}', output: i < 3 ? 'Report saved' : undefined, duration: i < 3 ? '1.8s' : undefined },
  ];

  const statuses: Workflow['status'][] = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'RUNNING', 'RUNNING', 'FAILED', 'BLOCKED', 'COMPLETED'];

  return {
    id: `wf_${String(i + 1).padStart(3, '0')}`,
    goal: goals[i % goals.length],
    status: statuses[i],
    requestedBy: randomItem(demoUsers).id,
    steps,
    result: statuses[i] === 'COMPLETED' ? '✅ 12 emails sent, 3 meetings scheduled, 12 CRM records updated' : undefined,
    createdAt: randomDate(-30, -1),
    completedAt: statuses[i] === 'COMPLETED' ? randomDate(-28, 0) : undefined,
  };
});

// ─── Workflow Templates ───────────────────────

export const demoTemplates: WorkflowTemplate[] = [
  { id: 'tpl_001', title: 'Lead Follow-Up', description: 'Automated follow-up sequence for new leads', category: 'Lead Generation', steps: 4, popular: true, useCount: 128 },
  { id: 'tpl_002', title: 'Campaign Outreach', description: 'Send promotional emails to targeted segments', category: 'Marketing', steps: 3, popular: true, useCount: 94 },
  { id: 'tpl_003', title: 'Meeting Scheduling', description: 'Schedule meetings with interested prospects', category: 'Sales', steps: 3, popular: true, useCount: 76 },
  { id: 'tpl_004', title: 'Quarterly Review', description: 'Prepare and send quarterly review reports to clients', category: 'Reporting', steps: 5, popular: false, useCount: 45 },
  { id: 'tpl_005', title: 'Contract Renewal', description: 'Automate renewal reminders and follow-ups', category: 'Sales', steps: 4, popular: false, useCount: 62 },
  { id: 'tpl_006', title: 'Cross-Sell Campaign', description: 'Identify cross-sell opportunities and reach out', category: 'Upsell', steps: 4, popular: false, useCount: 38 },
];

// ─── Tasks ────────────────────────────────────

export const demoTasks: Task[] = Array.from({ length: 16 }, (_, i) => {
  const types: Task['type'][] = ['EMAIL', 'MEETING', 'CALL', 'FOLLOW_UP', 'REVIEW'];
  const statuses: Task['status'][] = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'COMPLETED', 'COMPLETED', 'PENDING', 'IN_PROGRESS', 'FAILED', 'PENDING', 'COMPLETED', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'PENDING', 'COMPLETED', 'SKIPPED'];
  const priorities: Task['priority'][] = ['HIGH', 'MEDIUM', 'LOW'];
  const customer = demoCustomers[i % demoCustomers.length];
  return {
    id: `task_${String(i + 1).padStart(3, '0')}`,
    title: `${['Send follow-up email', 'Schedule product demo', 'Call for feedback', 'Send proposal', 'Review contract', 'Follow up on quote', 'Schedule kickoff', 'Send thank you note', 'Quarterly review', 'Check in on support', 'Renewal discussion', 'Send case study', 'Introduction call', 'Price negotiation', 'Contract signing', 'Post-sale onboarding'][i]}`,
    description: `Task related to ${customer.company} — ${['send personalized email', 'schedule 30-min demo', 'discuss requirements', 'send updated proposal', 'review terms and conditions', 'follow up on sent quote', 'schedule project kickoff', 'thank for recent meeting', 'prepare quarterly report', 'check support satisfaction', 'discuss renewal options', 'share relevant case study', 'introduce to team', 'negotiate final pricing', 'finalize contract', 'onboard new customer'][i]}.`,
    type: types[i % 5],
    status: statuses[i],
    priority: priorities[i % 3],
    dueDate: statuses[i] === 'COMPLETED' ? randomDate(-10, -1) : randomDate(0, 14),
    assignedTo: randomItem(demoUsers).id,
    relatedEntityType: i % 2 === 0 ? 'customer' : i % 3 === 0 ? 'workflow' : 'opportunity',
    relatedEntityId: customer.id,
    relatedEntityName: customer.company,
    result: statuses[i] === 'COMPLETED' ? 'Successfully completed.' : statuses[i] === 'FAILED' ? 'Failed due to invalid contact info.' : undefined,
    createdAt: randomDate(-20, -2),
  };
});

// ─── Notifications ────────────────────────────

export const demoNotifications: Notification[] = [
  { id: 'notif_001', type: 'workflow', title: 'Workflow Completed', message: 'Lead follow-up workflow completed successfully — 12 emails sent.', read: false, createdAt: subDays(new Date(), 0).toISOString() },
  { id: 'notif_002', type: 'task', title: 'New Task Assigned', message: 'Follow up with Acme Corp — due in 2 days.', read: false, createdAt: subDays(new Date(), 0).toISOString() },
  { id: 'notif_003', type: 'email', title: 'Email Bounced', message: 'Email to contact@example.com bounced — invalid address.', read: true, createdAt: subDays(new Date(), 1).toISOString() },
  { id: 'notif_004', type: 'meeting', title: 'Meeting Confirmed', message: 'Meeting with Stark Industries confirmed for Friday 3 PM.', read: false, createdAt: subDays(new Date(), 1).toISOString() },
  { id: 'notif_005', type: 'workflow', title: 'Workflow Failed', message: 'Campaign outreach workflow failed — API quota exceeded.', read: true, createdAt: subDays(new Date(), 2).toISOString() },
  { id: 'notif_006', type: 'system', title: 'Integration Disconnected', message: 'SendGrid API connection lost — reauthorization required.', read: true, createdAt: subDays(new Date(), 3).toISOString() },
  { id: 'notif_007', type: 'task', title: 'Task Overdue', message: 'Call for feedback with Globex Inc is overdue.', read: false, createdAt: subDays(new Date(), 0).toISOString() },
  { id: 'notif_008', type: 'workflow', title: 'Workflow Started', message: 'Quarterly review workflow started for 5 enterprise clients.', read: false, createdAt: subDays(new Date(), 0).toISOString() },
];

// ─── Audit Logs ───────────────────────────────

export const demoAuditLogs: AuditLog[] = Array.from({ length: 20 }, (_, i) => ({
  id: `audit_${String(i + 1).padStart(3, '0')}`,
  actor: randomItem(demoUsers).name,
  action: randomItem(['LOGIN', 'WORKFLOW_START', 'WORKFLOW_COMPLETE', 'TOOL_CALL', 'EMAIL_SENT', 'CUSTOMER_UPDATE', 'TASK_COMPLETE', 'USER_CREATE', 'SETTINGS_CHANGE']),
  entityType: randomItem(['WORKFLOW', 'CUSTOMER', 'TASK', 'USER', 'SETTINGS']),
  entityId: `entity_${i}`,
  details: randomItem(['Started new workflow', 'Updated customer record', 'Completed task', 'Modified system settings', 'Created new user', 'Sent email campaign', 'Called CRM search tool']),
  timestamp: subDays(new Date(), i).toISOString(),
}));

// ─── Integrations ─────────────────────────────

export const demoIntegrations: Integration[] = [
  { id: 'int_001', name: 'SendGrid', description: 'Transactional email delivery', icon: '📧', status: 'connected', lastSync: subDays(new Date(), 0).toISOString() },
  { id: 'int_002', name: 'Google Calendar', description: 'Meeting scheduling and availability', icon: '📅', status: 'connected', lastSync: subDays(new Date(), 1).toISOString() },
  { id: 'int_003', name: 'Slack', description: 'Team notifications and alerts', icon: '💬', status: 'disconnected', lastSync: undefined },
  { id: 'int_004', name: 'HubSpot CRM', description: 'Two-way CRM sync', icon: '🔄', status: 'connected', lastSync: subDays(new Date(), 0).toISOString() },
  { id: 'int_005', name: 'Twilio', description: 'SMS and WhatsApp messaging', icon: '📱', status: 'error', lastSync: subDays(new Date(), 5).toISOString() },
  { id: 'int_006', name: 'Microsoft Teams', description: 'Meeting and chat integration', icon: '💼', status: 'disconnected', lastSync: undefined },
];

// ─── Changelog ────────────────────────────────

export const demoChangelog: ChangelogEntry[] = [
  { version: '2.1.0', date: '2026-06-28', features: ['AI-powered email personalization', 'New analytics dashboard', 'Dark mode support', 'Batch customer import'], fixes: ['Fixed workflow timeout issue', 'Resolved Redis cache eviction bug'] },
  { version: '2.0.0', date: '2026-06-01', features: ['Multi-agent orchestrator', 'pgvector semantic search', 'Role-based access control', 'Audit log viewer'], fixes: ['Fixed JWT refresh token expiration', 'Resolved Kafka consumer group conflict'] },
  { version: '1.3.0', date: '2026-05-15', features: ['Workflow templates library', 'Google Calendar integration', 'Email template editor', 'Task Kanban board'], fixes: ['Fixed date picker timezone issue'] },
  { version: '1.2.0', date: '2026-04-20', features: ['Customer import from CSV', 'Bulk email campaigns', 'Notification preferences'], fixes: ['Fixed pagination on large datasets', 'Resolved OAuth redirect loop'] },
  { version: '1.1.0', date: '2026-03-25', features: ['Workflow execution timeline', 'Customer 360 view', 'API key management', 'Webhook support'], fixes: ['Fixed 500 error on login', 'Resolved memory leak in agent service'] },
  { version: '1.0.0', date: '2026-03-01', features: ['Initial public release', 'JWT authentication', 'Basic workflow automation', 'CRM integration', 'Email sending'], fixes: [] },
];

// ─── API Keys ─────────────────────────────────

export const demoApiKeys: ApiKey[] = [
  { id: 'apikey_001', name: 'Production API Key', prefix: 'atl_sk_abc', created: '2026-03-01', lastUsed: subDays(new Date(), 0).toISOString(), status: 'active' },
  { id: 'apikey_002', name: 'Staging API Key', prefix: 'atl_sk_def', created: '2026-03-15', lastUsed: subDays(new Date(), 2).toISOString(), status: 'active' },
  { id: 'apikey_003', name: 'Development Key', prefix: 'atl_sk_ghi', created: '2026-04-01', lastUsed: subDays(new Date(), 10).toISOString(), status: 'active' },
  { id: 'apikey_004', name: 'Old Integration Key', prefix: 'atl_sk_jkl', created: '2026-01-10', lastUsed: subDays(new Date(), 60).toISOString(), status: 'revoked' },
];

// ─── Dashboard Metrics ────────────────────────

export const demoMetrics: MetricCard[] = [
  { label: 'Active Workflows', value: '5', change: 12, changeLabel: 'vs last week', icon: 'workflow', color: '#E23744' },
  { label: 'Tasks Completed', value: '48', change: 8, changeLabel: 'vs last week', icon: 'task', color: '#1BA672' },
  { label: 'Emails Sent', value: '342', change: 24, changeLabel: 'vs last week', icon: 'email', color: '#4A90D9' },
  { label: 'Meetings Scheduled', value: '18', change: -3, changeLabel: 'vs last week', icon: 'calendar', color: '#F7A83E' },
  { label: 'Conversion Rate', value: '24%', change: 5, changeLabel: 'vs last month', icon: 'chart', color: '#9B59B6' },
  { label: 'Active Customers', value: '128', change: 16, changeLabel: 'new this month', icon: 'people', color: '#2ECC71' },
];

// ─── Weekly Activity Data ─────────────────────

export const weeklyActivity = [
  { day: 'Mon', workflows: 3, emails: 45, meetings: 2 },
  { day: 'Tue', workflows: 5, emails: 62, meetings: 4 },
  { day: 'Wed', workflows: 4, emails: 58, meetings: 3 },
  { day: 'Thu', workflows: 7, emails: 71, meetings: 5 },
  { day: 'Fri', workflows: 6, emails: 53, meetings: 3 },
  { day: 'Sat', workflows: 2, emails: 12, meetings: 1 },
  { day: 'Sun', workflows: 1, emails: 8, meetings: 0 },
];

// ─── Pipeline Data ────────────────────────────

export const pipelineData = [
  { stage: 'Prospect', count: 45, value: 4500000 },
  { stage: 'Qualified', count: 28, value: 3200000 },
  { stage: 'Proposal', count: 15, value: 2100000 },
  { stage: 'Negotiation', count: 8, value: 1400000 },
  { stage: 'Won', count: 12, value: 1800000 },
];

// ─── Agent Performance Data ───────────────────

export const agentPerformance = [
  { agent: 'Orchestrator', successRate: 94, avgDuration: '45s', tasksCompleted: 156 },
  { agent: 'CRM Agent', successRate: 98, avgDuration: '2.1s', tasksCompleted: 423 },
  { agent: 'Email Agent', successRate: 92, avgDuration: '4.5s', tasksCompleted: 287 },
  { agent: 'Calendar Agent', successRate: 88, avgDuration: '3.2s', tasksCompleted: 134 },
  { agent: 'RAG Agent', successRate: 96, avgDuration: '1.8s', tasksCompleted: 89 },
];

// ─── Helper Functions ─────────────────────────

export function getCustomerById(id: string): Customer | undefined {
  return demoCustomers.find(c => c.id === id);
}

export function getOpportunitiesByCustomer(customerId: string): Opportunity[] {
  return demoOpportunities.filter(o => o.customerId === customerId);
}

export function getTasksByCustomer(customerId: string): Task[] {
  return demoTasks.filter(t => t.relatedEntityId === customerId);
}

export function getWorkflowsByUser(userId: string): Workflow[] {
  return demoWorkflows.filter(w => w.requestedBy === userId);
}

export function getTasksByUser(userId: string): Task[] {
  return demoTasks.filter(t => t.assignedTo === userId);
}

export function getUserById(id: string): User | undefined {
  return demoUsers.find(u => u.id === id);
}

export { randomDate, randomId };
