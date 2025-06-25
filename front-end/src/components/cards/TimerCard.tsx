import { Box, Button, Typography } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import { GlassCard } from './GlassCard';

interface TimerCardProps {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  onToggle: () => void;
}

export const TimerCard = ({ minutes, seconds, isRunning, onToggle }: TimerCardProps) => {
  return (
    <GlassCard width={320}>
      <Typography
        variant="h6"
        align="center"
        fontWeight="bold"
        sx={{
          color: '#a68dff',
          mb: 2,
        }}
      >
        Focus Timer
      </Typography>

      <Box
        sx={{
          fontSize: '3rem',
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 3,
          fontFamily: 'monospace',
          background: 'linear-gradient(45deg, #a68dff, #9b59b6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Box>

      <Box textAlign="center">
        <Button
          variant="contained"
          startIcon={isRunning ? <Pause /> : <PlayArrow />}
          onClick={onToggle}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 5,
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'none',
            background: 'linear-gradient(45deg, #00b894, #00cec9)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #00a383, #00b2b0)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {isRunning ? 'Pause' : 'Start Focus'}
        </Button>
      </Box>
    </GlassCard>
  );
};
