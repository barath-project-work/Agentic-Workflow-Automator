import { Box, Typography, Card, CardContent, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';

export function ContactPage() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={1}>Contact Support</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>We're here to help. Send us a message.</Typography>

      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}><TextField label="Name" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
            <Grid item xs={6}><TextField label="Email" type="email" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
          </Grid>
          <FormControl fullWidth size="small"><InputLabel>Category</InputLabel><Select label="Category" defaultValue="" sx={{ borderRadius: 2 }}><MenuItem value="">Select a category</MenuItem><MenuItem value="bug">Bug Report</MenuItem><MenuItem value="feature">Feature Request</MenuItem><MenuItem value="account">Account Issue</MenuItem><MenuItem value="other">Other</MenuItem></Select></FormControl>
          <TextField label="Subject" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <TextField label="Message" multiline rows={5} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <Button variant="contained" size="large" sx={{ borderRadius: 2, py: 1.5 }}>Submit Ticket</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
