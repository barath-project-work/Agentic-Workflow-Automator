import { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, IconButton, TextField, InputAdornment, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, FilterList, Add, Business, LocationOn } from '@mui/icons-material';
import { demoCustomers } from '../../services/mockData';

export function CustomerListPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filtered = demoCustomers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">Customers</Typography>
        <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 2, py: 1, px: 3 }}>Add Customer</Button>
      </Box>

      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ pb: '0 !important' }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField size="small" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, maxWidth: 400, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 20, color: '#9C9C9C' }} /></InputAdornment> }}
            />
            <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}><FilterList /></IconButton>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {filtered.map((c) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={c.id}>
            <Card sx={{ borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' } }} onClick={() => navigate(`/customers/${c.id}`)}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                  <Avatar sx={{ bgcolor: '#FFF5F5', color: '#E23744', width: 40, height: 40, fontWeight: 600, fontSize: '0.875rem' }}>
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Chip label={c.status} size="small" sx={{ fontSize: '0.625rem', fontWeight: 600,
                    bgcolor: c.status === 'active' ? '#E8F5E9' : c.status === 'lead' ? '#FFF8E1' : '#F5F5F5',
                    color: c.status === 'active' ? '#1BA672' : c.status === 'lead' ? '#F7A83E' : '#9C9C9C' }} />
                </Box>
                <Typography variant="body2" fontWeight={600}>{c.name}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <Business sx={{ fontSize: 14 }} /> {c.company}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOn sx={{ fontSize: 14 }} /> {c.location}
                </Typography>
                <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {c.tags.map(t => <Chip key={t} label={t} size="small" sx={{ fontSize: '0.625rem', bgcolor: '#F5F5F5', height: 22 }} />)}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
