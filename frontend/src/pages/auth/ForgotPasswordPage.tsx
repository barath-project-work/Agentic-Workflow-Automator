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
      <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto', textAlign: 'center' }}>
        <Box sx={{ fontSize: 48, mb: 2 }}>📧</Box>
        <Typography variant="h5" fontWeight={700} mb={1}>Check your email</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          We've sent a password reset link to <strong>{email}</strong>
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')} sx={{ borderRadius: 2, py: 1.5 }}>
          Back to Sign In
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em' }}>Forgot password?</Typography>
        <Typography sx={{ mt: 1, color: '#696969', fontSize: '0.9375rem', fontFamily: 'Inter, sans-serif' }}>
          Enter your email and we'll send you a reset link
        </Typography>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField label="Email address" type="email" placeholder="you@company.com" fullWidth required value={email}
          onChange={(e) => setEmail(e.target.value)} disabled={loading}
          InputProps={{ startAdornment: <EmailIcon sx={{ fontSize: 20, color: '#9C9C9C', mr: 1 }} /> }}
        />
        <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ py: 1.5, borderRadius: 2, fontSize: '1rem' }}>
          {loading ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : 'Send Reset Link'}
        </Button>
        <Button variant="text" onClick={() => navigate('/login')} sx={{ color: '#696969', fontFamily: 'Inter, sans-serif' }}>
          ← Back to Sign In
        </Button>
      </Box>
    </Box>
  );
}
