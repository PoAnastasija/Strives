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
      default: '#f7f6fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
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
// import { createTheme } from '@mui/material/styles';

// export const getMuiTheme = (mode: 'light' | 'dark') =>
//   createTheme({
//     palette: {
//       mode,
//       primary: {
//         main: '#7b61ff',
//       },
//       secondary: {
//         main: '#ffcd29',
//       },
//       background: {
//         default: mode === 'light' ? '#f7f6fc' : '#121212',
//         paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
//       },
//       text: {
//         primary: mode === 'light' ? '#1a1a1a' : '#ffffff',
//         secondary: mode === 'light' ? '#666' : '#bbb',
//       },
//     },
//     typography: {
//       fontFamily: 'Roboto, sans-serif',
//       h1: { fontSize: '2.5rem', fontWeight: 700 },
//       h2: { fontSize: '2rem', fontWeight: 600 },
//       body1: { fontSize: '1rem' },
//     },
//     shape: {
//       borderRadius: 12,
//     },
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: 8,
//             textTransform: 'none',
//           },
//         },
//       },
//     },
//   });
