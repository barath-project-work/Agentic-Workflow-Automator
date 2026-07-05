import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import opportunityService, { OpportunityRequest, OpportunityFilters } from '../services/opportunityService';

export function useOpportunities(filters?: OpportunityFilters) {
  return useQuery({
    queryKey: ['opportunities', filters],
    queryFn: async () => {
      const response = await opportunityService.getAll(filters);
      return response.content;
    },
    staleTime: 30_000,
  });
}

export function useOpportunitiesPaginated(filters?: OpportunityFilters & { page?: number; size?: number; sort?: string; direction?: string }) {
  return useQuery({
    queryKey: ['opportunities', 'paginated', filters],
    queryFn: () => opportunityService.getAll(filters),
    staleTime: 30_000,
  });
}

export function useOpportunity(id: string) {
  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: () => opportunityService.getById(id),
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useOpportunitiesByCustomer(customerId: string) {
  return useQuery({
    queryKey: ['opportunities', 'customer', customerId],
    queryFn: () => opportunityService.getByCustomer(customerId),
    enabled: !!customerId,
    staleTime: 30_000,
  });
}

export function useCreateOpportunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OpportunityRequest) => opportunityService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
  });
}

export function useUpdateOpportunity(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OpportunityRequest) => opportunityService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['opportunity', id] });
    },
  });
}

export function useDeleteOpportunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => opportunityService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
  });
}
