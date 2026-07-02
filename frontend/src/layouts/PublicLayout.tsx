import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { AutoAwesome as AIcon } from '@mui/icons-material';

export function PublicLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
      }}
    >
      {/* Brand Panel - left side */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #E23744 0%, #C41E2C 50%, #A01522 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background:
              'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '8%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            pointerEvents: 'none',
          }}
        />

        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <AIcon sx={{ fontSize: 32, color: '#FFFFFF' }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              color: '#FFFFFF',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              fontSize: '2.2rem',
            }}
          >
            AtlasAI
          </Typography>
        </Box>

        {/* Tagline */}
        <Typography
          variant="h2"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: { xs: '1.8rem', lg: '2.4rem' },
            lineHeight: 1.3,
            textAlign: 'center',
            maxWidth: 420,
            position: 'relative',
            zIndex: 1,
            letterSpacing: '-0.02em',
          }}
        >
          Agentic Sales
          <br />
          Workflow Automation
        </Typography>

        <Typography
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1rem',
            mt: 2,
            textAlign: 'center',
            maxWidth: 360,
            lineHeight: 1.6,
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
            zIndex: 1,
          }}
        >
          AI-powered platform that orchestrates your entire sales workflow — from lead generation to deal closure.
        </Typography>

        {/* Feature badges */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 5,
            position: 'relative',
            zIndex: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['AI-Driven', 'Automated', 'Integrated'].map((feature) => (
            <Box
              key={feature}
              sx={{
                px: 2.5,
                py: 1,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {feature}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Auth Panel - right side */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: { xs: 2, sm: 4 },
          bgcolor: '#FFFFFF',
        }}
      >
        {/* Mobile logo */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            gap: 1.5,
            position: 'absolute',
            top: 24,
            left: 24,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #E23744, #C41E2C)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.2rem',
              color: 'text.primary',
              letterSpacing: '-0.02em',
            }}
          >
            AtlasAI
          </Typography>
        </Box>

        <Outlet />
      </Box>
    </Box>
  );
}
