import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ServerErrorPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Typography variant="h1" fontWeight={700} color="#E23744" gutterBottom>500</Typography>
      <Typography variant="h5" fontWeight={600} gutterBottom>Something went wrong</Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>Our team has been notified. Please try again.</Typography>
      <Typography variant="caption" color="text.secondary" mb={3}>Error ID: ERR_ATLAS_7F3A2B</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ borderRadius: 2, px: 4 }}>Go to Dashboard</Button>
        <Button variant="outlined" onClick={() => window.location.reload()} sx={{ borderRadius: 2, px: 4 }}>Try Again</Button>
      </Box>
    </Box>
  );
}
