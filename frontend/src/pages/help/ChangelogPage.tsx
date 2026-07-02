import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { demoChangelog } from '../../services/mockData';

export function ChangelogPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>Changelog</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>What's new in AtlasAI</Typography>

      {demoChangelog.map((entry) => (
        <Card key={entry.version} sx={{ borderRadius: 2, mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
              <Typography variant="h6" fontWeight={700}>v{entry.version}</Typography>
              <Chip label={entry.date} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
              {entry === demoChangelog[0] && <Chip label="Latest" size="small" sx={{ bgcolor: '#E23744', color: '#FFF', fontSize: '0.625rem', fontWeight: 600 }} />}
            </Box>
            {entry.features.length > 0 && (
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={600} color="success.main" mb={0.5}>🚀 New Features</Typography>
                {entry.features.map((f, i) => <Typography key={i} variant="body2" color="text.secondary" sx={{ pl: 2 }}>• {f}</Typography>)}
              </Box>
            )}
            {entry.fixes.length > 0 && (
              <Box>
                <Typography variant="subtitle2" fontWeight={600} color="#E23744" mb={0.5}>🐛 Bug Fixes</Typography>
                {entry.fixes.map((f, i) => <Typography key={i} variant="body2" color="text.secondary" sx={{ pl: 2 }}>• {f}</Typography>)}
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
