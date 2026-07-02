import { Box, Grid, Card, CardContent, Typography, Chip, Button, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Loop, People, Email, CalendarMonth, TrendingUp, TrendingDown, Add } from '@mui/icons-material';
import { demoMetrics, weeklyActivity, demoWorkflows, demoTasks, demoNotifications } from '../../services/mockData';

export function DashboardPage() {
  const navigate = useNavigate();
  const iconMap: Record<string, React.ReactNode> = {
    workflow: <Loop sx={{ fontSize: 24 }} />,
    task: <People sx={{ fontSize: 24 }} />,
    email: <Email sx={{ fontSize: 24 }} />,
    calendar: <CalendarMonth sx={{ fontSize: 24 }} />,
    chart: <TrendingUp sx={{ fontSize: 24 }} />,
    people: <People sx={{ fontSize: 24 }} />,
  };

  const runningWorkflows = demoWorkflows.filter(w => w.status === 'RUNNING');
  const pendingTasks = demoTasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS');
  const unreadNotifs = demoNotifications.filter(n => !n.read);

  return (
    <Box>
      {/* Welcome */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">Dashboard</Typography>
          <Typography variant="body2" color="text.secondary" fontFamily="Inter, sans-serif">Here's what's happening today.</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/workflows/create')} sx={{ borderRadius: 2, py: 1, px: 3 }}>
          New Workflow
        </Button>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={2} mb={3}>
        {demoMetrics.map((m) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={m.label}>
            <Card sx={{ borderRadius: 2, transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' } }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color }}>
                    {iconMap[m.icon] || <Loop sx={{ fontSize: 20 }} />}
                  </Box>
                  {m.change > 0 ? <TrendingUp sx={{ fontSize: 16, color: '#1BA672' }} /> : <TrendingDown sx={{ fontSize: 16, color: '#E23744' }} />}
                </Box>
                <Typography variant="h5" fontWeight={700} sx={{ color: m.color }}>{m.value}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>{m.label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: m.change >= 0 ? '#1BA672' : '#E23744' }}>{m.change > 0 ? '+' : ''}{m.change}%</Typography>
                  <Typography variant="caption" color="text.secondary">{m.changeLabel}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Active Workflows */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Active Workflows</Typography>
                <Button size="small" endIcon={<ArrowForward />} onClick={() => navigate('/workflows')} sx={{ color: '#E23744', fontWeight: 500, textTransform: 'none' }}>View All</Button>
              </Box>
              {runningWorkflows.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Loop sx={{ fontSize: 40, color: '#D0D0D0', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">No active workflows</Typography>
                  <Button variant="text" onClick={() => navigate('/workflows/create')} sx={{ color: '#E23744', mt: 1 }}>Create one →</Button>
                </Box>
              ) : (
                runningWorkflows.map((wf) => {
                  const completed = wf.steps.filter(s => s.status === 'COMPLETED').length;
                  const total = wf.steps.length;
                  return (
                    <Box key={wf.id} sx={{ py: 1.5, borderBottom: 1, borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: '#FFFAFA', mx: -1, px: 1, borderRadius: 1 } }} onClick={() => navigate(`/workflows/${wf.id}`)}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={500} sx={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{wf.goal}</Typography>
                        <Chip label="RUNNING" size="small" sx={{ bgcolor: '#E3F2FD', color: '#4A90D9', fontWeight: 600, fontSize: '0.625rem', height: 22 }} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress variant="determinate" value={(completed / total) * 100} sx={{ flex: 1, height: 6, borderRadius: 3, bgcolor: '#F0F0F0', '& .MuiLinearProgress-bar': { bgcolor: '#4A90D9', borderRadius: 3 } }} />
                        <Typography variant="caption" color="text.secondary">{completed}/{total}</Typography>
                      </Box>
                    </Box>
                  );
                })
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Tasks */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Pending Tasks</Typography>
                <Button size="small" endIcon={<ArrowForward />} onClick={() => navigate('/tasks')} sx={{ color: '#E23744', fontWeight: 500, textTransform: 'none' }}>View All</Button>
              </Box>
              {pendingTasks.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">All caught up! 🎉</Typography>
                </Box>
              ) : (
                pendingTasks.slice(0, 5).map((task) => (
                  <Box key={task.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.25, borderBottom: 1, borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: '#FFFAFA', mx: -1, px: 1, borderRadius: 1 } }} onClick={() => navigate(`/tasks/${task.id}`)}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: task.status === 'IN_PROGRESS' ? '#4A90D9' : '#F7A83E', flexShrink: 0 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={500}>{task.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{task.relatedEntityName} · Due {new Date(task.dueDate).toLocaleDateString()}</Typography>
                    </Box>
                    <Chip label={task.type.replace('_', ' ')} size="small" sx={{ fontSize: '0.625rem', height: 22, bgcolor: '#FFF5F5', color: '#E23744' }} />
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Activity */}
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Weekly Activity</Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 160 }}>
                {weeklyActivity.map((d) => {
                  const maxVal = Math.max(...weeklyActivity.map(w => w.workflows + w.emails));
                  return (
                    <Box key={d.day} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', gap: 0.25, alignItems: 'flex-end', height: 140 }}>
                        <Box sx={{ width: 10, height: (d.emails / maxVal) * 140, bgcolor: '#E23744', borderRadius: '4px 4px 0 0', opacity: 0.6 }} />
                        <Box sx={{ width: 10, height: (d.workflows / maxVal) * 140, bgcolor: '#4A90D9', borderRadius: '4px 4px 0 0' }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">{d.day}</Typography>
                    </Box>
                  );
                })}
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Box sx={{ width: 8, height: 8, bgcolor: '#E23744', borderRadius: '2px', opacity: 0.6 }} /><Typography variant="caption">Emails</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Box sx={{ width: 8, height: 8, bgcolor: '#4A90D9', borderRadius: '2px' }} /><Typography variant="caption">Workflows</Typography></Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Notifications */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Recent Activity</Typography>
              {unreadNotifs.slice(0, 4).map((n) => (
                <Box key={n.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1.25, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#E23744', mt: 0.75, flexShrink: 0 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={500}>{n.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{n.message}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
