'use client';

import { Box } from '@mui/material';

interface ThreePanelLayoutProps {
  /**
   * Content to display in the left panel (Code)
   */
  codePanel?: React.ReactNode;
  /**
   * Content to display in the middle panel (UI Output)
   */
  outputPanel?: React.ReactNode;
  /**
   * Content to display in the right panel (Render Stats)
   */
  statsPanel?: React.ReactNode;
}

/**
 * Three-panel layout component using MUI Grid.
 * Provides a consistent structure for:
 * - Left panel: Code
 * - Middle panel: UI Output
 * - Right panel: Render Stats
 * 
 * This is a pure layout component with no logic or state.
 * Features will plug into it later.
 */
export function ThreePanelLayout({
  codePanel,
  outputPanel,
  statsPanel,
}: ThreePanelLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        height: { xs: 'auto', md: '100vh' },
        minHeight: { xs: 'auto', md: '100vh' },
        alignItems: 'stretch',
      }}
    >
      {/* Left Panel: Code */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 33.333%' },
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
          minHeight: 0,
          height: { xs: 'auto', md: '100%' },
          overflow: 'hidden',
        }}
      >
        {codePanel}
      </Box>

      {/* Middle Panel: UI Output */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 33.333%' },
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
          minHeight: 0,
          height: { xs: 'auto', md: '100%' },
          overflow: 'hidden',
        }}
      >
        {outputPanel}
      </Box>

      {/* Right Panel: Render Stats */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 33.333%' },
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
          minHeight: 0,
          height: { xs: 'auto', md: '100%' },
          overflow: 'hidden',
        }}
      >
        {statsPanel}
      </Box>
    </Box>
  );
}
