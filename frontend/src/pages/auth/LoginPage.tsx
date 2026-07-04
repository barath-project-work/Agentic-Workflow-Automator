import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon, Person as PersonIcon } from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';
import api from '../../services/api';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  userId: string;
  name: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_MANAGER' | 'ROLE_ADMIN';
}

export function LoginPage() {
  const location = useLocation();
  const [mode, setMode] = useState<'login' | 'register'>(
    location.pathname === '/register' ? 'register' : 'login'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register' && !name) {
      setError('Name is required');
      return;
    }
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    if (mode === 'register' && password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      let data: AuthResponse;

      if (mode === 'register') {
        const res = await api.post('/auth/register', { name, email, password });
        data = res.data;
      } else {
        const res = await api.post('/auth/login', { email, password });
        data = res.data;
      }

      login(
        data.accessToken,
        data.refreshToken,
        {
          id: data.userId,
          email: data.email,
          name: data.name,
          role: data.role,
        }
      );

      navigate('/dashboard');
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        (mode === 'register' ? 'Registration failed. Try a different email.' : 'Invalid email or password.');
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 420 }, mx: 'auto', px: { xs: 3, sm: 0 } }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '1.75rem' }, letterSpacing: '-0.02em', color: '#1C1C1C' }}>
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </Typography>
        <Typography sx={{ mt: 0.75, color: '#696969', fontSize: { xs: '0.875rem', sm: '0.9375rem' }, fontFamily: 'Inter, sans-serif' }}>
          {mode === 'login'
            ? 'Sign in to your AtlasAI workspace'
            : 'Start your free AtlasAI workspace'}
        </Typography>
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
          {error}
        </Alert>
      )}

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
        {mode === 'register' && (
          <TextField
            label="Full name"
            placeholder="John Doe"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            InputProps={{
              startAdornment: <PersonIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: '#9C9C9C', mr: 1 }} />,
              sx: { borderRadius: 2, '& input': { py: { xs: 1.6, sm: 1.5 }, fontSize: { xs: '0.9375rem', sm: '1rem' } } },
            }}
          />
        )}

        <TextField
          label="Email address"
          type="email"
          placeholder="you@company.com"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          InputProps={{
            startAdornment: <EmailIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: '#9C9C9C', mr: 1 }} />,
            sx: { borderRadius: 2, '& input': { py: { xs: 1.6, sm: 1.5 }, fontSize: { xs: '0.9375rem', sm: '1rem' } } },
          }}
        />

        <TextField
          label="Password"
          type="password"
          placeholder={mode === 'register' ? 'Create a strong password (min 8 chars)' : 'Enter your password'}
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          InputProps={{
            startAdornment: <LockIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: '#9C9C9C', mr: 1 }} />,
            sx: { borderRadius: 2, '& input': { py: { xs: 1.6, sm: 1.5 }, fontSize: { xs: '0.9375rem', sm: '1rem' } } },
          }}
        />

        {mode === 'login' && (
          <Box sx={{ textAlign: 'right', mt: -0.5 }}>
            <Typography
              sx={{
                fontSize: { xs: '0.8125rem', sm: '0.8125rem' },
                color: '#E23744',
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
                fontFamily: 'Inter, sans-serif',
              }}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </Typography>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ py: { xs: 1.6, sm: 1.5 }, borderRadius: 2, fontSize: { xs: '0.9375rem', sm: '1rem' }, fontWeight: 600, minHeight: 48 }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: '#FFF' }} />
          ) : mode === 'login' ? (
            'Sign In'
          ) : (
            'Create Account'
          )}
        </Button>
      </Box>

      {/* Mode switch */}
      <Box sx={{ textAlign: 'center', mt: { xs: 2.5, sm: 3 } }}>
        <Typography sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' }, color: '#696969', fontFamily: 'Inter, sans-serif' }}>
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <Typography
            component="span"
            sx={{
              color: '#E23744',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={switchMode}
          >
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
