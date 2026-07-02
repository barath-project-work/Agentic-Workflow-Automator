import { Box, Typography, Card, CardContent, Grid, Chip, Button, LinearProgress, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Edit } from '@mui/icons-material';
import { demoOpportunities } from '../../services/mockData';

export function OpportunityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const opp = demoOpportunities.find(o => o.id === id) || demoOpportunities[0];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/opportunities')} sx={{ mb: 2, color: '#696969' }}>Back</Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Chip label={opp.stage} size="small" sx={{ mb: 1, fontWeight: 600 }} />
                  <Typography variant="h5" fontWeight={700}>{opp.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{opp.customerName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}><Button variant="outlined" size="small" startIcon={<Edit />} sx={{ borderRadius: 2 }}>Edit</Button></Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={4}><Typography variant="caption" color="text.secondary">Value</Typography><Typography variant="body1" fontWeight={700}>₹{opp.value.toLocaleString()}</Typography></Grid>
                <Grid item xs={4}><Typography variant="caption" color="text.secondary">Probability</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LinearProgress variant="determinate" value={opp.probability} sx={{ flex: 1, height: 8, borderRadius: 4 }} /><Typography variant="body2" fontWeight={600}>{opp.probability}%</Typography></Box></Grid>
                <Grid item xs={4}><Typography variant="caption" color="text.secondary">Close Date</Typography><Typography variant="body1" fontWeight={600}>{new Date(opp.closeDate).toLocaleDateString()}</Typography></Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">{opp.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600} mb={1.5}>Actions</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained" fullWidth sx={{ borderRadius: 2 }}>Move to Next Stage</Button>
                <Button variant="outlined" fullWidth sx={{ borderRadius: 2 }}>Schedule Meeting</Button>
                <Button variant="outlined" fullWidth color="error" sx={{ borderRadius: 2 }}>Mark Lost</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
