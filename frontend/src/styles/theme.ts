import { createTheme } from '@mui/material/styles';

// Zomato-inspired color palette
const zomato = {
  // Primary brand colors
  primaryRed: '#E23744',
  primaryRedDark: '#C41E2C',
  primaryRedLight: '#FF6B76',

  // Neutrals
  textPrimary: '#1C1C1C',
  textSecondary: '#696969',
  textMuted: '#9C9C9C',
  background: '#F4F4F2',
  surface: '#FFFFFF',
  border: '#E8E8E8',
  borderLight: '#F0F0F0',

  // Status
  success: '#1BA672',
  warning: '#F7A83E',
  error: '#E23744',

  // Special
  highlightBg: '#FFF5F5',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: zomato.primaryRed,
      dark: zomato.primaryRedDark,
      light: zomato.primaryRedLight,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: zomato.textMuted,
    },
    success: {
      main: zomato.success,
    },
    warning: {
      main: zomato.warning,
    },
    error: {
      main: zomato.error,
    },
    background: {
      default: zomato.background,
      paper: zomato.surface,
    },
    text: {
      primary: zomato.textPrimary,
      secondary: zomato.textSecondary,
    },
    divider: zomato.border,
  },
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      "'Segoe UI'",
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.25,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.35,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.8125rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      fontSize: '0.9375rem',
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      color: zomato.textMuted,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: zomato.background,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 24px',
          fontWeight: 600,
          fontSize: '0.9375rem',
          textTransform: 'none',
          transition: 'all 0.2s ease',
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(226, 55, 68, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${zomato.primaryRed}, ${zomato.primaryRedDark})`,
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        sizeLarge: {
          padding: '12px 32px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.8125rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          border: 'none',
          overflow: 'visible',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: zomato.surface,
            transition: 'all 0.2s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: zomato.textSecondary,
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: 2,
                borderColor: zomato.primaryRed,
              },
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: zomato.primaryRed,
            fontWeight: 500,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontFamily: 'Inter, sans-serif',
          '&::placeholder': {
            color: zomato.textMuted,
            opacity: 1,
          },
        },
        notchedOutline: {
          borderColor: zomato.border,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderBottom: `1px solid ${zomato.borderLight}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${zomato.borderLight}`,
          backgroundColor: zomato.surface,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            transition: 'background-color 0.15s ease',
            '&:hover': {
              backgroundColor: zomato.highlightBg,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          fontSize: '0.75rem',
          height: 28,
        },
        filled: {
          backgroundColor: zomato.highlightBg,
          color: zomato.primaryRed,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.875rem',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 2,
          transition: 'all 0.15s ease',
          '&.Mui-selected': {
            backgroundColor: zomato.highlightBg,
            color: zomato.primaryRed,
            '&:hover': {
              backgroundColor: zomato.highlightBg,
            },
            '& .MuiListItemIcon-root': {
              color: zomato.primaryRed,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: zomato.textSecondary,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: zomato.borderLight,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
        standardError: {
          backgroundColor: '#FFF0F0',
          color: zomato.primaryRedDark,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
        },
      },
    },
  },
});
