import { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, Button, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, AutoAwesome } from '@mui/icons-material';
import { demoTemplates } from '../../services/mockData';

export function WorkflowTemplatesPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const categories = ['All', 'Lead Generation', 'Marketing', 'Sales', 'Reporting', 'Upsell'];

  const filtered = demoTemplates.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Workflow Templates</Typography>
        <Button variant="outlined" onClick={() => navigate('/workflows/create')} sx={{ borderRadius: 2 }}>Create Custom</Button>
      </Box>

      <TextField size="small" placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3, maxWidth: 400, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 20, color: '#9C9C9C' }} /></InputAdornment> }}
      />

      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {categories.map((cat) => <Chip key={cat} label={cat} variant="outlined" sx={{ borderRadius: 2, fontWeight: 500, '&:hover': { borderColor: '#E23744' } }} />)}
      </Box>

      <Grid container spacing={2}>
        {filtered.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t.id}>
            <Card sx={{ borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' } }} onClick={() => navigate('/workflows/create')}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip label={t.category} size="small" sx={{ bgcolor: '#FFF5F5', color: '#E23744', fontWeight: 500, fontSize: '0.6875rem' }} />
                  {t.popular && <Chip label="Popular" size="small" icon={<AutoAwesome sx={{ fontSize: 12 }} />} sx={{ bgcolor: '#FFF8E1', color: '#F7A83E', fontWeight: 500, fontSize: '0.6875rem' }} />}
                </Box>
                <Typography variant="body1" fontWeight={600} mb={0.5}>{t.title}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1.5}>{t.description}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">{t.steps} steps</Typography>
                  <Typography variant="caption" color="text.secondary">{t.useCount} uses</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
