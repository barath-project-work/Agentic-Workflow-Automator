import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import workflowService, { WorkflowRequest, WorkflowFilters } from '../services/workflowService';

export function useWorkflows(filters?: WorkflowFilters) {
  return useQuery({
    queryKey: ['workflows', filters],
    queryFn: async () => {
      const response = await workflowService.getAll(filters);
      return response.content;
    },
    staleTime: 30_000,
  });
}

export function useWorkflowsPaginated(filters?: WorkflowFilters & { page?: number; size?: number; sort?: string; direction?: string }) {
  return useQuery({
    queryKey: ['workflows', 'paginated', filters],
    queryFn: () => workflowService.getAll(filters),
    staleTime: 30_000,
  });
}

export function useWorkflow(id: string) {
  return useQuery({
    queryKey: ['workflow', id],
    queryFn: () => workflowService.getById(id),
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useCreateWorkflow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkflowRequest) => workflowService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
}

export function useCancelWorkflow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workflowService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
}

export function useDeleteWorkflow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workflowService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
}

export function useWorkflowTemplates() {
  return useQuery({
    queryKey: ['workflows', 'templates'],
    queryFn: () => workflowService.getTemplates(),
    staleTime: 300_000, // 5 min — templates rarely change
  });
}
