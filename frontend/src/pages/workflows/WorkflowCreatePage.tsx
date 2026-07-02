import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, TextField, Button, Select, MenuItem, FormControl, InputLabel, Slider, Chip, Alert, CircularProgress, Grid } from '@mui/material';
import { AutoAwesome, Rocket, LocationOn } from '@mui/icons-material';
import { demoTemplates } from '../../services/mockData';

export function WorkflowCreatePage() {
  const [goal, setGoal] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [days, setDays] = useState(10);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const suggestions = [
    'Follow up with healthcare leads in Chennai',
    'Send promotional campaign to tech startups in Bangalore',
    'Schedule quarterly review meetings with top 10 clients',
    'Re-engage dormant leads from last quarter',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal) { setError('Please describe what you want to accomplish'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/workflows/wf_001'), 1500);
    }, 2000);
  };

  if (success) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Box sx={{ fontSize: 56, mb: 2 }}>🚀</Box>
        <Typography variant="h4" fontWeight={700} mb={1}>Workflow Started!</Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>Your AI agent is now working on your request.</Typography>
        <Button variant="contained" onClick={() => navigate('/workflows/wf_001')} sx={{ borderRadius: 2, py: 1.5, px: 4 }}>View Progress</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em" mb={1}>Create New Workflow</Typography>
      <Typography variant="body2" color="text.secondary" mb={4} fontFamily="Inter, sans-serif">
        Describe what you want your AI agent to accomplish
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>{error}</Alert>}

      {/* Quick suggestions */}
      <Card sx={{ mb: 3, borderRadius: 2, bgcolor: '#FFF5F5' }}>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={600} mb={1.5} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesome sx={{ fontSize: 18, color: '#E23744' }} /> Suggestions
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {suggestions.map((s) => (
              <Chip key={s} label={s} onClick={() => setGoal(s)} variant="outlined"
                sx={{ borderRadius: 2, fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', '&:hover': { borderColor: '#E23744', color: '#E23744' } }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField label="What would you like to accomplish?" multiline rows={4} fullWidth required
                placeholder="e.g., Follow up with healthcare leads in Chennai who haven't been contacted in 2 weeks"
                value={goal} onChange={(e) => setGoal(e.target.value)} disabled={loading}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <Typography variant="subtitle2" fontWeight={600} color="text.secondary">Advanced Options</Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                    <InputLabel>Industry</InputLabel>
                    <Select value={industry} label="Industry" onChange={(e) => setIndustry(e.target.value)} disabled={loading}>
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value="Healthcare">Healthcare</MenuItem>
                      <MenuItem value="Technology">Technology</MenuItem>
                      <MenuItem value="Finance">Finance</MenuItem>
                      <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                      <MenuItem value="Retail">Retail</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth size="small" label="Location" placeholder="e.g., Chennai" value={location}
                    onChange={(e) => setLocation(e.target.value)} disabled={loading}
                    InputProps={{ startAdornment: <LocationOn sx={{ fontSize: 18, color: '#9C9C9C', mr: 0.5 }} /> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ px: 1 }}>
                    <Typography variant="caption" color="text.secondary" mb={0.5} display="block">
                      Days since last contact: {days}
                    </Typography>
                    <Slider value={days} onChange={(_, v) => setDays(v as number)} min={1} max={90}
                      sx={{ color: '#E23744', '& .MuiSlider-thumb': { width: 16, height: 16 } }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Templates */}
          <Typography variant="subtitle2" fontWeight={600} mb={-1}>Or start from a template</Typography>
          <Grid container spacing={1.5}>
            {demoTemplates.slice(0, 4).map((t) => (
              <Grid item xs={6} sm={3} key={t.id}>
                <Card sx={{ borderRadius: 2, cursor: 'pointer', transition: 'all 0.15s', '&:hover': { borderColor: '#E23744', transform: 'translateY(-1px)' } }}
                  onClick={() => setGoal(t.description)}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="caption" color="primary" fontWeight={600}>{t.category}</Typography>
                    <Typography variant="body2" fontWeight={600} mt={0.5}>{t.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>{t.steps} steps</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => navigate('/workflows')} disabled={loading} sx={{ borderRadius: 2, py: 1.5, px: 3 }}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading} sx={{ borderRadius: 2, py: 1.5, px: 4 }} startIcon={loading ? <CircularProgress size={20} sx={{ color: '#FFF' }} /> : <Rocket />}>
              {loading ? 'Starting...' : 'Start Workflow'}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
