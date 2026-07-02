import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  LinkedIn,
  GitHub,
  Phone as PhoneIcon,
  Description as ResumeIcon,
  OpenInNew as ExternalIcon,
} from '@mui/icons-material';

interface FounderModalProps {
  open: boolean;
  onClose: () => void;
}

const GITHUB_URL = 'https://github.com/barath-project-work';
const LINKEDIN_URL = 'https://linkedin.com/in/barath-tech-dev';
const LEETCODE_URL = 'https://leetcode.com/u/barath_code_dev';
const PHONE = '+91 9080187006';

// ─── LeetCode SVG Icon ────────────────────────
function LeetCodeSvgIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.504-.948-2.363a2.56 2.56 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.18L7.36 8.057l5.767-5.768.027-.027 2.396-2.392c.54-.54.537-1.414-.003-1.955A1.378 1.378 0 0 0 13.483 0zm-2.617 11.026 5.551-5.551a1.378 1.378 0 0 0 0-1.951 1.378 1.378 0 0 0-1.951 0l-5.551 5.551 1.951 1.951z" />
    </svg>
  );
}

// ─── Social Link Button ───────────────────────
function SocialButton({
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
        py: 1.25,
        borderRadius: 2,
        textDecoration: 'none',
        bgcolor: `${color}08`,
        border: `1px solid ${color}20`,
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: `${color}15`,
          borderColor: `${color}40`,
          transform: 'translateY(-1px)',
          boxShadow: `0 4px 12px ${color}20`,
        },
      }}
    >
      <Box sx={{ color, display: 'flex', alignItems: 'center' }}>{icon}</Box>
      <Typography
        sx={{
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: '#1C1C1C',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {label}
      </Typography>
      <ExternalIcon sx={{ fontSize: 14, color: '#9C9C9C', ml: 'auto' }} />
    </Box>
  );
}

// ─── Image Card (with React state fallback) ───
function ImageCard({ src, label }: { src: string; label: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid #E8E8E8',
        bgcolor: '#FAFAFA',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: '#E23744',
          boxShadow: '0 4px 12px rgba(226,55,68,0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {hasError ? (
        <Box
          sx={{
            width: '100%',
            height: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#F5F5F5',
            color: '#9C9C9C',
            fontSize: '0.8125rem',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Image not found
        </Box>
      ) : (
        <Box
          component="img"
          src={src}
          alt={label}
          onError={() => setHasError(true)}
          sx={{
            width: '100%',
            height: 140,
            objectFit: 'cover',
            display: 'block',
            bgcolor: '#F0F0F0',
          }}
        />
      )}
      <Typography
        sx={{
          px: 1.5,
          py: 1,
          fontSize: '0.75rem',
          fontWeight: 500,
          color: '#696969',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ─── Main FounderModal ────────────────────────
export function FounderModal({ open, onClose }: FounderModalProps) {
  const [photoError, setPhotoError] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxWidth: 500,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Header gradient strip */}
      <Box
        sx={{
          height: 8,
          background: 'linear-gradient(90deg, #E23744, #FF6B76, #E23744)',
        }}
      />

      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 2,
            bgcolor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': { bgcolor: '#F5F5F5' },
            width: 32,
            height: 32,
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {/* ─── Profile Section ─── */}
        <Box sx={{ px: 3.5, pt: 3.5, pb: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {/* Photo with React fallback */}
            <Box
              sx={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #E23744',
                flexShrink: 0,
                bgcolor: '#F0F0F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {photoError ? (
                <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: '#E23744' }}>
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

            {/* Name & Title */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.35rem',
                  letterSpacing: '-0.02em',
                  color: '#1C1C1C',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Barath
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: '#696969',
                  fontFamily: 'Inter, sans-serif',
                  mt: 0.25,
                }}
              >
                Founder &amp; Developer
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip
                  label="AtlasAI"
                  size="small"
                  sx={{
                    bgcolor: '#FFF5F5',
                    color: '#E23744',
                    fontWeight: 600,
                    fontSize: '0.6875rem',
                    height: 24,
                    borderRadius: 1,
                  }}
                />

              </Box>
            </Box>
          </Box>

          {/* ─── Contact & Social Links ─── */}
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* LinkedIn */}
            <SocialButton
              href={LINKEDIN_URL}
              icon={<LinkedIn sx={{ fontSize: 22 }} />}
              label="barath-tech-dev"
              color="#0A66C2"
            />

            {/* GitHub */}
            <SocialButton
              href={GITHUB_URL}
              icon={<GitHub sx={{ fontSize: 22 }} />}
              label="barath-project-work"
              color="#1C1C1C"
            />

            {/* LeetCode — custom SVG icon */}
            <SocialButton
              href={LEETCODE_URL}
              icon={<LeetCodeSvgIcon size={22} />}
              label="barath_code_dev"
              color="#FFA116"
            />

            {/* Phone */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2.5,
                py: 1.25,
                borderRadius: 2,
                bgcolor: '#F5FFF5',
                border: '1px solid #1BA67220',
              }}
            >
              <PhoneIcon sx={{ fontSize: 22, color: '#1BA672' }} />
              <Typography
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: '#1C1C1C',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {PHONE}
              </Typography>
            </Box>

            {/* Resume */}
            <Box
              component="a"
              href="/founder/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2.5,
                py: 1.25,
                borderRadius: 2,
                textDecoration: 'none',
                bgcolor: '#FFF5F5',
                border: '1px solid #E2374420',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#FFEAEA',
                  borderColor: '#E2374440',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <ResumeIcon sx={{ fontSize: 22, color: '#E23744' }} />
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: '#1C1C1C',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  View Resume
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.6875rem',
                    color: '#9C9C9C',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  PDF &middot; Download or preview
                </Typography>
              </Box>
              <ExternalIcon sx={{ fontSize: 14, color: '#9C9C9C' }} />
            </Box>
          </Box>

          {/* ─── Project Assets ─── */}
          <Divider sx={{ my: 3 }} />

          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#9C9C9C',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontFamily: 'Inter, sans-serif',
              mb: 2,
            }}
          >
            Project Assets
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
            }}
          >
            <ImageCard src="/founder/logo-atlasAI.png" label="AtlasAI Logo" />
            <ImageCard src="/founder/thumbnail.png" label="Project Thumbnail" />
            <Box sx={{ gridColumn: '1 / -1' }}>
              <ImageCard src="/founder/business-card.png" label="AtlasAI Business Card" />
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: 3.5,
            py: 2,
            bgcolor: '#FAFAFA',
            borderTop: '1px solid #F0F0F0',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: '#9C9C9C',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Built with &hearts; by AtlasAI
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
