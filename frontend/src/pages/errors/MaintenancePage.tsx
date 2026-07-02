import { Box, Typography, LinearProgress } from '@mui/material';
import { Construction } from '@mui/icons-material';

export function MaintenancePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <Construction sx={{ fontSize: 64, color: '#F7A83E', mb: 2 }} />
      <Typography variant="h5" fontWeight={600} gutterBottom>Under Maintenance</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>We're performing some upgrades. Be back shortly!</Typography>
      <Box sx={{ width: 300, mb: 2 }}>
        <LinearProgress sx={{ borderRadius: 2, height: 6, '& .MuiLinearProgress-bar': { bgcolor: '#E23744' } }} />
      </Box>
      <Typography variant="caption" color="text.secondary">Estimated completion: ~30 minutes</Typography>
    </Box>
  );
}
