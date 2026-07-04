import { Box, Typography, Card, CardContent, Chip, Avatar, Button, Divider, CircularProgress, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Email, Phone, Edit, Schedule, Business, LocationOn } from '@mui/icons-material';
import { useCustomer } from '../../hooks/useCustomers';
import { useOpportunitiesByCustomer } from '../../hooks/useOpportunities';

export function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: customer, isLoading, error } = useCustomer(id || '');
  const { data: opportunities } = useOpportunitiesByCustomer(id || '');

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !customer) {
    return (
      <Box>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/customers')} sx={{ mb: 2, color: '#696969', fontFamily: 'Inter' }}>Back to Customers</Button>
        <Alert severity="error" sx={{ borderRadius: 2 }}>Customer not found or failed to load.</Alert>
      </Box>
    );
  }

  const tags = customer.tags ? customer.tags.split(',').map(t => t.trim()) : [];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/customers')} sx={{ mb: 2, color: '#696969', fontFamily: 'Inter' }}>Back to Customers</Button>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Customer Info Sidebar */}
        <Box sx={{ flex: '1 1 300px', minWidth: 280 }}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: '#FFF5F5', color: '#E23744', fontSize: '1.5rem', fontWeight: 600, mx: 'auto', mb: 1.5 }}>
                {customer.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Typography variant="h6" fontWeight={600}>{customer.name}</Typography>
              <Typography variant="body2" color="text.secondary">{customer.company}</Typography>
              <Chip label={customer.status?.toLowerCase() || 'lead'} size="small" sx={{ mt: 1, fontWeight: 500,
                bgcolor: customer.status === 'ACTIVE' ? '#E8F5E9' : '#F5F5F5',
                color: customer.status === 'ACTIVE' ? '#1BA672' : '#9C9C9C' }} />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {customer.email && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Email sx={{ fontSize: 18, color: '#9C9C9C' }} /><Typography variant="body2">{customer.email}</Typography></Box>}
                {customer.phone && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Phone sx={{ fontSize: 18, color: '#9C9C9C' }} /><Typography variant="body2">{customer.phone}</Typography></Box>}
                {customer.location && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocationOn sx={{ fontSize: 18, color: '#9C9C9C' }} /><Typography variant="body2">{customer.location}</Typography></Box>}
                {customer.industry && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Business sx={{ fontSize: 18, color: '#9C9C9C' }} /><Typography variant="body2">{customer.industry}</Typography></Box>}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" size="small" startIcon={<Email />} sx={{ borderRadius: 2, flex: 1 }}>Email</Button>
                <Button variant="outlined" size="small" startIcon={<Schedule />} sx={{ borderRadius: 2, flex: 1 }}>Meeting</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: '2 1 500px' }}>
          {/* Contact Info */}
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" fontWeight={600}>Contact Info</Typography>
                <Box>
                  <Button size="small" startIcon={<Edit />} onClick={() => navigate(`/customers/${customer.id}/edit`)} sx={{ color: '#E23744', textTransform: 'none' }}>Edit</Button>
                </Box>
              </Box>
              {customer.contactPerson && <Typography variant="body2" color="text.secondary">Contact Person: <strong>{customer.contactPerson}</strong></Typography>}
              {customer.lastContacted && <Typography variant="body2" color="text.secondary">Last Contacted: <strong>{new Date(customer.lastContacted).toLocaleDateString()}</strong></Typography>}
              {customer.notes && <Typography variant="body2" color="text.secondary" mt={1}>Notes: {customer.notes}</Typography>}
              {tags.length > 0 && (
                <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5 }}>
                  {tags.map(t => <Chip key={t} label={t} size="small" sx={{ bgcolor: '#FFF5F5', color: '#E23744' }} />)}
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Opportunities */}
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={1.5}>Opportunities ({opportunities?.length || 0})</Typography>
              {!opportunities || opportunities.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No opportunities yet.</Typography>
              ) : (
                opportunities.map((opp, i) => (
                  <Box key={opp.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: i < opportunities.length - 1 ? 1 : 0, borderColor: 'divider', cursor: 'pointer' }} onClick={() => navigate(`/opportunities/${opp.id}`)}>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>{opp.name}</Typography>
                      <Typography variant="caption" color="text.secondary">₹{opp.value?.toLocaleString() || 'N/A'} · Close {opp.closeDate ? new Date(opp.closeDate).toLocaleDateString() : 'N/A'}</Typography>
                    </Box>
                    <Chip label={opp.stage} size="small" sx={{ fontWeight: 500, fontSize: '0.6875rem' }} />
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
