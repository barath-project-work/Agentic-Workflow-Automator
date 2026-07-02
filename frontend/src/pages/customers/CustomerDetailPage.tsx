import { Box, Typography, Card, CardContent, Grid, Chip, Avatar, Button, IconButton, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Email, Phone, Edit, Schedule, Business, LocationOn } from '@mui/icons-material';
import { getCustomerById, getOpportunitiesByCustomer, getTasksByCustomer } from '../../services/mockData';

export function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = getCustomerById(id || '') || getCustomerById('cust_001')!;
  const opportunities = getOpportunitiesByCustomer(customer.id);
  const tasks = getTasksByCustomer(customer.id);

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/customers')} sx={{ mb: 2, color: '#696969', fontFamily: 'Inter' }}>Back to Customers</Button>

      <Grid container spacing={3}>
        {/* Customer Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: '#FFF5F5', color: '#E23744', fontSize: '1.5rem', fontWeight: 600, mx: 'auto', mb: 1.5 }}>
                {customer.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Typography variant="h6" fontWeight={600}>{customer.name}</Typography>
              <Typography variant="body2" color="text.secondary">{customer.company}</Typography>
              <Chip label={customer.status} size="small" sx={{ mt: 1, fontWeight: 500,
                bgcolor: customer.status === 'active' ? '#E8F5E9' : '#F5F5F5',
                color: customer.status === 'active' ? '#1BA672' : '#9C9C9C' }} />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Email sx={{ fontSize: 18, color: '#9C9C9C' }} /><Typography variant="body2">{customer.email}</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Phone sx={{ fontSize: 18, color: '#9C9C9C' }} /><Typography variant="body2">{customer.phone}</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocationOn sx={{ fontSize: 18, color: '#9C9C9C' }} /><Typography variant="body2">{customer.location}</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Business sx={{ fontSize: 18, color: '#9C9C9C' }} /><Typography variant="body2">{customer.industry}</Typography></Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" size="small" startIcon={<Email />} sx={{ borderRadius: 2, flex: 1 }}>Email</Button>
                <Button variant="outlined" size="small" startIcon={<Schedule />} sx={{ borderRadius: 2, flex: 1 }}>Meeting</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          {/* Contact Info */}
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" fontWeight={600}>Contact Info</Typography>
                <Box><IconButton size="small"><Edit sx={{ fontSize: 18 }} /></IconButton></Box>
              </Box>
              <Typography variant="body2" color="text.secondary">Contact Person: <strong>{customer.contactPerson}</strong></Typography>
              <Typography variant="body2" color="text.secondary">Last Contacted: <strong>{new Date(customer.lastContacted).toLocaleDateString()}</strong></Typography>
              {customer.notes && <Typography variant="body2" color="text.secondary" mt={1}>Notes: {customer.notes}</Typography>}
              <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5 }}>
                {customer.tags.map(t => <Chip key={t} label={t} size="small" sx={{ bgcolor: '#FFF5F5', color: '#E23744' }} />)}
              </Box>
            </CardContent>
          </Card>

          {/* Opportunities */}
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={1.5}>Opportunities ({opportunities.length})</Typography>
              {opportunities.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No opportunities yet.</Typography>
              ) : (
                opportunities.map((opp, i) => (
                  <Box key={opp.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: i < opportunities.length - 1 ? 1 : 0, borderColor: 'divider' }}>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>{opp.name}</Typography>
                      <Typography variant="caption" color="text.secondary">₹{opp.value.toLocaleString()} · Close {new Date(opp.closeDate).toLocaleDateString()}</Typography>
                    </Box>
                    <Chip label={opp.stage} size="small" sx={{ fontWeight: 500, fontSize: '0.6875rem' }} />
                  </Box>
                ))
              )}
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={1.5}>Tasks ({tasks.length})</Typography>
              {tasks.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No tasks yet.</Typography>
              ) : (
                tasks.map((t, i) => (
                  <Box key={t.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: i < tasks.length - 1 ? 1 : 0, borderColor: 'divider' }}>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>{t.title}</Typography>
                      <Typography variant="caption" color="text.secondary">Due {new Date(t.dueDate).toLocaleDateString()}</Typography>
                    </Box>
                    <Chip label={t.status} size="small" sx={{ fontWeight: 500, fontSize: '0.6875rem' }} />
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
