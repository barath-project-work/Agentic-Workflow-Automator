import { Box, Typography, Card, CardContent, Grid, Select, MenuItem, FormControl } from '@mui/material';
import { pipelineData, demoOpportunities } from '../../services/mockData';

export function SalesReportsPage() {
  const wonOpps = demoOpportunities.filter(o => o.stage === 'WON');
  const totalValue = wonOpps.reduce((sum, o) => sum + o.value, 0);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">Sales Reports</Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select defaultValue="q2" sx={{ borderRadius: 2 }}>
            <MenuItem value="q1">Q1 2026</MenuItem>
            <MenuItem value="q2">Q2 2026</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, textAlign: 'center', py: 3 }}>
            <Typography variant="h3" fontWeight={700} color="#1BA672">₹{(totalValue / 100000).toFixed(1)}L</Typography>
            <Typography variant="caption" color="text.secondary">Total Won Revenue</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, textAlign: 'center', py: 3 }}>
            <Typography variant="h3" fontWeight={700} color="#4A90D9">{wonOpps.length}</Typography>
            <Typography variant="caption" color="text.secondary">Closed Deals</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, textAlign: 'center', py: 3 }}>
            <Typography variant="h3" fontWeight={700} color="#F7A83E">68%</Typography>
            <Typography variant="caption" color="text.secondary">Win Rate</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Pipeline Chart */}
      <Card sx={{ borderRadius: 2, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>Pipeline by Stage</Typography>
          {pipelineData.map((p) => (
            <Box key={p.stage} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" fontWeight={500}>{p.stage}</Typography>
                <Box><Typography variant="body2" fontWeight={600} component="span">₹{(p.value / 100000).toFixed(1)}L</Typography><Typography variant="caption" color="text.secondary" component="span" sx={{ ml: 1 }}>{p.count} deals</Typography></Box>
              </Box>
              <Box sx={{ bgcolor: '#F0F0F0', borderRadius: 4, height: 8 }}>
                <Box sx={{ bgcolor: '#E23744', borderRadius: 4, height: 8, width: `${(p.value / 4500000) * 100}%`, opacity: 0.6 + (pipelineData.indexOf(p) * 0.07) }} />
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
