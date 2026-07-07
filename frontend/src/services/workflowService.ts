import api from './api';

export interface Workflow {
  id: string;
  goal: string;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED' | 'BLOCKED' | 'CANCELLED';
  requestedBy: string;
  plan: string | null;
  result: string | null;
  stepCount: number;
  stepsCompleted: number;
  steps: WorkflowStep[];
  createdAt: string;
  completedAt: string | null;
}

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  toolName: string;
  description: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
  input: string | null;
  output: string | null;
  errorDetail: string | null;
  duration: string | null;
  createdAt: string;
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

export interface WorkflowRequest {
  goal: string;
  requestedBy?: string;
  parameters?: Record<string, unknown>;
}

export interface PaginatedWorkflows {
  content: Workflow[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface WorkflowFilters {
  status?: string;
  search?: string;
}

const workflowService = {
  getAll: (filters?: WorkflowFilters & { page?: number; size?: number; sort?: string; direction?: string }) =>
    api.get<PaginatedWorkflows>('/workflows', { params: filters }).then(r => r.data),

  getById: (id: string) =>
    api.get<Workflow>(`/workflows/${id}`).then(r => r.data),

  create: (data: WorkflowRequest) =>
    api.post<Workflow>('/workflows', data).then(r => r.data),

  cancel: (id: string) =>
    api.put<Workflow>(`/workflows/${id}/cancel`).then(r => r.data),

  delete: (id: string) =>
    api.delete(`/workflows/${id}`).then(r => r.data),

  getCount: () =>
    api.get<number>('/workflows/count').then(r => r.data),

  getTemplates: () =>
    api.get<WorkflowTemplate[]>('/workflows/templates').then(r => r.data),
};

export default workflowService;
