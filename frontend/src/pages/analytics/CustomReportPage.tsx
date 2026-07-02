import { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from '@mui/material';

const metrics = ['Revenue', 'Workflows', 'Tasks', 'Emails Sent', 'Meetings', 'Conversion Rate'];
const dimensions = ['Date', 'User', 'Customer', 'Industry', 'Location'];

export function CustomReportPage() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['Revenue', 'Workflows']);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Custom Report</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle2" fontWeight={600}>Report Configuration</Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Metrics</InputLabel>
                <Select multiple value={selectedMetrics} onChange={(e) => setSelectedMetrics(e.target.value as string[])}
                  input={<OutlinedInput label="Metrics" />} renderValue={(selected) => selected.join(', ')}
                  sx={{ borderRadius: 2 }}>
                  {metrics.map(m => <MenuItem key={m} value={m}><Checkbox checked={selectedMetrics.indexOf(m) > -1} /><ListItemText primary={m} /></MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Group By</InputLabel>
                <Select label="Group By" defaultValue="Date" sx={{ borderRadius: 2 }}>
                  {dimensions.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Chart Type</InputLabel>
                <Select label="Chart Type" defaultValue="bar" sx={{ borderRadius: 2 }}>
                  <MenuItem value="bar">Bar Chart</MenuItem>
                  <MenuItem value="line">Line Chart</MenuItem>
                  <MenuItem value="pie">Pie Chart</MenuItem>
                  <MenuItem value="table">Table</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" fullWidth sx={{ borderRadius: 2 }}>Generate Report</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontSize: '3rem', mb: 1 }}>📊</Typography>
              <Typography variant="body1" color="text.secondary">Configure and generate your custom report</Typography>
              <Typography variant="caption" color="text.secondary">Select metrics and dimensions from the left panel</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
