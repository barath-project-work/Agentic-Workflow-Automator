import { Box, Typography, Card, CardContent, Chip, Button, Grid, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, CheckCircle } from '@mui/icons-material';
import { demoTasks } from '../../services/mockData';

export function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = demoTasks.find(t => t.id === id) || demoTasks[0];

  const typeColors: Record<string, string> = { EMAIL: '#4A90D9', MEETING: '#F7A83E', CALL: '#1BA672', FOLLOW_UP: '#9B59B6', REVIEW: '#E67E22' };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/tasks')} sx={{ mb: 2, color: '#696969' }}>Back to Tasks</Button>

      <Card sx={{ borderRadius: 2, mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Chip label={task.type.replace('_', ' ')} size="small" sx={{ bgcolor: `${typeColors[task.type]}15`, color: typeColors[task.type], fontWeight: 600 }} />
              <Chip label={task.status.replace('_', ' ')} size="small" sx={{ fontWeight: 500 }} />
              <Chip label={task.priority} size="small" sx={{ fontWeight: 500 }} />
            </Box>
          </Box>
          <Typography variant="h5" fontWeight={700} mb={1}>{task.title}</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>{task.description}</Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Due Date</Typography>
              <Typography variant="body2" fontWeight={500}>{new Date(task.dueDate).toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Type</Typography>
              <Typography variant="body2" fontWeight={500}>{task.type.replace('_', ' ')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Related</Typography>
              <Typography variant="body2" fontWeight={500}>{task.relatedEntityName || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Created</Typography>
              <Typography variant="body2" fontWeight={500}>{new Date(task.createdAt).toLocaleDateString()}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {task.result && (
            <Box sx={{ p: 1.5, bgcolor: '#F0FFF4', borderRadius: 2, mb: 2 }}>
              <Typography variant="body2" color="success.main" fontWeight={500}>Result: {task.result}</Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button variant="contained" startIcon={<CheckCircle />} sx={{ borderRadius: 2 }}>Mark Complete</Button>
            <Button variant="outlined" sx={{ borderRadius: 2 }}>Snooze</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
