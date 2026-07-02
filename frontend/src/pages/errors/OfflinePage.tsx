import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function OfflinePage() {
  const [reconnecting, setReconnecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setReconnecting(true);
    const timer = setTimeout(() => setReconnecting(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>📡</Typography>
      <Typography variant="h5" fontWeight={600} gutterBottom>You're offline</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Check your internet connection and try again.</Typography>
      {reconnecting && <Box sx={{ width: 200, mb: 3 }}><LinearProgress sx={{ borderRadius: 2, '& .MuiLinearProgress-bar': { bgcolor: '#E23744' } }} /></Box>}
      <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ borderRadius: 2, px: 4 }}>Retry Connection</Button>
    </Box>
  );
}
