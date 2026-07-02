import { Box, Typography, Card, CardContent, Grid, Chip, TextField, InputAdornment } from '@mui/material';
import { Search, Book, AutoAwesome, People, Settings, Api } from '@mui/icons-material';

const sections = [
  { title: 'Getting Started', desc: 'Learn the basics of AtlasAI', icon: <Book />, articles: 12, color: '#4A90D9' },
  { title: 'Workflows', desc: 'Create and manage AI workflows', icon: <AutoAwesome />, articles: 18, color: '#E23744' },
  { title: 'CRM & Customers', desc: 'Manage your customer database', icon: <People />, articles: 8, color: '#1BA672' },
  { title: 'Admin Guide', desc: 'System configuration and user management', icon: <Settings />, articles: 10, color: '#F7A83E' },
  { title: 'API Reference', desc: 'Integrate with AtlasAI APIs', icon: <Api />, articles: 14, color: '#9B59B6' },
];

export function DocsPage() {
  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>Documentation</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>Learn how to get the most out of AtlasAI</Typography>
        <TextField placeholder="Search documentation..." size="medium" sx={{ maxWidth: 500, width: '100%', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#9C9C9C' }} /></InputAdornment> }}
        />
      </Box>
      <Grid container spacing={2}>
        {sections.map((s) => (
          <Grid item xs={12} sm={6} md={4} key={s.title}>
            <Card sx={{ borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' } }}>
              <CardContent>
                <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, mb: 1.5 }}>{s.icon}</Box>
                <Typography variant="body1" fontWeight={600} mb={0.5}>{s.title}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1.5}>{s.desc}</Typography>
                <Chip label={`${s.articles} articles`} size="small" sx={{ bgcolor: '#F5F5F5' }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
