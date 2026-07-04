import { Box, Typography, Card, CardContent, Chip, Button, LinearProgress, Divider, CircularProgress, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useOpportunity } from '../../hooks/useOpportunities';

export function OpportunityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: opp, isLoading, error } = useOpportunity(id || '');

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !opp) {
    return (
      <Box>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/opportunities')} sx={{ mb: 2, color: '#696969' }}>Back</Button>
        <Alert severity="error" sx={{ borderRadius: 2 }}>Opportunity not found or failed to load.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/opportunities')} sx={{ mb: 2, color: '#696969' }}>Back</Button>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 500px' }}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Chip label={opp.stage} size="small" sx={{ mb: 1, fontWeight: 600 }} />
                  <Typography variant="h5" fontWeight={700}>{opp.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{opp.customerName}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 120 }}>
                  <Typography variant="caption" color="text.secondary">Value</Typography>
                  <Typography variant="body1" fontWeight={700}>₹{opp.value?.toLocaleString() || 'N/A'}</Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: 150 }}>
                  <Typography variant="caption" color="text.secondary">Probability</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress variant="determinate" value={opp.probability} sx={{ flex: 1, height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { bgcolor: opp.probability >= 70 ? '#1BA672' : opp.probability >= 40 ? '#F7A83E' : '#E23744' } }} />
                    <Typography variant="body2" fontWeight={600}>{opp.probability}%</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, minWidth: 120 }}>
                  <Typography variant="caption" color="text.secondary">Close Date</Typography>
                  <Typography variant="body1" fontWeight={600}>{opp.closeDate ? new Date(opp.closeDate).toLocaleDateString() : 'N/A'}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">{opp.description || 'No description provided.'}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '0 1 280px' }}>
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
        </Box>
      </Box>
    </Box>
  );
}
