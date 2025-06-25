import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  width?: number;
}

export const GlassCard = ({ children, width = 320 }: GlassCardProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        width,
        p: 3,
        borderRadius: 5,
        background: isDark
          ? 'linear-gradient(135deg, rgba(48, 14, 108, 0.75), rgba(36, 22, 58, 0.75))'
          : 'linear-gradient(135deg, rgba(250, 238, 250, 0.6), rgba(197, 177, 252, 0.6))',
            
        backdropFilter: 'blur(20px)',
        color: isDark ? '#dcd0ff' : '#443266',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        boxShadow: isDark
          ? '0 15px 40px rgba(0, 0, 0, 0.5)'
          : '0 15px 40px rgba(64, 9, 87, 0.15)',
      }}
    >
      {children}
    </Box>
  );
};
