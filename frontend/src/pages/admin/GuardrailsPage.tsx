import { Box, Typography, Card, CardContent, Switch, Grid, TextField, Button } from '@mui/material';

const guardrails = [
  { name: 'Max Emails Per Day', desc: 'Limit total emails sent per workflow', enabled: true, value: '50' },
  { name: 'Allowed Contact Hours', desc: 'Only contact leads between specified hours', enabled: true, value: '09:00 - 18:00' },
  { name: 'Banned Industries', desc: 'Block workflows targeting restricted industries', enabled: false, value: 'Gambling, Tobacco' },
  { name: 'Max Recipients Per Email', desc: 'Limit CC/BCC recipients per email', enabled: true, value: '10' },
  { name: 'Require Approval', desc: 'Require manager approval for high-value outreach', enabled: false, value: '> ₹500,000' },
  { name: 'Content Filter', desc: 'Block emails containing sensitive keywords', enabled: true, value: 'Profanity, Competitors' },
];

export function GuardrailsPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Workflow Guardrails</Typography>
      <Grid container spacing={2}>
        {guardrails.map((g) => (
          <Grid item xs={12} md={6} key={g.name}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{g.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{g.desc}</Typography>
                  </Box>
                  <Switch checked={g.enabled} sx={{ '& .MuiSwitch-thumb': { bgcolor: g.enabled ? '#E23744 !important' : undefined }, '& .MuiSwitch-track': { bgcolor: g.enabled ? '#FFCDD2 !important' : undefined } }} />
                </Box>
                {g.enabled && <TextField size="small" label="Value" defaultValue={g.value} fullWidth sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="contained" sx={{ borderRadius: 2, px: 4 }}>Save All</Button>
      </Box>
    </Box>
  );
}
