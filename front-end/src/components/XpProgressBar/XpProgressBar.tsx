import { Box, LinearProgress } from '@mui/material';
import styles from './XpProgressBar.module.css';
import { useMemo } from 'react';

interface XpBarProps {
  xp: number;
  xpMax: number;
};

export const XpProgressBar = ({ xp, xpMax }: XpBarProps) => {
  const percent = useMemo(() => {
    return Math.min((xp / xpMax) * 100, 100);
  }, [xp, xpMax]);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.header}>
        <span className={styles.label}>Progression XP</span>
        <span className={styles.label}>{xp} / {xpMax}</span>
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
