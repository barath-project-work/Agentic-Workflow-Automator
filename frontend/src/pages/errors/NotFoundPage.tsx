import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Typography variant="h1" fontWeight={700} color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </Box>
  );
}
