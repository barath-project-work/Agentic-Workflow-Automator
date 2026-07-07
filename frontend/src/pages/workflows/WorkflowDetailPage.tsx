import { Box, Typography, Card, CardContent, Chip, Button, LinearProgress, Divider, IconButton, CircularProgress, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Cancel, Download, Share, CheckCircle, RadioButtonUnchecked, HourglassEmpty, Error } from '@mui/icons-material';
import { useWorkflow, useCancelWorkflow } from '../../hooks/useWorkflows';

const statusColors: Record<string, string> = { RUNNING: '#4A90D9', COMPLETED: '#1BA672', FAILED: '#E23744', BLOCKED: '#F7A83E', CANCELLED: '#9C9C9C' };

function StepIcon({ status }: { status: string }) {
  switch (status) {
    case 'COMPLETED': return <CheckCircle sx={{ color: '#1BA672', fontSize: 22 }} />;
    case 'RUNNING': return <HourglassEmpty sx={{ color: '#4A90D9', fontSize: 22 }} />;
    case 'FAILED': return <Error sx={{ color: '#E23744', fontSize: 22 }} />;
    default: return <RadioButtonUnchecked sx={{ color: '#D0D0D0', fontSize: 22 }} />;
  }
}

export function WorkflowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: workflow, isLoading, error } = useWorkflow(id ?? '');
  const cancelMutation = useCancelWorkflow();

  if (isLoading) {
    return <Box sx={{ textAlign: 'center', py: 8 }}><CircularProgress /></Box>;
  }

  if (error || !workflow) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>Workflow not found</Alert>
        <Button variant="outlined" onClick={() => navigate('/workflows')} sx={{ borderRadius: 2 }}>Back to Workflows</Button>
      </Box>
    );
  }

  const completedSteps = workflow.steps.filter(s => s.status === 'COMPLETED').length;
  const stepCount = workflow.stepCount || workflow.steps.length;
  const progress = stepCount > 0 ? (completedSteps / stepCount) * 100 : 0;

  const handleCancel = () => {
    cancelMutation.mutate(workflow.id);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Chip label={workflow.status} size="small" sx={{ bgcolor: `${statusColors[workflow.status]}15`, color: statusColors[workflow.status], fontWeight: 600 }} />
            <Typography variant="caption" color="text.secondary">ID: {workflow.id}</Typography>
          </Box>
          <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">{workflow.goal}</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>Started {new Date(workflow.createdAt).toLocaleString()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {workflow.status === 'RUNNING' && (
            <Button variant="outlined" color="error" startIcon={<Cancel />} onClick={handleCancel} sx={{ borderRadius: 2 }}>
              {cancelMutation.isPending ? 'Cancelling...' : 'Cancel'}
            </Button>
          )}
          <IconButton><Share /></IconButton>
          <IconButton><Download /></IconButton>
        </Box>
      </Box>

      {/* Progress */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>Progress</Typography>
            <Typography variant="body2" color="text.secondary">{completedSteps}/{stepCount} steps</Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, bgcolor: '#F0F0F0', '& .MuiLinearProgress-bar': { bgcolor: statusColors[workflow.status], borderRadius: 4 } }} />
          {workflow.result && (
            <Box sx={{ mt: 2, p: 1.5, bgcolor: '#F0FFF4', borderRadius: 2, border: '1px solid #B7E4C7' }}>
              <Typography variant="body2" color="success.main" fontWeight={500}>{workflow.result}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Step Timeline */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>Execution Timeline</Typography>
          {workflow.steps.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>No steps recorded yet.</Typography>
          ) : (
            <Box>
              {workflow.steps.map((step, idx) => (
                <Box key={step.id}>
                  <Box sx={{ display: 'flex', gap: 2, py: 1.5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 30 }}>
                      <StepIcon status={step.status} />
                      {idx < workflow.steps.length - 1 && <Box sx={{ width: 2, flex: 1, bgcolor: step.status === 'COMPLETED' ? '#1BA672' : '#E8E8E8', mt: 0.5 }} />}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {step.toolName.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">{step.description}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Chip label={step.status} size="small" sx={{ fontSize: '0.625rem', fontWeight: 600, bgcolor: step.status === 'COMPLETED' ? '#E8F5E9' : step.status === 'RUNNING' ? '#E3F2FD' : '#F5F5F5', color: step.status === 'COMPLETED' ? '#1BA672' : step.status === 'RUNNING' ? '#4A90D9' : '#9C9C9C', height: 22 }} />
                          {step.duration && <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>{step.duration}</Typography>}
                        </Box>
                      </Box>
                      {step.input && (
                        <Box sx={{ mt: 1, p: 1, bgcolor: '#F9F9F9', borderRadius: 1 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.6875rem', display: 'block', whiteSpace: 'pre-wrap' }}>{step.input}</Typography>
                        </Box>
                      )}
                      {step.output && (
                        <Box sx={{ mt: 1, p: 1, bgcolor: '#F0FFF4', borderRadius: 1, border: '1px solid #E8F5E9' }}>
                          <Typography variant="caption" sx={{ color: '#1BA672', fontFamily: 'monospace', fontSize: '0.6875rem' }}>→ {step.output}</Typography>
                        </Box>
                      )}
                      {step.errorDetail && (
                        <Box sx={{ mt: 1, p: 1, bgcolor: '#FFF0F0', borderRadius: 1, border: '1px solid #FFCCCC' }}>
                          <Typography variant="caption" sx={{ color: '#E23744', fontFamily: 'monospace', fontSize: '0.6875rem' }}>✕ {step.errorDetail}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  {idx < workflow.steps.length - 1 && <Divider sx={{ ml: 10 }} />}
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
