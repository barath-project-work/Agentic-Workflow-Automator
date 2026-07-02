import { Box, Typography, Card, CardContent, Grid, Chip, Checkbox, FormControlLabel, Divider } from '@mui/material';

const roles = [
  { name: 'Admin', users: 2, permissions: { workflows: true, customers: true, tasks: true, analytics: true, admin: true } },
  { name: 'Manager', users: 3, permissions: { workflows: true, customers: true, tasks: true, analytics: true, admin: false } },
  { name: 'User', users: 8, permissions: { workflows: true, customers: true, tasks: true, analytics: false, admin: false } },
];

export function RoleManagementPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Role Management</Typography>
      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item xs={12} md={4} key={role.name}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>{role.name}</Typography>
                  <Chip label={`${role.users} users`} size="small" sx={{ bgcolor: '#FFF5F5', color: '#E23744' }} />
                </Box>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(role.permissions).map(([key, val]) => (
                  <FormControlLabel key={key} control={<Checkbox checked={val} sx={{ '&.Mui-checked': { color: '#E23744' } }} />}
                    label={key.charAt(0).toUpperCase() + key.slice(1)} sx={{ display: 'block', mb: 0.5 }}
                  />
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
