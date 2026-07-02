import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, Slider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function OpportunityFormPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/opportunities'); }, 1000);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={1}>New Opportunity</Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>Enter the deal details</Typography>
      <form onSubmit={handleSubmit}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField label="Deal Name" fullWidth required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                  <InputLabel>Stage</InputLabel>
                  <Select label="Stage" defaultValue="PROSPECT">
                    <MenuItem value="PROSPECT">Prospect</MenuItem>
                    <MenuItem value="QUALIFIED">Qualified</MenuItem>
                    <MenuItem value="PROPOSAL">Proposal</MenuItem>
                    <MenuItem value="NEGOTIATION">Negotiation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}><TextField label="Value (₹)" type="number" fullWidth required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Close Date" type="date" fullWidth InputLabelProps={{ shrink: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Customer" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary" gutterBottom display="block">Probability</Typography>
                <Slider defaultValue={50} sx={{ color: '#E23744' }} valueLabelDisplay="auto" />
              </Grid>
              <Grid item xs={12}><TextField label="Description" multiline rows={3} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => navigate('/opportunities')} sx={{ borderRadius: 2, py: 1.5, px: 3 }}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={loading} sx={{ borderRadius: 2, py: 1.5, px: 4 }}>{loading ? 'Saving...' : 'Save'}</Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
