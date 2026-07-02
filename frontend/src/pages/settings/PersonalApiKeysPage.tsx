import { Box, Typography, Card, Button, Chip, IconButton } from '@mui/material';
import { Add, ContentCopy, Visibility } from '@mui/icons-material';

const keys = [
  { name: 'Personal Access Token', prefix: 'pat_abc123', created: '2026-06-01', lastUsed: '2 days ago', status: 'active' },
  { name: 'CLI Key', prefix: 'cli_def456', created: '2026-05-15', lastUsed: '1 week ago', status: 'active' },
];

export function PersonalApiKeysPage() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>My API Keys</Typography>
        <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 2 }}>New Key</Button>
      </Box>

      <Card sx={{ borderRadius: 2 }}>
        {keys.map((key, i) => (
          <Box key={key.prefix} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: i < keys.length - 1 ? 1 : 0, borderColor: 'divider' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600}>{key.name}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>{key.prefix}...••••</Typography>
            </Box>
            <Chip label={key.status} size="small" sx={{ bgcolor: '#E8F5E9', color: '#1BA672', fontWeight: 500 }} />
            <Typography variant="caption" color="text.secondary">Used {key.lastUsed}</Typography>
            <IconButton size="small"><ContentCopy sx={{ fontSize: 16 }} /></IconButton>
            <IconButton size="small"><Visibility sx={{ fontSize: 16 }} /></IconButton>
          </Box>
        ))}
      </Card>
    </Box>
  );
}
