import { Box, Typography, Card, CardContent, Grid, Chip, Button, TextField } from '@mui/material';
import { useState } from 'react';

const templates = [
  { name: 'Follow-Up Email', category: 'Sales', variables: ['customer.name', 'company', 'product'], lastEdited: '2026-06-25' },
  { name: 'Welcome Email', category: 'Onboarding', variables: ['customer.name', 'company'], lastEdited: '2026-06-20' },
  { name: 'Meeting Reminder', category: 'Meetings', variables: ['customer.name', 'datetime', 'location'], lastEdited: '2026-06-15' },
  { name: 'Quarterly Review', category: 'Reporting', variables: ['customer.name', 'period', 'metrics'], lastEdited: '2026-06-10' },
];

export function EmailTemplatesPage() {
  const [selected, setSelected] = useState(templates[0]);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Email Templates</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {templates.map((t) => (
                <Box key={t.name} onClick={() => setSelected(t)} sx={{ p: 1.5, borderRadius: 2, cursor: 'pointer', bgcolor: selected.name === t.name ? '#FFF5F5' : 'transparent', '&:hover': { bgcolor: '#FAFAFA' } }}>
                  <Typography variant="body2" fontWeight={600}>{t.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{t.category} · Updated {t.lastEdited}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Subject" defaultValue={`Hi {{customer.name}}, checking in`} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              <TextField label="Body" multiline rows={8} defaultValue={`Dear {{customer.name}},\n\nI wanted to follow up with you regarding {{company}} and our {{product}}.\n\nBest regards,\n{{sender.name}}`} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              <Box>
                <Typography variant="caption" color="text.secondary" mb={0.5}>Available Variables</Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {selected.variables.map(v => <Chip key={v} label={`{{${v}}}`} size="small" sx={{ bgcolor: '#FFF5F5', color: '#E23744', fontFamily: 'monospace' }} />)}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" sx={{ borderRadius: 2 }}>Preview</Button>
                <Button variant="contained" sx={{ borderRadius: 2 }}>Save</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
