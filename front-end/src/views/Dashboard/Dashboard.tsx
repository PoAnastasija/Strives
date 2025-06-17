import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import { CompanionCard } from '@components/cards/CompanionCard/CompanionCard';
import { StatCard } from '@components/cards/StatCard/StatCard';
import { RewardCard } from '@components/cards/RewardCard/RewardCard';
import { TaskList } from '@features/tasks/TaskList/TaskList';
import { SuggestedTasksModal } from '@features/tasks/SuggestedTasks/SuggestedTasksModal';
import { useTaskStore } from '@features/tasks/taskSlice';
import { useUserXp } from '@hooks/useUserXp';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { gold } = useTaskStore();
  const xp = useUserXp();
  const xpMax = 1000;
  const level = Math.floor(xp / xpMax) + 1;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClaimReward = () => {
    console.log('Reward claimed');
  };

  return (
    <PageLayout>
      <Box display="flex" justifyContent="center">
        <CompanionCard xp={xp} xpMax={xpMax} />
      </Box>

      <Box className={styles.dashboardContainer}>
        <Box className={styles.header}>
          <h1>Hello !</h1>
          <p>Today is a good day to grow!</p>
        </Box>

        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box className={styles.columnLayout}>
              <TaskList />
              <Button
                variant="contained"
                onClick={() => setOpenModal(true)}
                className={styles.addButton}
              >
                Add a task
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={4}>
                    <StatCard title="Levels" value={`${level} 👑`} />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <StatCard title="Money" value={`${gold} 🪙`} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <RewardCard
                  title="Title"
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
