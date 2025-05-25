// import { Box, CssBaseline } from '@mui/material';
// import { TopAppBar } from './AppBar';
// import { Sidebar } from './Sidebar';
// import { ReactNode } from 'react';

// type Props = {
//   children: ReactNode;
// };

// export const PageLayout = ({ children }: Props) => {
//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <CssBaseline />

//       {/* Sidebar à gauche */}
//       <Sidebar />

//       {/* Main content */}
//       <Box component="main" sx={{
//         flexGrow: 1,
//         bgcolor: 'white',
//         p: 3,
//         overflowY: 'auto',
//         minHeight: '100vh'
//       }}>
//         <TopAppBar toggleTheme={() => {}} />
        
//         {/* 👇 Le contenu du Dashboard sera injecté ici */}
//         {children}
//       </Box>
//     </Box>
//   );
// };
import { Box, CssBaseline } from '@mui/material';
import { TopAppBar } from './AppBar';
import { Sidebar } from './Sidebar';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const PageLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />

      {/* Sidebar à gauche */}
      <Sidebar />

      {/* Main content */}
      <Box component="main" sx={{
        flexGrow: 1,
        bgcolor: 'white',
        p: 3,
        overflowY: 'auto',
        minHeight: '100vh'
      }}>
        <TopAppBar toggleTheme={() => {}} />
        
        {/* 👇 Le contenu du Dashboard sera injecté ici */}
        {children}
      </Box>
    </Box>
  );
};
