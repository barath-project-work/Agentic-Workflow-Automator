import { Box, Typography, Button, Card, CardContent, Grid, Chip, IconButton, TextField, InputAdornment, Tab, Tabs } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon, FilterList, ViewList, GridView, MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoWorkflows } from '../../services/mockData';

const statusColors: Record<string, string> = {
  RUNNING: '#4A90D9', COMPLETED: '#1BA672', FAILED: '#E23744', BLOCKED: '#F7A83E', CANCELLED: '#9C9C9C',
};

export function WorkflowListPage() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const filtered = demoWorkflows.filter(w => {
    if (tab === 0) return true;
    const statusMap = ['RUNNING', 'COMPLETED', 'FAILED'];
    return w.status === statusMap[tab - 1];
  }).filter(w => w.goal.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">Workflows</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/workflows/create')}
          sx={{ borderRadius: 2, py: 1, px: 3 }}>
          New Workflow
        </Button>
      </Box>

      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ pb: '0 !important' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 1 }}>
            <TextField size="small" placeholder="Search workflows..." value={search} onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 20, color: '#9C9C9C' }} /></InputAdornment> }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}><FilterList /></IconButton>
              <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: view === 'grid' ? '#FFF5F5' : 'transparent' }} onClick={() => setView('grid')}><GridView /></IconButton>
              <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: view === 'list' ? '#FFF5F5' : 'transparent' }} onClick={() => setView('list')}><ViewList /></IconButton>
            </Box>
          </Box>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, fontSize: '0.875rem', minHeight: 48 }, '& .Mui-selected': { color: '#E23744 !important' }, '& .MuiTabs-indicator': { bgcolor: '#E23744' } }}>
            <Tab label="All" />
            <Tab label="Running" />
            <Tab label="Completed" />
            <Tab label="Failed" />
          </Tabs>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <Card sx={{ borderRadius: 2, textAlign: 'center', py: 8 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" mb={1}>No workflows found</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>Create your first workflow to get started.</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/workflows/create')}>New Workflow</Button>
          </CardContent>
        </Card>
      ) : view === 'grid' ? (
        <Grid container spacing={2}>
          {filtered.map((wf) => (
            <Grid item xs={12} sm={6} md={4} key={wf.id}>
              <Card sx={{ borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' } }} onClick={() => navigate(`/workflows/${wf.id}`)}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Chip label={wf.status} size="small" sx={{ bgcolor: `${statusColors[wf.status]}15`, color: statusColors[wf.status], fontWeight: 600, fontSize: '0.6875rem' }} />
                    <IconButton size="small"><MoreVert sx={{ fontSize: 18 }} /></IconButton>
                  </Box>
                  <Typography variant="body2" fontWeight={600} mb={0.5} sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{wf.goal}</Typography>
                  <Typography variant="caption" color="text.secondary">Started {new Date(wf.createdAt).toLocaleDateString()}</Typography>
                  <Box sx={{ mt: 1.5, display: 'flex', gap: 0.5 }}>
                    {wf.steps.map((s) => (
                      <Box key={s.id} sx={{ width: 20, height: 6, borderRadius: 3, bgcolor: s.status === 'COMPLETED' ? '#1BA672' : s.status === 'RUNNING' ? '#4A90D9' : '#E8E8E8' }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card sx={{ borderRadius: 2 }}>
          {filtered.map((wf, i) => (
            <Box key={wf.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: i < filtered.length - 1 ? 1 : 0, borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: '#FFF5F5' } }} onClick={() => navigate(`/workflows/${wf.id}`)}>
              <Chip label={wf.status} size="small" sx={{ minWidth: 80, bgcolor: `${statusColors[wf.status]}15`, color: statusColors[wf.status], fontWeight: 600 }} />
              <Typography variant="body2" fontWeight={500} sx={{ flex: 1 }}>{wf.goal}</Typography>
              <Typography variant="caption" color="text.secondary">{new Date(wf.createdAt).toLocaleDateString()}</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {wf.steps.map((s) => (
                  <Box key={s.id} sx={{ width: 16, height: 5, borderRadius: 3, bgcolor: s.status === 'COMPLETED' ? '#1BA672' : '#E8E8E8' }} />
                ))}
              </Box>
            </Box>
          ))}
        </Card>
      )}
    </Box>
  );
}
