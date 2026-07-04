import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Grid, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateCustomer } from '../../hooks/useCustomers';

export function CustomerFormPage() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const createCustomer = useCreateCustomer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !company) {
      setError('Name and Company are required');
      return;
    }

    try {
      await createCustomer.mutateAsync({
        name, company, email, phone, industry, location,
        contactPerson, website, notes,
        status: 'LEAD',
      });
      navigate('/customers');
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to create customer');
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={1}>Add New Customer</Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>Enter the customer's details below</Typography>

      {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Full Name" fullWidth required value={name} onChange={(e) => setName(e.target.value)}
                  disabled={createCustomer.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Company" fullWidth required value={company} onChange={(e) => setCompany(e.target.value)}
                  disabled={createCustomer.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}
                  disabled={createCustomer.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)}
                  disabled={createCustomer.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Industry" fullWidth value={industry} onChange={(e) => setIndustry(e.target.value)}
                  disabled={createCustomer.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Location" fullWidth value={location} onChange={(e) => setLocation(e.target.value)}
                  disabled={createCustomer.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Contact Person" fullWidth value={contactPerson} onChange={(e) => setContactPerson(e.target.value)}
                  disabled={createCustomer.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Website" fullWidth value={website} onChange={(e) => setWebsite(e.target.value)}
                  disabled={createCustomer.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Notes" multiline rows={3} fullWidth value={notes} onChange={(e) => setNotes(e.target.value)}
                  disabled={createCustomer.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => navigate('/customers')} sx={{ borderRadius: 2, py: 1.5, px: 3 }}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={createCustomer.isPending} sx={{ borderRadius: 2, py: 1.5, px: 4 }}>
                {createCustomer.isPending ? <CircularProgress size={20} sx={{ color: '#FFF' }} /> : 'Save Customer'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
