import { Box, CssBaseline } from '@mui/material';
import { TopAppBar } from './AppBar';
import { Sidebar } from './Sidebar';
import { ReactNode } from 'react';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Box className={styles.wrapper}>
      <CssBaseline />
      <Sidebar />
      <Box className={styles.mainWrapper}>
        <TopAppBar />
        <Box className={styles.mainContent}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
