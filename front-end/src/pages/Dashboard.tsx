import { useState } from 'react';
import { Typography, Box, Button, Grid } from '@mui/material';
import { PageLayout } from '../components/layout/PageLayout';
import { useTaskStore } from '../features/tasks/taskSlice';
import { CompanionCard } from '../components/cards/CompanionCard';
import { TaskList } from '../features/tasks/TaskList';
import { SuggestedTasksModal } from '../features/tasks/SuggestedTasksModal';
import { StatCard } from '../components/cards/StatCard';
import { RewardCard } from '../components/cards/RewardCard';

export default function Dashboard() {
  const { tasks } = useTaskStore();
  const xp = tasks.filter((t) => t.done).reduce((acc, t) => acc + t.xp, 0);
  const xpMax = 300;
  const level = Math.floor(xp / xpMax) + 1;
  const gold = tasks.filter((t) => t.done).reduce((acc, t) => acc + Math.floor(t.xp / 2), 0);
  const [openModal, setOpenModal] = useState(false);
  const handleClaimReward = () => {
    alert('Récompense réclamée');
  };

  return (
    <PageLayout>
      <Box px={{ xs: 1, md: 2, lg: 2 }}>
        <Box mt={1} mb={2}>
          <Typography variant="h4" mb={0.5}>
            Hello !
          </Typography>
          <Typography variant="body1">Prêt à gagner de l’XP ?</Typography>
        </Box>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" gap={3}>
              <CompanionCard xp={xp} xpMax={xpMax} />
              <Box>
                <TaskList />
                <Box mt={1.5}>
                  <Button
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                    sx={{ textTransform: 'none' }}
                  >
                    Ajouter une tâche
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={4}>
                  <StatCard title="Niveau" value={`${level} 👑`} />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <StatCard title="Pièces" value={`${gold} 🪙`} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <RewardCard
                  title="Tablette graphique"
                  cost={100}
                  onClaim={handleClaimReward}
                  disabled={gold < 100}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SuggestedTasksModal open={openModal} onClose={() => setOpenModal(false)} />
      </Box>
    </PageLayout>
  );
}
