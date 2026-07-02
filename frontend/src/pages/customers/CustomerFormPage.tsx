import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function CustomerFormPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1000);
  };

  if (success) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Box sx={{ fontSize: 48, mb: 2 }}>✅</Box>
        <Typography variant="h5" fontWeight={700} mb={1}>Customer created!</Typography>
        <Button variant="contained" onClick={() => navigate('/customers')} sx={{ borderRadius: 2, mt: 2 }}>View Customers</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={1}>Add New Customer</Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>Enter the customer's details below</Typography>
      <form onSubmit={handleSubmit}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField label="Full Name" fullWidth required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Company" fullWidth required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Email" type="email" fullWidth required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Phone" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                  <InputLabel>Industry</InputLabel>
                  <Select label="Industry">
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}><TextField label="Location" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Contact Person" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Website" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12}><TextField label="Notes" multiline rows={3} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => navigate('/customers')} sx={{ borderRadius: 2, py: 1.5, px: 3 }}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={loading} sx={{ borderRadius: 2, py: 1.5, px: 4 }}>
                {loading ? 'Saving...' : 'Save Customer'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
