import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const strength = newPassword.length > 12 ? 'Strong' : newPassword.length > 8 ? 'Medium' : newPassword.length > 0 ? 'Weak' : '';
  const strengthColor = strength === 'Strong' ? '#1BA672' : strength === 'Medium' ? '#F7A83E' : '#E23744';
  const strengthValue = newPassword.length > 12 ? 100 : newPassword.length > 8 ? 66 : newPassword.length > 0 ? 33 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1000);
  };

  if (success) {
    return (
      <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto', textAlign: 'center' }}>
        <Box sx={{ fontSize: 48, mb: 2 }}>✅</Box>
        <Typography variant="h5" fontWeight={700} mb={1}>Password reset successful</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>Your password has been updated.</Typography>
        <Button variant="contained" onClick={() => navigate('/login')} sx={{ borderRadius: 2, py: 1.5 }}>Sign In</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em' }}>Reset password</Typography>
        <Typography sx={{ mt: 1, color: '#696969', fontSize: '0.9375rem', fontFamily: 'Inter, sans-serif' }}>
          Choose a new password for your account
        </Typography>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField label="New password" type="password" placeholder="Create a strong password" fullWidth required
          value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={loading}
        />
        {newPassword && (
          <Box sx={{ mt: -1.5 }}>
            <LinearProgress variant="determinate" value={strengthValue} sx={{ height: 4, borderRadius: 2, bgcolor: '#F0F0F0', '& .MuiLinearProgress-bar': { bgcolor: strengthColor } }} />
            <Typography variant="caption" sx={{ color: strengthColor, mt: 0.5, display: 'block' }}>{strength}</Typography>
          </Box>
        )}
        <TextField label="Confirm password" type="password" placeholder="Re-enter your password" fullWidth required
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading}
          error={confirmPassword.length > 0 && newPassword !== confirmPassword}
          helperText={confirmPassword.length > 0 && newPassword !== confirmPassword ? 'Passwords do not match' : ''}
        />
        <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ py: 1.5, borderRadius: 2, fontSize: '1rem' }}>
          {loading ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : 'Reset Password'}
        </Button>
      </Box>
    </Box>
  );
}
