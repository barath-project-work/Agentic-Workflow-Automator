import { useQuery } from '@tanstack/react-query';
import customerService from '../services/customerService';
import opportunityService from '../services/opportunityService';

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: async () => {
      const [customerCount, opportunityCount] = await Promise.all([
        customerService.getCount().catch(() => 0),
        opportunityService.getCount().catch(() => 0),
      ]);

      return {
        activeCustomers: customerCount,
        opportunities: opportunityCount,
      };
    },
    staleTime: 60_000,
  });
}
