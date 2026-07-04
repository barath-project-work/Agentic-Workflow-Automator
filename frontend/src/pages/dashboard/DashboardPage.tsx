import { Box, Grid, Card, CardContent, Typography, Chip, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Loop, People, CalendarMonth, TrendingUp, TrendingDown, Add } from '@mui/icons-material';
import { useCustomers } from '../../hooks/useCustomers';
import { useOpportunities } from '../../hooks/useOpportunities';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: customers, isLoading: customersLoading } = useCustomers();
  const { data: opportunities, isLoading: oppsLoading } = useOpportunities();

  const isLoading = customersLoading || oppsLoading;

  const activeCustomers = customers?.filter(c => c.status === 'ACTIVE').length || 0;
  const activeOpportunities = opportunities?.filter(o => o.stage !== 'WON' && o.stage !== 'LOST').length || 0;
  const totalDeals = opportunities?.reduce((sum, o) => sum + (o.value || 0), 0) || 0;

  return (
    <Box>
      {/* Welcome */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">Dashboard</Typography>
          <Typography variant="body2" color="text.secondary" fontFamily="Inter, sans-serif">Here's what's happening today.</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/workflows/create')} sx={{ borderRadius: 2, py: 1, px: 3 }}>
          New Workflow
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Metrics Cards */}
          <Grid container spacing={2} mb={3}>
            {[
              { label: 'Active Customers', value: activeCustomers.toString(), change: 12, color: '#E23744', icon: <People sx={{ fontSize: 24 }} /> },
              { label: 'Active Deals', value: activeOpportunities.toString(), change: 8, color: '#4A90D9', icon: <Loop sx={{ fontSize: 24 }} /> },
              { label: 'Pipeline Value', value: `₹${(totalDeals / 100000).toFixed(1)}L`, change: 5, color: '#1BA672', icon: <TrendingUp sx={{ fontSize: 24 }} /> },
              { label: 'Total Opportunities', value: (opportunities?.length || 0).toString(), change: -3, color: '#F7A83E', icon: <CalendarMonth sx={{ fontSize: 24 }} /> },
            ].map((m, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ borderRadius: 2, transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' } }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color }}>
                        {m.icon}
                      </Box>
                      {m.change > 0 ? <TrendingUp sx={{ fontSize: 16, color: '#1BA672' }} /> : <TrendingDown sx={{ fontSize: 16, color: '#E23744' }} />}
                    </Box>
                    <Typography variant="h5" fontWeight={700} sx={{ color: m.color }}>{m.value}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>{m.label}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: m.change >= 0 ? '#1BA672' : '#E23744' }}>{m.change > 0 ? '+' : ''}{m.change}%</Typography>
                      <Typography variant="caption" color="text.secondary">vs last week</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {/* Recent Customers */}
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>Recent Customers</Typography>
                    <Button size="small" endIcon={<ArrowForward />} onClick={() => navigate('/customers')} sx={{ color: '#E23744', fontWeight: 500, textTransform: 'none' }}>View All</Button>
                  </Box>
                  {customers && customers.length > 0 ? (
                    customers.slice(0, 5).map((c) => (
                      <Box key={c.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.25, borderBottom: 1, borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: '#FFFAFA', mx: -1, px: 1, borderRadius: 1 } }}
                        onClick={() => navigate(`/customers/${c.id}`)}>
                        <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#FFF5F5', color: '#E23744', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.75rem', flexShrink: 0 }}>
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={500}>{c.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{c.company} · {c.location}</Typography>
                        </Box>
                        <Chip label={c.status?.toLowerCase() || 'lead'} size="small" sx={{ fontSize: '0.625rem', height: 22, bgcolor: c.status === 'ACTIVE' ? '#E8F5E9' : '#F5F5F5', color: c.status === 'ACTIVE' ? '#1BA672' : '#9C9C9C' }} />
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="text.secondary">No customers yet</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Opportunities */}
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>Active Deals</Typography>
                    <Button size="small" endIcon={<ArrowForward />} onClick={() => navigate('/opportunities')} sx={{ color: '#E23744', fontWeight: 500, textTransform: 'none' }}>View All</Button>
                  </Box>
                  {opportunities && opportunities.length > 0 ? (
                    opportunities.filter(o => o.stage !== 'WON' && o.stage !== 'LOST').slice(0, 5).map((opp) => (
                      <Box key={opp.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.25, borderBottom: 1, borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: '#FFFAFA', mx: -1, px: 1, borderRadius: 1 } }}
                        onClick={() => navigate(`/opportunities/${opp.id}`)}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: opp.stage === 'NEGOTIATION' ? '#E67E22' : opp.stage === 'PROPOSAL' ? '#F7A83E' : opp.stage === 'QUALIFIED' ? '#4A90D9' : '#9C9C9C', flexShrink: 0 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={500}>{opp.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{opp.customerName} · ₹{opp.value?.toLocaleString() || 'N/A'}</Typography>
                        </Box>
                        <Chip label={opp.stage} size="small" sx={{ fontSize: '0.625rem', height: 22, bgcolor: '#FFF5F5', color: '#E23744' }} />
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="text.secondary">No active deals</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
