import { Box, Typography, Button, Grid, LinearProgress, ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';

type Quest = {
  id: string;
  icon: string;
  title: string;
  progress: number;
};

export default function QuestDashboard() {
  const theme = useTheme();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const quests: Quest[] = [
    { id: '1', icon: '🎯', title: '21-Day Focus Reset', progress: 7 / 21 },
    { id: '2', icon: '🧘', title: 'Mental Reset', progress: 0.3 },
    { id: '3', icon: '💪', title: 'Fitness Boost', progress: 0.1 },
  ];

  const filteredQuests = quests.filter(q => {
    if (filter === 'active') return q.progress < 1;
    if (filter === 'completed') return q.progress === 1;
    return true;
  });

  return (
    <PageLayout>
      <Box mb={3}>
        <Button variant="contained">Add New Quest</Button>
      </Box>

      <Box mb={2}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, val) => val && setFilter(val)}
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Typography variant="h6" gutterBottom>🧭 Current Quests</Typography>
      <Grid container spacing={3}>
        {filteredQuests.map((q) => (
          <Grid item xs={12} sm={6} md={4} key={q.id}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor:
                  theme.palette.mode === 'dark' ? '#332b76' : '#ffffff',
              }}
            >
              <Typography variant="h6" gutterBottom>
                {q.icon} {q.title}
              </Typography>
              <Typography variant="body2" mb={1}>
                Progress: {Math.round(q.progress * 100)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={q.progress * 100}
                sx={{ height: 10, borderRadius: 5, mb: 2 }}
              />
              <Button fullWidth variant="outlined">
                Open Quest
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
}