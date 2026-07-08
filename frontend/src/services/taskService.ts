import api from './api';

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'EMAIL' | 'MEETING' | 'CALL' | 'FOLLOW_UP' | 'REVIEW';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string | null;
  assignedTo: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  relatedEntityName?: string;
  result?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TaskRequest {
  title: string;
  description?: string;
  type?: string;
  status?: string;
  priority?: string;
  dueDate?: string | null;
  assignedTo?: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  relatedEntityName?: string;
  result?: string;
}

export interface TaskStatusRequest {
  status: string;
}

export interface PaginatedTasks {
  content: Task[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface TaskFilters {
  status?: string;
  type?: string;
  priority?: string;
  assignedTo?: string;
  search?: string;
}

const taskService = {
  getAll: (filters?: TaskFilters & { page?: number; size?: number; sort?: string; direction?: string }) =>
    api.get<PaginatedTasks>('/tasks', { params: filters }).then(r => r.data),

  getById: (id: string) =>
    api.get<Task>(`/tasks/${id}`).then(r => r.data),

  create: (data: TaskRequest) =>
    api.post<Task>('/tasks', data).then(r => r.data),

  update: (id: string, data: TaskRequest) =>
    api.put<Task>(`/tasks/${id}`, data).then(r => r.data),

  updateStatus: (id: string, status: string) =>
    api.put<Task>(`/tasks/${id}/status`, { status } as TaskStatusRequest).then(r => r.data),

  delete: (id: string) =>
    api.delete(`/tasks/${id}`).then(r => r.data),

  getCount: (status?: string) =>
    api.get<number>('/tasks/count', { params: status ? { status } : {} }).then(r => r.data),
};

export default taskService;
