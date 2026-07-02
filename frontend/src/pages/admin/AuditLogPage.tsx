import { Box, Typography, Card, CardContent, Chip, TextField, InputAdornment, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Search, FilterList, Download } from '@mui/icons-material';
import { useState } from 'react';
import { demoAuditLogs } from '../../services/mockData';

export function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Audit Log</Typography>
        <IconButton><Download /></IconButton>
      </Box>

      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ pb: '0 !important' }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <TextField size="small" placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 20, color: '#9C9C9C' }} /></InputAdornment> }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Action Type</InputLabel>
              <Select value={filter} label="Action Type" onChange={(e) => setFilter(e.target.value)} sx={{ borderRadius: 2 }}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="LOGIN">Login</MenuItem>
                <MenuItem value="WORKFLOW_START">Workflow Start</MenuItem>
                <MenuItem value="EMAIL_SENT">Email Sent</MenuItem>
              </Select>
            </FormControl>
            <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}><FilterList /></IconButton>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 2 }}>
        {demoAuditLogs.slice(0, 15).map((log, i) => (
          <Box key={log.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: i < 14 ? 1 : 0, borderColor: 'divider', '&:hover': { bgcolor: '#FFF5F5' } }}>
            <Chip label={log.action} size="small" sx={{ minWidth: 100, fontWeight: 500, fontSize: '0.6875rem', bgcolor: log.action.includes('START') || log.action.includes('CREATE') ? '#E8F5E9' : log.action.includes('COMPLETE') || log.action.includes('SENT') ? '#E3F2FD' : '#FFF8E1', color: log.action.includes('START') || log.action.includes('CREATE') ? '#1BA672' : log.action.includes('COMPLETE') || log.action.includes('SENT') ? '#4A90D9' : '#F7A83E' }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={500}>{log.actor}</Typography>
              <Typography variant="caption" color="text.secondary">{log.details}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>{new Date(log.timestamp).toLocaleString()}</Typography>
          </Box>
        ))}
      </Card>
    </Box>
  );
}
