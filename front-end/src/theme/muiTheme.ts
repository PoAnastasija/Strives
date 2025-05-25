import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7b61ff',
    },
    secondary: {
      main: '#ffcd29',
    },
    background: {
      default: '#fcfbfe',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: 'Fredoka, Roboto, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});