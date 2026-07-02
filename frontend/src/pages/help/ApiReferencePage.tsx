import { Box, Typography, Card, Chip, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const endpoints = [
  { method: 'GET', path: '/api/customers', desc: 'List customers with filters', auth: 'JWT' },
  { method: 'GET', path: '/api/customers/:id', desc: 'Get customer details', auth: 'JWT' },
  { method: 'POST', path: '/api/customers', desc: 'Create new customer', auth: 'JWT' },
  { method: 'PUT', path: '/api/customers/:id', desc: 'Update customer', auth: 'JWT' },
  { method: 'DELETE', path: '/api/customers/:id', desc: 'Delete customer', auth: 'Admin' },
  { method: 'POST', path: '/api/workflow', desc: 'Start new workflow', auth: 'JWT' },
  { method: 'GET', path: '/api/workflow/:id', desc: 'Get workflow status/results', auth: 'JWT' },
  { method: 'GET', path: '/api/tasks', desc: 'List tasks', auth: 'JWT' },
  { method: 'POST', path: '/api/tasks/:id/complete', desc: 'Mark task complete', auth: 'JWT' },
  { method: 'GET', path: '/api/analytics/metrics', desc: 'Get sales metrics', auth: 'Manager+' },
];

const methodColors: Record<string, string> = { GET: '#1BA672', POST: '#4A90D9', PUT: '#F7A83E', DELETE: '#E23744' };

export function ApiReferencePage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>API Reference</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>REST API documentation for AtlasAI</Typography>
      <TextField placeholder="Search endpoints..." size="small" sx={{ mb: 3, maxWidth: 400, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#9C9C9C' }} /></InputAdornment> }}
      />
      <Card sx={{ borderRadius: 2 }}>
        {endpoints.map((ep, i) => (
          <Box key={ep.path} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: i < endpoints.length - 1 ? 1 : 0, borderColor: 'divider', '&:hover': { bgcolor: '#FFF5F5' } }}>
            <Chip label={ep.method} size="small" sx={{ minWidth: 60, fontWeight: 700, fontSize: '0.6875rem', bgcolor: `${methodColors[ep.method]}15`, color: methodColors[ep.method] }} />
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500, flex: 1 }}>{ep.path}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>{ep.desc}</Typography>
            <Chip label={ep.auth} size="small" variant="outlined" sx={{ fontSize: '0.625rem' }} />
          </Box>
        ))}
      </Card>
    </Box>
  );
}
