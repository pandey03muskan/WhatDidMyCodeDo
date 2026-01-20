import { Components, Theme } from '@mui/material/styles';

/**
 * Component-level theme overrides
 */
export const components: Components = {
  MuiCssBaseline: {
    styleOverrides: (theme) => {
      const muiTheme = theme as Theme;
      const isDark = muiTheme.palette.mode === 'dark';
      const track = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
      const thumb = isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)';
      const thumbHover = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)';

      return {
        body: {
          fontFamily: 'var(--font-poppins), var(--font-inter), sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },

        // Firefox
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${thumb} ${track}`,
        },

        // Chromium / Safari
        '*::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: track,
          borderRadius: 999,
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: thumb,
          borderRadius: 999,
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: thumbHover,
        },
      };
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '10px 24px',
        fontWeight: 600,
        textTransform: 'none',
      },
      contained: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        fontWeight: 600,
      },
    },
  },
};
