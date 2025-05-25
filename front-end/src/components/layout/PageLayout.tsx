import { Box, CssBaseline } from '@mui/material';
import { TopAppBar } from './AppBar';
import { Sidebar } from './Sidebar';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const PageLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <TopAppBar />
        <Box
          component="main"
          sx={{
            bgcolor: 'background.default',
            minHeight: '100vh',
            pt: '40px',
            px: 12,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
