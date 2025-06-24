import { Box, Button, Grid, LinearProgress, ToggleButtonGroup, ToggleButton, Paper, Grow, Fade } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const quests: Quest[] = [
    {
      id: '1',
      icon: '📖',
      title: '60 days to learn a new language',
      description: 'Study every-day until you learn all the basics!',
      progress: 0.0,
      xp: 70,
      coins: 30,
      color: '#85caff',
    },
    {
      id: '2',
      icon: '📵',
      title: 'Digital detox',
      description: '7 days without any social media',
      progress: 0.0,
      xp: 40,
      coins: 10,
      color: '#ffc107',
    },
    {
      id: '3',
      icon: '🎯',
      title: '21-Day Focus Reset',
      description: 'Focus 3h a day for 21 days.',
      progress: 0.0,
      xp: 100,
      coins: 50,
      color: '#dfc2f2',
    },
  ];

  const filteredQuests = quests.filter((q) => {
    if (filter === 'active') return q.progress < 1;
    if (filter === 'completed') return q.progress === 1;
    return true;
  });

  return (
    <PageLayout>
      <Fade in={true} timeout={800}>
        <Box mb={4} textAlign="center">
          <h1 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Your Quests</h1>
          <p style={{ maxWidth: 500, margin: '0 auto' }}>
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
      </Fade>

      <Grid container spacing={3}>
        {filteredQuests.map((q, index) => (
          <Grow in={true} timeout={800 + index * 200} key={q.id}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minWidth: 493,
                  backgroundColor: theme.palette.mode === 'dark' ? '#1b164a' : '#8583EB',
                  color: theme.palette.text.primary,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.01)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <span style={{ fontSize: '2rem' }}>{q.icon}</span>
                  <Box>
                    <h3 style={{ fontWeight: 'bold', margin: 0 }}>{q.title}</h3>
                    <p style={{ marginTop: 4, color: '#fff', fontSize: '0.9rem' }}>
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
                    onClick={() => navigate(`/quests/${q.id}`)}
                    sx={{
                      borderRadius: 25,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      px: 3,
                      py: 0.5,
                      background: 'linear-gradient(45deg, rgb(139, 107, 255), rgb(36, 164, 238))',
                      boxShadow: '0 8px 25px rgba(134, 107, 255, 0.4)',
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(45deg, rgb(36, 164, 238), rgb(139, 107, 255))',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(134, 107, 255, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Start
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grow>
        ))}
      </Grid>
    </PageLayout>
  );
}
 