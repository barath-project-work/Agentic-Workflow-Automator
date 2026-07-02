import { Box, Typography, Card, CardContent, Grid, Chip, LinearProgress } from '@mui/material';
import { agentPerformance } from '../../services/mockData';

export function AgentReportsPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Agent Performance</Typography>

      <Grid container spacing={2} mb={3}>
        {agentPerformance.map((agent) => (
          <Grid item xs={12} md={6} key={agent.agent}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" fontWeight={600}>{agent.agent}</Typography>
                  <Chip label={`${agent.successRate}%`} size="small" sx={{ bgcolor: agent.successRate >= 95 ? '#E8F5E9' : agent.successRate >= 85 ? '#FFF8E1' : '#FFF0F0', color: agent.successRate >= 95 ? '#1BA672' : agent.successRate >= 85 ? '#F7A83E' : '#E23744', fontWeight: 600 }} />
                </Box>
                <Box sx={{ mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">Success Rate</Typography>
                    <Typography variant="caption" fontWeight={600}>{agent.successRate}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={agent.successRate} sx={{ height: 6, borderRadius: 3, bgcolor: '#F0F0F0', '& .MuiLinearProgress-bar': { bgcolor: agent.successRate >= 95 ? '#1BA672' : agent.successRate >= 85 ? '#F7A83E' : '#E23744', borderRadius: 3 } }} />
                </Box>
                <Grid container spacing={1}>
                  <Grid item xs={6}><Typography variant="caption" color="text.secondary">Avg Duration</Typography><Typography variant="body2" fontWeight={500}>{agent.avgDuration}</Typography></Grid>
                  <Grid item xs={6}><Typography variant="caption" color="text.secondary">Tasks</Typography><Typography variant="body2" fontWeight={500}>{agent.tasksCompleted}</Typography></Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
