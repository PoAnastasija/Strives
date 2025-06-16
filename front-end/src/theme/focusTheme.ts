import { createTheme } from '@mui/material/styles';

export const focusTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4b0082' },
    secondary: { main: '#00bcd4' },
    background: { default: '#f1f5ff', paper: '#ffffff' },
    text: { primary: '#2c2c2c', secondary: '#666' },
  },
  typography: { fontFamily: 'Fredoka, Roboto, sans-serif' },
  shape: { borderRadius: 16 },
});
