import { Box, Typography, Card, CardContent, Grid, Chip, MenuItem, Select, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { weeklyActivity, demoMetrics } from '../../services/mockData';

export function AnalyticsPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">Analytics</Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select defaultValue="week" sx={{ borderRadius: 2 }}>
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="quarter">This Quarter</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={2} mb={3}>
        {demoMetrics.map((m) => (
          <Grid item xs={12} sm={6} md={4} key={m.label}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="caption" color="text.secondary">{m.label}</Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: m.color, my: 0.5 }}>{m.value}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Chip label={`${m.change > 0 ? '+' : ''}${m.change}%`} size="small" sx={{ fontSize: '0.625rem', height: 20, bgcolor: m.change >= 0 ? '#E8F5E9' : '#FFF0F0', color: m.change >= 0 ? '#1BA672' : '#E23744', fontWeight: 600 }} />
                  <Typography variant="caption" color="text.secondary">{m.changeLabel}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Weekly Activity Chart */}
      <Card sx={{ borderRadius: 2, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>Weekly Activity</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 200 }}>
            {weeklyActivity.map((d) => {
              const maxVal = Math.max(...weeklyActivity.map(w => w.workflows + w.emails));
              return (
                <Box key={d.day} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ display: 'flex', gap: 0.25, alignItems: 'flex-end', height: 180 }}>
                    <Box sx={{ width: 12, height: (d.emails / maxVal) * 180, bgcolor: '#E23744', borderRadius: '4px 4px 0 0', opacity: 0.7 }} />
                    <Box sx={{ width: 12, height: (d.workflows / maxVal) * 180, bgcolor: '#4A90D9', borderRadius: '4px 4px 0 0' }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary">{d.day}</Typography>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Box sx={{ width: 10, height: 10, bgcolor: '#E23744', borderRadius: '2px' }} /><Typography variant="caption">Emails</Typography></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Box sx={{ width: 10, height: 10, bgcolor: '#4A90D9', borderRadius: '2px' }} /><Typography variant="caption">Workflows</Typography></Box>
          </Box>
        </CardContent>
      </Card>

      {/* Quick links */}
      <Grid container spacing={2}>
        {[
          { label: 'Sales Reports', desc: 'Revenue, pipeline, win rates', path: '/analytics/sales', color: '#1BA672' },
          { label: 'Agent Performance', desc: 'Success rates, latency, token usage', path: '/analytics/agents', color: '#4A90D9' },
          { label: 'Custom Reports', desc: 'Build your own reports', path: '/analytics/custom', color: '#9B59B6' },
        ].map((link) => (
          <Grid item xs={12} sm={4} key={link.label}>
            <Card sx={{ borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' } }} onClick={() => navigate(link.path)}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ color: link.color }}>{link.label}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>{link.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
