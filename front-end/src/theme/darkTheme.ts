import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#82B1FF' },
    secondary: { main: '#4DD0E1' },
    background: {
      default: '#0D1117',
      paper: '#1C1F26'
    },
    text: {
      primary: '#E3F2FD',
      secondary: '#90CAF9'
    },
  },
  typography: {
    fontFamily: 'Fredoka, Roboto, sans-serif'
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
        }
      }
    }
  }
});
