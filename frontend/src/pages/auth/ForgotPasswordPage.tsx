import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Email as EmailIcon } from '@mui/icons-material';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Email is required'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1000);
  };

  if (sent) {
    return (
      <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 420 }, mx: 'auto', textAlign: 'center', px: { xs: 3, sm: 0 } }}>
        <Box sx={{ fontSize: { xs: 40, sm: 48 }, mb: 2 }}>📧</Box>
        <Typography variant="h5" fontWeight={700} mb={1} sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>Check your email</Typography>
        <Typography variant="body2" color="text.secondary" mb={3} sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
          We've sent a password reset link to <strong>{email}</strong>
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')} sx={{ borderRadius: 2, py: { xs: 1.6, sm: 1.5 }, minHeight: 48, fontSize: { xs: '0.9375rem', sm: '1rem' } }}>
          Back to Sign In
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 420 }, mx: 'auto', px: { xs: 3, sm: 0 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '1.75rem' }, letterSpacing: '-0.02em' }}>Forgot password?</Typography>
        <Typography sx={{ mt: 0.75, color: '#696969', fontSize: { xs: '0.875rem', sm: '0.9375rem' }, fontFamily: 'Inter, sans-serif' }}>
          Enter your email and we'll send you a reset link
        </Typography>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
        <TextField label="Email address" type="email" placeholder="you@company.com" fullWidth required value={email}
          onChange={(e) => setEmail(e.target.value)} disabled={loading}
          InputProps={{ startAdornment: <EmailIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: '#9C9C9C', mr: 1 }} />,
            sx: { borderRadius: 2, '& input': { py: { xs: 1.6, sm: 1.5 }, fontSize: { xs: '0.9375rem', sm: '1rem' } } } }}
        />
        <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ py: { xs: 1.6, sm: 1.5 }, borderRadius: 2, fontSize: { xs: '0.9375rem', sm: '1rem' }, minHeight: 48 }}>
          {loading ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : 'Send Reset Link'}
        </Button>
        <Button variant="text" onClick={() => navigate('/login')} sx={{ color: '#696969', fontFamily: 'Inter, sans-serif', fontSize: { xs: '0.875rem', sm: '0.875rem' }, py: 1, minHeight: { xs: 48, sm: 'auto' } }}>
          ← Back to Sign In
        </Button>
      </Box>
    </Box>
  );
}
