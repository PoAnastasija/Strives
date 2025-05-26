import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { PageLayout } from '@components/layout/PageLayout';
import { CompanionCard } from '@components/cards/CompanionCard';
import { StatCard } from '@components/cards/StatCard';
import { RewardCard } from '@components/cards/RewardCard';
import { TaskList } from '@features/tasks/TaskList';
import { SuggestedTasksModal } from '@features/tasks/SuggestedTasksModal';
import { useTaskStore } from '@features/tasks/taskSlice';
import styles from './Dashboard.module.css';
import { Task } from '@types/task';

export default function Dashboard() {
  const { tasks } = useTaskStore();
  const xp = tasks.filter((t: Task) => t.done).reduce((acc, t) => acc + t.xp, 0);
  const xpMax = 300;
  const level = Math.floor(xp / xpMax) + 1;
  const gold = tasks.filter((t: Task) => t.done).reduce((acc, t) => acc + Math.floor(t.xp / 2), 0);
  const [openModal, setOpenModal] = useState(false);
  const handleClaimReward = () => {
    alert('Récompense réclamée');
  };

  return (
    <PageLayout>
      <Box className={styles.dashboardContainer}>
        <Box className={styles.header}>
          <h1>Hello !</h1>
          <p>Prêt à gagner de l’XP ?</p>
        </Box>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box className={styles.columnLayout}>
              <CompanionCard xp={xp} xpMax={xpMax} />
              <Box>
                <TaskList />
                <Button
                  variant="contained"
                  onClick={() => setOpenModal(true)}
                  className={styles.addButton}
                >
                  Ajouter une tâche
                </Button>
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
