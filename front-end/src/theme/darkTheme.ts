import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#bb86fc' },
    secondary: { main: '#03dac6' },
    background: { default: '#121212', paper: '#1f1f1f' },
    text: { primary: '#ffffff', secondary: '#aaa' },
  },
  typography: { fontFamily: 'Fredoka, Roboto, sans-serif' },
  shape: { borderRadius: 12 },
});
