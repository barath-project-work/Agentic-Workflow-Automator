import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

export function PublicLayout() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
      }}
    >
      {/* Founder Brand Panel - left side (Zomato-style hero) */}
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
            top: '8%',
            right: '12%',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '12%',
            left: '8%',
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            pointerEvents: 'none',
          }}
        />

        {/* AtlasAI Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box
            component="img"
            src="/founder/logo-atlasAI.png"
            alt="AtlasAI"
            sx={{
              width: 48,
              height: 48,
              objectFit: 'contain',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
              p: 0.5,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: '#FFFFFF',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              fontSize: '2rem',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            AtlasAI
          </Typography>
        </Box>

        {/* Thumbnail Image — big hero visual, also clickable */}
        <Box
          onClick={() => navigate('/founder')}
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '80%',
            maxWidth: 480,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
            mb: 4,
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <Box
            component="img"
            src="/founder/thumbnail.png"
            alt="AtlasAI Project Thumbnail"
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              bgcolor: '#A01522',
            }}
          />
        </Box>

        {/* Big Meet the Founder Icon - clickable */}
        <Box
          onClick={() => navigate('/founder')}
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.08)',
              '& .founder-icon-circle': {
                bgcolor: 'rgba(255,255,255,0.25)',
                boxShadow: '0 0 40px rgba(255,255,255,0.3)',
              },
            },
          }}
        >
          {/* Large circular icon */}
          <Box
            className="founder-icon-circle"
            sx={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(255,255,255,0.15)',
            }}
          >
            <PersonIcon sx={{ fontSize: 44, color: '#FFFFFF' }} />
          </Box>

          {/* Text label */}
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '1.1rem',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.02em',
              textAlign: 'center',
            }}
          >
            Meet the Founder
          </Typography>
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
            component="img"
            src="/founder/logo-atlasAI.png"
            alt="AtlasAI"
            sx={{
              width: 32,
              height: 32,
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.2rem',
              color: 'text.primary',
              letterSpacing: '-0.02em',
              fontFamily: 'Poppins, sans-serif',
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
