import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  Chip,
} from '@mui/material';
import { AutoAwesome as AIIcon } from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';
import { demoUser } from '../../services/mockData';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      login(
        'demo_jwt_token_for_frontend_dev',
        { id: demoUser.id, email: demoUser.email, name: demoUser.name, role: demoUser.role, jobTitle: demoUser.jobTitle },
        true
      );
      navigate('/dashboard');
    }, 800);
  };

  const handleDemoAccess = () => {
    login(
      'demo_jwt_token_for_frontend_dev',
      { id: demoUser.id, email: demoUser.email, name: demoUser.name, role: demoUser.role, jobTitle: demoUser.jobTitle },
      true
    );
    navigate('/dashboard');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', color: '#1C1C1C' }}>
          Welcome back
        </Typography>
        <Typography sx={{ mt: 1, color: '#696969', fontSize: '0.9375rem', fontFamily: 'Inter, sans-serif' }}>
          Sign in to your AtlasAI workspace
        </Typography>
      </Box>

      {/* Demo Quick Access */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleDemoAccess}
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontSize: '1rem',
          fontWeight: 600,
          mb: 3,
          background: 'linear-gradient(135deg, #E23744, #FF6B76)',
          '&:hover': {
            background: 'linear-gradient(135deg, #C41E2C, #E23744)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(226, 55, 68, 0.3)',
          },
        }}
        startIcon={<AIIcon />}
      >
        🚀 Quick Demo Access
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Divider sx={{ flex: 1 }} />
        <Chip label="or sign in" size="small" sx={{ color: '#9C9C9C', fontWeight: 500, fontSize: '0.75rem' }} />
        <Divider sx={{ flex: 1 }} />
      </Box>

      {/* Error */}
      {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>{error}</Alert>}

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Email address"
          type="email"
          placeholder="you@company.com"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        <Box sx={{ textAlign: 'right', mt: -1 }}>
          <Typography
            sx={{ fontSize: '0.8125rem', color: '#E23744', fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' }, fontFamily: 'Inter, sans-serif' }}
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </Typography>
        </Box>
        <Button type="submit" variant="outlined" fullWidth size="large" disabled={loading} sx={{ py: 1.5, borderRadius: 2, fontSize: '1rem', fontWeight: 500 }}>
          Sign In
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography sx={{ fontSize: '0.875rem', color: '#696969', fontFamily: 'Inter, sans-serif' }}>
          New to AtlasAI?{' '}
          <Typography component="span" sx={{ color: '#E23744', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>
            Contact your admin
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
