import { Box, CssBaseline } from '@mui/material';
import { TopAppBar } from '@components/layout/AppBar/AppBar';
import { Sidebar } from '@components/layout/Sidebar/Sidebar';
import { ReactNode } from 'react';
import styles from './PageLayout.module.css';
import ThemeCSSVariables from '@theme/themeVariables';

interface PageLayoutProps {
  children: ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Box className={styles.wrapper}>
      <CssBaseline />
      <ThemeCSSVariables />
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
