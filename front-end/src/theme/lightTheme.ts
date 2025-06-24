import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7b61ff' },
    secondary: { main: '#ffcd29' },
    background: { default: '#8583eb', paper: '#e5e5ff' },
    text: { primary: '#1a1a1a', secondary: '#666' },
  },
  typography: { fontFamily: 'Inter, Roboto, sans-serif' },
  shape: { borderRadius: 12 },
});