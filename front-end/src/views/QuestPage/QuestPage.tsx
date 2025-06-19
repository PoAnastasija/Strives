import { Box, Button, Grid, LinearProgress, ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';

type Quest = {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  xp: number;
  coins: number;
  color: string;
};

export default function QuestDashboard() {
  const theme = useTheme();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const quests: Quest[] = [
    {
      id: '1',
      icon: '🧘',
      title: '7-Day Meditation Challenge',
      description: 'Meditate for 10 minutes each day for 7 days.',
      progress: 0.85,
      xp: 70,
      coins: 30,
      color: '#85caff',
    },
    {
      id: '2',
      icon: '💪',
      title: 'Morning Push-Ups',
      description: 'Do 5 push-ups every morning for one week.',
      progress: 0.4,
      xp: 40,
      coins: 10,
      color: '#ffc107',
    },
    {
      id: '3',
      icon: '🎯',
      title: '21-Day Focus Reset',
      description: 'Focus 25 minutes a day for 21 days.',
      progress: 7 / 21,
      xp: 100,
      coins: 50,
      color: '#ab8bff',
    },
  ];

  const filteredQuests = quests.filter((q) => {
    if (filter === 'active') return q.progress < 1;
    if (filter === 'completed') return q.progress === 1;
    return true;
  });

  return (
    <PageLayout>
      <Box mb={4} textAlign="center">
        <h1 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Your Active Quests</h1>
        <p style={{ color: '#888', maxWidth: 500, margin: '0 auto' }}>
          Complete challenges to grow your companion and unlock rewards.
        </p>

        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, val) => val && setFilter(val)}
          size="small"
          sx={{
            mt: 3,
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            '& .MuiToggleButton-root': {
              border: 'none',
              borderRadius: '14px',
              fontWeight: 600,
              textTransform: 'none',
              px: 3,
              py: 1.2,
              backgroundColor: 'transparent',
              color: theme.palette.text.primary,
              transition: 'background-color 0.2s ease',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2a2a50' : '#f0f0ff',
              },
            },
            '& .Mui-selected': {
              backgroundColor: '#91b9ff',
              color: '#1a1a1a',
              boxShadow: '0 0 4px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#82aaff',
              },
            },
          }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">In Progress</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box mb={3} textAlign="center">
        <Button variant="contained">Add New Quest</Button>
      </Box>

      <Grid container spacing={3}>
        {filteredQuests.map((q) => (
          <Grid item xs={12} md={6} key={q.id}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 4,
                minWidth: 493,
                backgroundColor: theme.palette.mode === 'dark' ? '#1b164a' : '#ffffff',
                color: theme.palette.text.primary,
              }}
            >
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <span style={{ fontSize: '2rem' }}>{q.icon}</span>
                <Box>
                  <h3 style={{ fontWeight: 'bold', margin: 0 }}>{q.title}</h3>
                  <p style={{ marginTop: 4, color: '#888', fontSize: '0.9rem' }}>
                    {q.description}
                  </p>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Box flexGrow={1}>
                  <LinearProgress
                    variant="determinate"
                    value={q.progress * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: q.color,
                      },
                    }}
                  />
                </Box>
                <span style={{ fontWeight: 500, color: q.color }}>
                  {Math.round(q.progress * 100)}%
                </span>
              </Box>

              <Box display="flex" alignItems="center" gap={3} mt={1}>
                <Box display="flex" gap={1.5} alignItems="center">
                  <span style={{ color: q.color }}>↗ +{q.xp} XP</span>
                  <span style={{ color: q.color }}>🪙 +{q.coins}</span>
                </Box>
                <Box flexGrow={1} />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 3,
                    fontWeight: 'bold',
                    px: 3,
                    backgroundColor: '#82b1ff',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#659cff',
                    },
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
}
