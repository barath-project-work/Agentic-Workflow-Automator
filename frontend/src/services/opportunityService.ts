import api from './api';

export interface Opportunity {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  stage: 'PROSPECT' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
  value: number;
  probability: number;
  closeDate: string | null;
  assignedTo: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityRequest {
  name: string;
  customerId?: string;
  customerName?: string;
  stage?: string;
  value?: number;
  probability?: number;
  closeDate?: string;
  assignedTo?: string;
  description?: string;
}

export interface OpportunityFilters {
  search?: string;
  stage?: string;
  minValue?: number;
  maxValue?: number;
}

const opportunityService = {
  getAll: (filters?: OpportunityFilters) =>
    api.get<Opportunity[]>('/opportunities', { params: filters }).then(r => r.data),

  getById: (id: string) =>
    api.get<Opportunity>(`/opportunities/${id}`).then(r => r.data),

  getByCustomer: (customerId: string) =>
    api.get<Opportunity[]>(`/opportunities/by-customer/${customerId}`).then(r => r.data),

  create: (data: OpportunityRequest) =>
    api.post<Opportunity>('/opportunities', data).then(r => r.data),

  update: (id: string, data: OpportunityRequest) =>
    api.put<Opportunity>(`/opportunities/${id}`, data).then(r => r.data),

  delete: (id: string) =>
    api.delete(`/opportunities/${id}`).then(r => r.data),

  getCount: () =>
    api.get<number>('/opportunities/count').then(r => r.data),
};

export default opportunityService;
