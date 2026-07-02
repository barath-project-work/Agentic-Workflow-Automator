import { Box, Typography, Card, Chip, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Add, ContentCopy, MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import { demoApiKeys } from '../../services/mockData';

export function ApiKeyManagementPage() {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>API Keys</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>Create Key</Button>
      </Box>

      <Card sx={{ borderRadius: 2 }}>
        {demoApiKeys.map((key, i) => (
          <Box key={key.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: i < demoApiKeys.length - 1 ? 1 : 0, borderColor: 'divider', '&:hover': { bgcolor: '#FFF5F5' } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600}>{key.name}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>{key.prefix}...••••</Typography>
            </Box>
            <Chip label={key.status} size="small" sx={{ fontWeight: 500, bgcolor: key.status === 'active' ? '#E8F5E9' : '#F5F5F5', color: key.status === 'active' ? '#1BA672' : '#9C9C9C' }} />
            <Typography variant="caption" color="text.secondary">Created {key.created}</Typography>
            <IconButton size="small"><ContentCopy sx={{ fontSize: 16 }} /></IconButton>
            <IconButton size="small"><MoreVert sx={{ fontSize: 16 }} /></IconButton>
          </Box>
        ))}
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle fontWeight={600}>Create API Key</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <TextField label="Key Name" placeholder="e.g., Production Key" fullWidth sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)} sx={{ borderRadius: 2 }}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
