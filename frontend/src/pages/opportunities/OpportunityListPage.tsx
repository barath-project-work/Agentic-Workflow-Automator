import { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, Button, ToggleButton, ToggleButtonGroup, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add, ViewKanban, TableChart } from '@mui/icons-material';
import { useOpportunities } from '../../hooks/useOpportunities';

const stageColors: Record<string, string> = {
  PROSPECT: '#9C9C9C', QUALIFIED: '#4A90D9', PROPOSAL: '#F7A83E',
  NEGOTIATION: '#E67E22', WON: '#1BA672', LOST: '#E23744'
};

const pipelineData = [
  { stage: 'Prospect', value: 4500000 },
  { stage: 'Qualified', value: 3200000 },
  { stage: 'Proposal', value: 2100000 },
  { stage: 'Negotiation', value: 1400000 },
  { stage: 'Won', value: 1800000 },
];

export function OpportunityListPage() {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const navigate = useNavigate();
  const { data: opportunities, isLoading, error } = useOpportunities();

  const stages = ['PROSPECT', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">Opportunities</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ToggleButtonGroup value={view} exclusive onChange={(_, v) => v && setView(v)} size="small">
            <ToggleButton value="kanban" sx={{ border: 1, borderColor: 'divider', borderRadius: '4px 0 0 4px' }}><ViewKanban /></ToggleButton>
            <ToggleButton value="table" sx={{ border: 1, borderColor: 'divider', borderRadius: '0 4px 4px 0' }}><TableChart /></ToggleButton>
          </ToggleButtonGroup>
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/opportunities/create')} sx={{ borderRadius: 2, py: 1, px: 3 }}>New Deal</Button>
        </Box>
      </Box>

      {/* Pipeline funnel */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={600} mb={1.5}>Pipeline</Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {pipelineData.map((p, i) => (
              <Box key={p.stage} sx={{ flex: 1, textAlign: 'center' }}>
                <Box sx={{ height: Math.max(p.value / 50000, 20), bgcolor: i === 4 ? '#1BA672' : '#E23744', opacity: 0.7 + (i * 0.05), borderRadius: '4px 4px 0 0', minHeight: 20, transition: 'height 0.3s' }} />
                <Typography variant="caption" fontWeight={600} sx={{ mt: 0.5, display: 'block' }}>{p.stage}</Typography>
                <Typography variant="caption" color="text.secondary">₹{(p.value / 100000).toFixed(1)}L</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>Failed to load opportunities.</Alert>
      )}

      {!isLoading && !error && opportunities && opportunities.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" mb={2}>No opportunities yet</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/opportunities/create')} sx={{ borderRadius: 2 }}>New Deal</Button>
        </Box>
      )}

      {!isLoading && !error && opportunities && opportunities.length > 0 && view === 'kanban' && (
        <Box sx={{ display: 'flex', gap: 1.5, overflow: 'auto', pb: 1 }}>
          {stages.map(stage => {
            const stageOpps = opportunities.filter(o => o.stage === stage);
            return (
              <Box key={stage} sx={{ minWidth: 280, maxWidth: 280 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: stageColors[stage] }} />
                    <Typography variant="subtitle2" fontWeight={600}>{stage}</Typography>
                    <Typography variant="caption" color="text.secondary">({stageOpps.length})</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {stageOpps.map(opp => (
                    <Card key={opp.id} sx={{ borderRadius: 2, cursor: 'pointer', '&:hover': { boxShadow: '0 2px 12px rgba(0,0,0,0.1)' } }} onClick={() => navigate(`/opportunities/${opp.id}`)}>
                      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Typography variant="body2" fontWeight={600} mb={0.5}>{opp.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{opp.customerName}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="body2" fontWeight={700} color="primary">₹{opp.value?.toLocaleString() || 'N/A'}</Typography>
                          <Typography variant="caption" color="text.secondary">{opp.probability}%</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      {!isLoading && !error && opportunities && opportunities.length > 0 && view === 'table' && (
        <Card sx={{ borderRadius: 2 }}>
          {opportunities.map((opp, i) => (
            <Box key={opp.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: i < opportunities.length - 1 ? 1 : 0, borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: '#FFF5F5' } }}
              onClick={() => navigate(`/opportunities/${opp.id}`)}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600}>{opp.name}</Typography>
                <Typography variant="caption" color="text.secondary">{opp.customerName} · {opp.stage}</Typography>
              </Box>
              <Typography variant="body2" fontWeight={700}>₹{opp.value?.toLocaleString() || 'N/A'}</Typography>
              <Chip label={opp.stage} size="small" sx={{ bgcolor: `${stageColors[opp.stage]}15`, color: stageColors[opp.stage], fontWeight: 600 }} />
            </Box>
          ))}
        </Card>
      )}
    </Box>
  );
}
