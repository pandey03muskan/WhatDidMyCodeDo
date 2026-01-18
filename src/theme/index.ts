import { createTheme, ThemeOptions } from '@mui/material/styles';
import { lightPalette } from './palette';
import { darkPalette } from './palette';
import { typography } from './typography';
import { components } from './components';

/**
 * Create light theme
 */
export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
  components,
} as ThemeOptions);

/**
 * Create dark theme
 */
export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
  components,
} as ThemeOptions);

/**
 * Get theme based on mode
 */
export const getTheme = (mode: 'light' | 'dark') => {
  return mode === 'light' ? lightTheme : darkTheme;
};
