import api from './api';

export interface Customer {
  id: string;
  name: string;
  company: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  contactPerson: string;
  lastContacted: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'LEAD';
  tags: string;
  notes: string;
  website: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerRequest {
  name: string;
  company: string;
  industry?: string;
  location?: string;
  email?: string;
  phone?: string;
  contactPerson?: string;
  lastContacted?: string;
  status?: string;
  tags?: string;
  notes?: string;
  website?: string;
}

export interface CustomerFilters {
  search?: string;
  industry?: string;
  location?: string;
  status?: string;
  daysSinceContact?: number;
}

const customerService = {
  getAll: (filters?: CustomerFilters) =>
    api.get<Customer[]>('/customers', { params: filters }).then(r => r.data),

  getById: (id: string) =>
    api.get<Customer>(`/customers/${id}`).then(r => r.data),

  create: (data: CustomerRequest) =>
    api.post<Customer>('/customers', data).then(r => r.data),

  update: (id: string, data: CustomerRequest) =>
    api.put<Customer>(`/customers/${id}`, data).then(r => r.data),

  delete: (id: string) =>
    api.delete(`/customers/${id}`).then(r => r.data),

  getCount: () =>
    api.get<number>('/customers/count').then(r => r.data),
};

export default customerService;
