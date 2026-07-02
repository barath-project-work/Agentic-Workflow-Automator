import { Box, Typography, Card, CardContent, Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel } from '@mui/material';

export function SystemSettingsPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>System Settings</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Typography variant="h6" fontWeight={600}>General</Typography>
              <TextField label="Company Name" defaultValue="AtlasAI Inc." fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              <FormControl fullWidth size="small"><InputLabel>Timezone</InputLabel><Select label="Timezone" defaultValue="IST" sx={{ borderRadius: 2 }}><MenuItem value="IST">Asia/Kolkata (IST)</MenuItem><MenuItem value="EST">America/New_York (EST)</MenuItem><MenuItem value="PST">America/Los_Angeles (PST)</MenuItem></Select></FormControl>
              <TextField label="Date Format" defaultValue="DD/MM/YYYY" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Typography variant="h6" fontWeight={600}>Security</Typography>
              <TextField label="Session Timeout (minutes)" defaultValue="60" type="number" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              <FormControlLabel control={<Switch defaultChecked />} label="Require 2FA for admin users" />
              <FormControlLabel control={<Switch defaultChecked />} label="Enable audit logging" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Typography variant="h6" fontWeight={600}>LLM Configuration</Typography>
              <TextField label="OpenAI API Key" type="password" defaultValue="sk-...••••••••••" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              <Grid container spacing={2}>
                <Grid item xs={6}><FormControl fullWidth size="small"><InputLabel>Planning Model</InputLabel><Select label="Planning Model" defaultValue="gpt4" sx={{ borderRadius: 2 }}><MenuItem value="gpt4">GPT-4 Turbo</MenuItem><MenuItem value="gpt4o">GPT-4o</MenuItem></Select></FormControl></Grid>
                <Grid item xs={6}><FormControl fullWidth size="small"><InputLabel>Execution Model</InputLabel><Select label="Execution Model" defaultValue="gpt4o" sx={{ borderRadius: 2 }}><MenuItem value="gpt4o">GPT-4o-mini</MenuItem><MenuItem value="gpt35">GPT-3.5 Turbo</MenuItem></Select></FormControl></Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" sx={{ borderRadius: 2 }}>Save Settings</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
