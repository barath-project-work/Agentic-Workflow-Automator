import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Grid, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateOpportunity } from '../../hooks/useOpportunities';

export function OpportunityFormPage() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [stage, setStage] = useState('PROSPECT');
  const [closeDate, setCloseDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const createOpportunity = useCreateOpportunity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name) {
      setError('Deal name is required');
      return;
    }

    try {
      await createOpportunity.mutateAsync({
        name,
        customerName: customerName || undefined,
        stage,
        value: value ? parseFloat(value) : undefined,
        closeDate: closeDate || undefined,
        description: description || undefined,
      });
      navigate('/opportunities');
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to create opportunity');
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={1}>New Opportunity</Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>Enter the deal details</Typography>

      {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Deal Name" fullWidth required value={name} onChange={(e) => setName(e.target.value)}
                  disabled={createOpportunity.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Customer Name" fullWidth value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                  disabled={createOpportunity.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Value (₹)" type="number" fullWidth value={value} onChange={(e) => setValue(e.target.value)}
                  disabled={createOpportunity.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Close Date" type="date" fullWidth value={closeDate} onChange={(e) => setCloseDate(e.target.value)}
                  InputLabelProps={{ shrink: true }} disabled={createOpportunity.isPending}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Stage" fullWidth value={stage} onChange={(e) => setStage(e.target.value)}
                  disabled={createOpportunity.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Description" multiline rows={3} fullWidth value={description} onChange={(e) => setDescription(e.target.value)}
                  disabled={createOpportunity.isPending} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => navigate('/opportunities')} sx={{ borderRadius: 2, py: 1.5, px: 3 }}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={createOpportunity.isPending} sx={{ borderRadius: 2, py: 1.5, px: 4 }}>
                {createOpportunity.isPending ? <CircularProgress size={20} sx={{ color: '#FFF' }} /> : 'Save'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
