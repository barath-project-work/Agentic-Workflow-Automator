import { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, IconButton, Button, Avatar, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@mui/material';
import { Search, Add, MoreVert, FilterList } from '@mui/icons-material';
import { demoUsers } from '../../services/mockData';

const roleColors: Record<string, string> = { ROLE_ADMIN: '#E23744', ROLE_MANAGER: '#F7A83E', ROLE_USER: '#4A90D9' };

export function UserManagementPage() {
  const [search, setSearch] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);
  const filtered = demoUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>User Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setInviteOpen(true)} sx={{ borderRadius: 2 }}>Invite User</Button>
      </Box>

      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ pb: '0 !important' }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField size="small" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, maxWidth: 400, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 20, color: '#9C9C9C' }} /></InputAdornment> }}
            />
            <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}><FilterList /></IconButton>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 2 }}>
        {filtered.map((user, i) => (
          <Box key={user.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: i < filtered.length - 1 ? 1 : 0, borderColor: 'divider', '&:hover': { bgcolor: '#FFF5F5' } }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: roleColors[user.role], fontSize: '0.8125rem', fontWeight: 600 }}>{user.name.split(' ').map(n => n[0]).join('')}</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600}>{user.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user.email}</Typography>
            </Box>
            <Chip label={user.role.replace('ROLE_', '')} size="small" sx={{ fontWeight: 500, fontSize: '0.6875rem', bgcolor: `${roleColors[user.role]}15`, color: roleColors[user.role] }} />
            <Chip label={user.status} size="small" sx={{ fontWeight: 500, fontSize: '0.6875rem', bgcolor: user.status === 'active' ? '#E8F5E9' : '#F5F5F5', color: user.status === 'active' ? '#1BA672' : '#9C9C9C' }} />
            <Typography variant="caption" color="text.secondary">Last login: {new Date(user.lastLogin).toLocaleDateString()}</Typography>
            <IconButton size="small"><MoreVert /></IconButton>
          </Box>
        ))}
      </Card>

      <Dialog open={inviteOpen} onClose={() => setInviteOpen(false)} PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle fontWeight={600}>Invite User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 400 }}>
          <TextField label="Email" type="email" fullWidth sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <TextField label="Role" select defaultValue="ROLE_USER" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
            <MenuItem value="ROLE_USER">User</MenuItem>
            <MenuItem value="ROLE_MANAGER">Manager</MenuItem>
            <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setInviteOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={() => setInviteOpen(false)} sx={{ borderRadius: 2 }}>Send Invite</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
