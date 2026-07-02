import { Box, Typography, Card, CardContent, Switch, FormControlLabel, Divider, Button } from '@mui/material';

const notificationGroups = [
  { title: 'Workflows', items: [
    { label: 'Workflow completed', checked: true },
    { label: 'Workflow failed', checked: true },
    { label: 'Workflow started', checked: false },
  ]},
  { title: 'Tasks', items: [
    { label: 'Task assigned', checked: true },
    { label: 'Task overdue', checked: true },
    { label: 'Task completed', checked: false },
  ]},
  { title: 'Emails & Meetings', items: [
    { label: 'Email sent', checked: true },
    { label: 'Email bounced', checked: true },
    { label: 'Meeting confirmed', checked: true },
  ]},
  { title: 'System', items: [
    { label: 'Integration disconnected', checked: true },
    { label: 'API key expiring', checked: true },
    { label: 'System updates', checked: false },
  ]},
];

export function NotificationSettingsPage() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={3}>Notification Preferences</Typography>
      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {notificationGroups.map((group) => (
            <Box key={group.title}>
              <Typography variant="subtitle2" fontWeight={600} mb={1} color="text.secondary">{group.title}</Typography>
              {group.items.map((item) => (
                <FormControlLabel key={item.label} control={<Switch defaultChecked={item.checked} sx={{ '& .MuiSwitch-thumb': { bgcolor: item.checked ? '#E23744 !important' : undefined }, '& .MuiSwitch-track': { bgcolor: item.checked ? '#FFCDD2 !important' : undefined } }} />} label={item.label} sx={{ display: 'block', ml: 0 }} />
              ))}
              <Divider sx={{ my: 1.5 }} />
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{ borderRadius: 2, px: 4 }}>Save Preferences</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
