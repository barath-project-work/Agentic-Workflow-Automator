import { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, IconButton, Tabs, Tab, Checkbox, Button, Grid, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add, MoreVert, Email, CalendarMonth, Phone, Assignment, Refresh } from '@mui/icons-material';
import { useTasks } from '../../hooks/useTasks';

const typeIcons: Record<string, React.ReactNode> = { EMAIL: <Email sx={{ fontSize: 18 }} />, MEETING: <CalendarMonth sx={{ fontSize: 18 }} />, CALL: <Phone sx={{ fontSize: 18 }} />, FOLLOW_UP: <Refresh sx={{ fontSize: 18 }} />, REVIEW: <Assignment sx={{ fontSize: 18 }} /> };
const statusColors: Record<string, string> = { PENDING: '#F7A83E', IN_PROGRESS: '#4A90D9', COMPLETED: '#1BA672', FAILED: '#E23744', SKIPPED: '#9C9C9C' };

const statusFilters = ['', 'PENDING', 'IN_PROGRESS', 'COMPLETED'] as const;

export function TaskListPage() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const statusFilter = statusFilters[tab] || undefined;
  const { data: tasks = [], isLoading, error } = useTasks({ status: statusFilter });

  const handleTabChange = (_: unknown, v: number) => setTab(v);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">Tasks</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={() => navigate('/tasks/board')} sx={{ borderRadius: 2 }}>Kanban Board</Button>
          <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 2, py: 1, px: 3 }}>New Task</Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ pb: '0 !important' }}>
          <Tabs value={tab} onChange={handleTabChange} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, fontSize: '0.875rem', minHeight: 48 }, '& .Mui-selected': { color: '#E23744 !important' }, '& .MuiTabs-indicator': { bgcolor: '#E23744' } }}>
            <Tab label={`All (${tasks.length})`} />
            <Tab label={`Pending (${tasks.filter(t => t.status === 'PENDING').length})`} />
            <Tab label={`In Progress (${tasks.filter(t => t.status === 'IN_PROGRESS').length})`} />
            <Tab label={`Completed (${tasks.filter(t => t.status === 'COMPLETED').length})`} />
          </Tabs>
        </CardContent>
      </Card>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          Failed to load tasks. Please try again.
        </Alert>
      )}

      {!isLoading && !error && tasks.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" mb={1}>No tasks found</Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>Create a new task to get started.</Typography>
          <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 2 }}>New Task</Button>
        </Box>
      )}

      {!isLoading && !error && tasks.length > 0 && (
        <Grid container spacing={1.5}>
          {tasks.map((task) => (
            <Grid item xs={12} key={task.id}>
              <Card sx={{ borderRadius: 2, cursor: 'pointer', transition: 'all 0.15s', '&:hover': { boxShadow: '0 2px 12px rgba(0,0,0,0.08)' } }} onClick={() => navigate(`/tasks/${task.id}`)}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2, '&:last-child': { pb: 2 } }}>
                  <Checkbox sx={{ color: '#D0D0D0', '&.Mui-checked': { color: '#1BA672' } }} checked={task.status === 'COMPLETED'} />
                  <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: '#FFF5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E23744', flexShrink: 0 }}>
                    {typeIcons[task.type]}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ textDecoration: task.status === 'COMPLETED' ? 'line-through' : 'none', color: task.status === 'COMPLETED' ? '#9C9C9C' : 'inherit' }}>{task.title}</Typography>
                      <Chip label={task.priority} size="small" sx={{ fontSize: '0.625rem', fontWeight: 600, height: 20, bgcolor: task.priority === 'HIGH' ? '#FFF0F0' : task.priority === 'MEDIUM' ? '#FFF8E1' : '#F5F5F5', color: task.priority === 'HIGH' ? '#E23744' : task.priority === 'MEDIUM' ? '#F7A83E' : '#9C9C9C' }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {task.type.replace('_', ' ')} · Due {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'} · {task.relatedEntityName && `${task.relatedEntityName}`}
                    </Typography>
                  </Box>
                  <Chip label={task.status.replace('_', ' ')} size="small" sx={{ fontWeight: 500, fontSize: '0.6875rem', bgcolor: `${statusColors[task.status]}15`, color: statusColors[task.status] }} />
                  <IconButton size="small"><MoreVert sx={{ fontSize: 18 }} /></IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
