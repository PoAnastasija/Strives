import { Box, Typography, LinearProgress } from '@mui/material';

type Props = {
  xp: number;
  xpMax: number;
};

export const XpProgressBar = ({ xp, xpMax }: Props) => {
  const percent = Math.min((xp / xpMax) * 100, 100);

  return (
    <Box sx={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <Typography variant="body2">Progression XP</Typography>
        <Typography variant="body2">{xp} / {xpMax}</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: 'grey.300',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'primary.main',
          },
        }}
      />
    </Box>
  );
};
