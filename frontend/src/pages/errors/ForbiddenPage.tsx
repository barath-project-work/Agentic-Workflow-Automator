import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ForbiddenPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Typography variant="h1" fontWeight={700} color="#F7A83E" gutterBottom>403</Typography>
      <Typography variant="h5" fontWeight={600} gutterBottom>Access Denied</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>You don't have permission to access this page.</Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ borderRadius: 2, px: 4 }}>Go to Dashboard</Button>
    </Box>
  );
}
