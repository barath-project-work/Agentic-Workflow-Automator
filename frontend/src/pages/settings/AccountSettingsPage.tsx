import { Box, Typography, Card, CardContent, TextField, Button, Alert } from '@mui/material';

export function AccountSettingsPage() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={3}>Account Settings</Typography>
      
      <Card sx={{ borderRadius: 2, mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography variant="h6" fontWeight={600}>Change Password</Typography>
          <TextField label="Current Password" type="password" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <TextField label="New Password" type="password" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <TextField label="Confirm New Password" type="password" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{ borderRadius: 2 }}>Update Password</Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 2, mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" fontWeight={600}>Active Sessions</Typography>
          {['Chrome on Windows', 'Safari on iPhone', 'Firefox on Ubuntu'].map((device, i) => (
            <Box key={device} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: i < 2 ? 1 : 0, borderColor: 'divider' }}>
              <Box>
                <Typography variant="body2" fontWeight={500}>{device}</Typography>
                <Typography variant="caption" color="text.secondary">Last active: {i === 0 ? 'Now' : `${i * 3} hours ago`}</Typography>
              </Box>
              <Button size="small" variant="outlined" color="error" sx={{ borderRadius: 2 }}>Revoke</Button>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 2, border: '1px solid #FFCDD2' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} color="error" mb={1}>Delete Account</Typography>
          <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
            This action is irreversible. All your data will be permanently deleted.
          </Alert>
          <Button variant="outlined" color="error" sx={{ borderRadius: 2 }}>Delete My Account</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
