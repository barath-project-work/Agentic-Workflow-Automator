import { Box, Typography, Card, CardContent, Grid, Switch } from '@mui/material';
import { demoIntegrations } from '../../services/mockData';

const statusColors: Record<string, string> = { connected: '#1BA672', disconnected: '#9C9C9C', error: '#E23744' };

export function IntegrationsPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Integrations</Typography>
      <Grid container spacing={2}>
        {demoIntegrations.map((int) => (
          <Grid item xs={12} sm={6} md={4} key={int.id}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h4" sx={{ fontSize: '2rem' }}>{int.icon}</Typography>
                  <Switch checked={int.status === 'connected'} sx={{ '& .MuiSwitch-thumb': { bgcolor: int.status === 'connected' ? '#1BA672 !important' : undefined } }} />
                </Box>
                <Typography variant="body1" fontWeight={600}>{int.name}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1.5}>{int.description}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: statusColors[int.status] }} />
                  <Typography variant="caption" sx={{ color: statusColors[int.status], fontWeight: 500 }}>{int.status.charAt(0).toUpperCase() + int.status.slice(1)}</Typography>
                </Box>
                {int.lastSync && <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>Last sync: {new Date(int.lastSync).toLocaleDateString()}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
