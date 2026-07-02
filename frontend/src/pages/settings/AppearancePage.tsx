import { Box, Typography, Card, CardContent, ToggleButton, ToggleButtonGroup, Slider, Button } from '@mui/material';
import { useState } from 'react';

export function AppearancePage() {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(14);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={3}>Appearance</Typography>
      
      <Card sx={{ borderRadius: 2, mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="subtitle2" fontWeight={600}>Theme</Typography>
          <ToggleButtonGroup value={theme} exclusive onChange={(_, v) => v && setTheme(v)} fullWidth>
            <ToggleButton value="light" sx={{ borderRadius: '8px 0 0 8px', textTransform: 'none' }}>☀️ Light</ToggleButton>
            <ToggleButton value="dark" sx={{ textTransform: 'none' }}>🌙 Dark</ToggleButton>
            <ToggleButton value="system" sx={{ borderRadius: '0 8px 8px 0', textTransform: 'none' }}>💻 System</ToggleButton>
          </ToggleButtonGroup>

          <Typography variant="subtitle2" fontWeight={600}>Font Size</Typography>
          <Slider value={fontSize} onChange={(_, v) => setFontSize(v as number)} min={12} max={20} step={1}
            valueLabelDisplay="auto" valueLabelFormat={v => `${v}px`} sx={{ color: '#E23744', maxWidth: 300 }} />

          <Box sx={{ p: 2, bgcolor: '#F9F9F9', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontSize: `${fontSize}px`, fontFamily: 'Inter, sans-serif' }}>
              Preview text — This is how your content will appear.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{ borderRadius: 2, px: 4 }}>Apply</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
