import { Box, LinearProgress, useTheme, Typography } from '@mui/material';
import { useMemo } from 'react';
import styles from './XpProgressBar.module.css';

interface XpBarProps {
  xp: number;
  xpMax: number;
}

export const XpProgressBar = ({ xp, xpMax }: XpBarProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const percent = useMemo(() => {
    return Math.min((xp / xpMax) * 100, 100);
  }, [xp, xpMax]);

  return (
    <Box className={styles.wrapper}>
      <Box
        className={styles.header}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          color: isDark ? '#FFFFFF' : '#2C2C3E'
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Progression XP
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {xp} / {xpMax}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={percent}
        className={styles.progress}
        classes={{ bar: styles.bar }}
      />
    </Box>
  );
};

