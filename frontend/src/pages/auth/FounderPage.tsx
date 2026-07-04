import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  LinkedIn,
  GitHub,
  Phone as PhoneIcon,
  Email as EmailIcon,
  OpenInNew as ExternalIcon,
  ArrowBack as BackIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const GITHUB_URL = 'https://github.com/barath-project-work';
const LINKEDIN_URL = 'https://linkedin.com/in/barath-tech-dev';
const LEETCODE_URL = 'https://leetcode.com/u/barath_code_dev';
const PHONE = '+91 9080187006';
const EMAIL = 'workmailbarathg@gmail.com';

// ─── LeetCode SVG Icon ────────────────────────
function LeetCodeSvgIcon({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.504-.948-2.363a2.56 2.56 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.18L7.36 8.057l5.767-5.768.027-.027 2.396-2.392c.54-.54.537-1.414-.003-1.955A1.378 1.378 0 0 0 13.483 0zm-2.617 11.026 5.551-5.551a1.378 1.378 0 0 0 0-1.951 1.378 1.378 0 0 0-1.951 0l-5.551 5.551 1.951 1.951z" />
    </svg>
  );
}

// ─── Social Link Card ─────────────────────────
function SocialLinkCard({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2.5,
        py: 1.75,
        borderRadius: 2,
        textDecoration: 'none',
        bgcolor: '#FFFFFF',
        border: '1px solid #EDEDF0',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        minHeight: 56,
        '&:hover': {
          borderColor: `${color}30`,
          bgcolor: `${color}04`,
          transform: 'translateY(-1px)',
          boxShadow: `0 4px 12px ${color}12, 0 1px 2px rgba(0,0,0,0.04)`,
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: `${color}10`,
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          noWrap
          sx={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#1C1C1C',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </Typography>
      </Box>
      <ExternalIcon sx={{ fontSize: 15, color: '#C0C0C0', flexShrink: 0, opacity: 0.7 }} />
    </Box>
  );
}

// ─── Contact Info Card ────────────────────────
function ContactInfoCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2.5,
        py: 1.75,
        borderRadius: 2,
        bgcolor: '#FFFFFF',
        border: '1px solid #EDEDF0',
        transition: 'all 0.2s ease',
        minHeight: 56,
        '&:hover': {
          borderColor: `${color}30`,
          bgcolor: `${color}04`,
          transform: 'translateY(-1px)',
          boxShadow: `0 4px 12px ${color}12, 0 1px 2px rgba(0,0,0,0.04)`,
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: `${color}10`,
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: '#A0A0A0',
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            mb: 0.25,
          }}
        >
          {label}
        </Typography>
        <Typography
          noWrap
          sx={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#1C1C1C',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.01em',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Main FounderPage ─────────────────────────
export function FounderPage() {
  const [photoError, setPhotoError] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FAFAFA',
      }}
    >
      {/* Hero section with red gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #E23744 0%, #C41E2C 50%, #A01522 100%)',
          pt: { xs: 4, md: 6 },
          pb: { xs: 8, md: 10 },
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
              'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        {/* Back button */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 24,
            zIndex: 2,
          }}
        >
          <Button
            onClick={() => navigate('/login')}
            startIcon={<BackIcon />}
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.875rem',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
              },
            }}
          >
            Back to Login
          </Button>
        </Box>

        {/* Founder Photo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid rgba(255,255,255,0.4)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              bgcolor: '#A01522',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {photoError ? (
              <Typography sx={{ fontSize: '3.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                B
              </Typography>
            ) : (
              <Box
                component="img"
                src="/founder/founder%20image.png"
                alt="Barath"
                onError={() => setPhotoError(true)}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </Box>
        </Box>

        {/* Name & Title */}
        <Box sx={{ textAlign: 'center', mt: 3, position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
              letterSpacing: '-0.02em',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Barath
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.05rem',
              mt: 0.5,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
            }}
          >
            Founder &amp; Developer
          </Typography>
        </Box>
      </Box>

      {/* Content section — now a wide, dashboard-style layout */}
      <Box
        sx={{
          flex: 1,
          maxWidth: { xs: 520, sm: 720, md: 1100 },
          mx: 'auto',
          width: '100%',
          px: { xs: 2, sm: 3 },
          mt: -4,
          position: 'relative',
          zIndex: 2,
          pb: 6,
        }}
      >
        {/* Card container */}
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            border: '1px solid #F0F0F0',
          }}
        >
          {/* Header strip */}
          <Box
            sx={{
              height: 6,
              background: 'linear-gradient(90deg, #E23744, #FF6B76, #E23744)',
            }}
          />

          <Box sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
            {/* ─── Responsive Grid: 3 cols (desktop) → 2 cols (tablet) → 1 col (mobile) ─── */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '3fr 3fr 4fr' },
                gap: { xs: 2.5, sm: 3, md: 3.5 },
                alignItems: 'start',
              }}
            >
              {/* ═══ Column 1: Social Links ═══ */}
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: '#A0A0A0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontFamily: 'Inter, sans-serif',
                    mb: 1.5,
                  }}
                >
                  Connect with me
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <SocialLinkCard
                    href={LINKEDIN_URL}
                    icon={<LinkedIn sx={{ fontSize: 22 }} />}
                    label="barath-tech-dev"
                    color="#0A66C2"
                  />
                  <SocialLinkCard
                    href={GITHUB_URL}
                    icon={<GitHub sx={{ fontSize: 22 }} />}
                    label="barath-project-work"
                    color="#1C1C1C"
                  />
                  <SocialLinkCard
                    href={LEETCODE_URL}
                    icon={<LeetCodeSvgIcon size={22} />}
                    label="barath_code_dev"
                    color="#FFA116"
                  />
                </Box>
              </Box>

              {/* ═══ Column 2: Contact Info ═══ */}
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: '#A0A0A0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontFamily: 'Inter, sans-serif',
                    mb: 1.5,
                  }}
                >
                  Contact
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <ContactInfoCard
                    icon={<PhoneIcon sx={{ fontSize: 20 }} />}
                    label="Phone"
                    value={PHONE}
                    color="#1BA672"
                  />
                  <ContactInfoCard
                    icon={<EmailIcon sx={{ fontSize: 20 }} />}
                    label="Email"
                    value={EMAIL}
                    color="#E23744"
                  />
                </Box>
              </Box>

              {/* ═══ Column 3: Resume + Business Card ═══ */}
              <Box
                sx={{
                  gridColumn: { xs: '1', sm: '1 / -1', md: 'auto' },
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                  gap: { xs: 1.5, sm: 1.5, md: 1.5 },
                }}
              >
                {/* Resume CTA */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: '#A0A0A0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontFamily: 'Inter, sans-serif',
                      mb: 1.5,
                    }}
                  >
                    Resume
                  </Typography>

                  <Box
                    component="a"
                    href="/founder/Resume(CV).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      px: 2.5,
                      py: 2,
                      borderRadius: 2,
                      textDecoration: 'none',
                      background: 'linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 100%)',
                      border: '1px solid #E2374420',
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: '#E2374450',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(226,55,68,0.15), 0 1px 2px rgba(0,0,0,0.04)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#E23744',
                        color: '#FFFFFF',
                        flexShrink: 0,
                      }}
                    >
                      <DownloadIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        noWrap
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#E23744',
                          fontFamily: 'Inter, sans-serif',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        Download Resume
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          color: '#A0A0A0',
                          fontFamily: 'Inter, sans-serif',
                          mt: 0.25,
                        }}
                      >
                        PDF &middot; Opens in new tab
                      </Typography>
                    </Box>
                    <ExternalIcon sx={{ fontSize: 16, color: '#E2374480', flexShrink: 0 }} />
                  </Box>
                </Box>

                {/* Business Card */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: '#A0A0A0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontFamily: 'Inter, sans-serif',
                      mb: 1.5,
                    }}
                  >
                    Business Card
                  </Typography>

                  <Box
                    sx={{
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid #EDEDF0',
                      bgcolor: '#FAFAFA',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#E2374420',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="/founder/business-card.png"
                      alt="AtlasAI Business Card"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        bgcolor: '#F0F0F0',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Typography
          sx={{
            textAlign: 'center',
            mt: 4,
            fontSize: '0.75rem',
            color: '#9C9C9C',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Built with &hearts; by AtlasAI &middot; &copy; 2026
        </Typography>
      </Box>
    </Box>
  );
}
