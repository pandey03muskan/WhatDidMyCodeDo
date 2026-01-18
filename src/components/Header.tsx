'use client';

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { useThemeMode } from './ThemeProvider';
import { useRouter } from 'next/navigation';

export function Header() {
  const { mode, toggleMode } = useThemeMode();
  const router = useRouter();

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: '1.5rem',
            color: 'primary.light',
            fontFamily: 'var(--font-poppins), sans-serif',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/')}
        >
          whatdidmycodedo
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={toggleMode}
            aria-label="toggle theme"
            sx={{
              color: 'text.primary',
              fontSize: '1.5rem',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            {mode === 'light' ? '🌙' : '☀️'}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
