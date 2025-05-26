import { Typography, Box, LinearProgress } from '@mui/material';
import styles from './XpProgressBar.module.css';

type XpBarProps = {
  xp: number;
  xpMax: number;
};

export const XpProgressBar = ({ xp, xpMax }: XpBarProps) => {
  const percent = Math.min((xp / xpMax) * 100, 100);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.header}>
        <Typography variant="body2">Progression XP</Typography>
        <Typography variant="body2">{xp} / {xpMax}</Typography>
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
