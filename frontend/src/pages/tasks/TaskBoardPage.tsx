import { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add, Email, CalendarMonth, Phone, Assignment, Refresh } from '@mui/icons-material';
import { demoTasks } from '../../services/mockData';

const typeIcons: Record<string, React.ReactNode> = { EMAIL: <Email sx={{ fontSize: 18 }} />, MEETING: <CalendarMonth sx={{ fontSize: 18 }} />, CALL: <Phone sx={{ fontSize: 18 }} />, FOLLOW_UP: <Refresh sx={{ fontSize: 18 }} />, REVIEW: <Assignment sx={{ fontSize: 18 }} /> };

const columns = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

export function TaskBoardPage() {
  const navigate = useNavigate();
  const [tasks] = useState(demoTasks);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Task Board</Typography>
        <Button variant="outlined" onClick={() => navigate('/tasks')} sx={{ borderRadius: 2 }}>List View</Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 200px)' }}>
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col);
          const colLabel = col === 'PENDING' ? 'To Do' : col === 'IN_PROGRESS' ? 'In Progress' : 'Done';
          const colColor = col === 'PENDING' ? '#F7A83E' : col === 'IN_PROGRESS' ? '#4A90D9' : '#1BA672';
          
          return (
            <Box key={col} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: colColor }} />
                  <Typography variant="subtitle2" fontWeight={600}>{colLabel}</Typography>
                  <Typography variant="caption" color="text.secondary">({colTasks.length})</Typography>
                </Box>
                <IconButton size="small"><Add sx={{ fontSize: 18 }} /></IconButton>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5, p: 1, bgcolor: '#FAFAFA', borderRadius: 2, border: '1px solid #F0F0F0' }}>
                {colTasks.map(task => (
                  <Card key={task.id} sx={{ borderRadius: 2, cursor: 'pointer', '&:hover': { boxShadow: '0 2px 12px rgba(0,0,0,0.08)' } }} onClick={() => navigate(`/tasks/${task.id}`)}>
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ color: '#E23744', display: 'flex' }}>{typeIcons[task.type]}</Box>
                        <Chip label={task.priority} size="small" sx={{ fontSize: '0.625rem', fontWeight: 600, height: 20 }} />
                      </Box>
                      <Typography variant="body2" fontWeight={500} mb={0.5}>{task.title}</Typography>
                      <Typography variant="caption" color="text.secondary">Due {new Date(task.dueDate).toLocaleDateString()}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
