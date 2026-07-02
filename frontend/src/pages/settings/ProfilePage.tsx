import { Box, Typography, Card, CardContent, Grid, TextField, Button, Avatar, IconButton } from '@mui/material';
import { useAuthStore } from '../../stores/authStore';
import { PhotoCamera } from '@mui/icons-material';

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={3}>Profile</Typography>
      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: '#E23744', fontSize: '2rem', fontWeight: 600 }}>{user?.name?.charAt(0) || 'U'}</Avatar>
              <IconButton sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: '#FFF', border: '2px solid #F0F0F0', '&:hover': { bgcolor: '#FAFAFA' } }}>
                <PhotoCamera sx={{ fontSize: 16, color: '#696969' }} />
              </IconButton>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>{user?.name || 'User'}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.jobTitle || ''}</Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField label="First Name" defaultValue={user?.name?.split(' ')[0] || ''} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Last Name" defaultValue={user?.name?.split(' ').slice(1).join(' ') || ''} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Email" defaultValue={user?.email || ''} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Phone" defaultValue="+91 98765 43210" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
            <Grid item xs={12}><TextField label="Job Title" defaultValue={user?.jobTitle || ''} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
            <Grid item xs={12}><TextField label="Bio" multiline rows={3} defaultValue={user?.bio || ''} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{ borderRadius: 2, px: 4 }}>Save Changes</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
