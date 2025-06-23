import { useState } from 'react';
import { Box, Button, Grid, Chip, Grow } from '@mui/material';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import { CompanionCard } from '@components/cards/CompanionCard/CompanionCard';
import { StatCard } from '@components/cards/StatCard/StatCard';
import { RewardCard } from '@components/cards/RewardCard/RewardCard';
import { TaskList } from '@features/tasks/TaskList/TaskList';
import { SuggestedTasksModal } from '@features/tasks/SuggestedTasks/SuggestedTasksModal';
import { useTaskStore } from '@features/tasks/taskSlice';
import { useUserXp } from '@hooks/useUserXp';
import { Add } from '@mui/icons-material';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { gold } = useTaskStore();
  const xp = useUserXp();
  const xpMax = 100;
  const level = Math.floor(xp / xpMax) + 1;
  const [openModal, setOpenModal] = useState(false);

  const handleClaimReward = () => {
    console.log('Reward claimed');
  };

  return (
    <PageLayout>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%)',
          zIndex: -2,
          pointerEvents: 'none',
        }}
      />

      <Box className={styles.dashboardContainer}>
        <CompanionCard xp={xp} xpMax={xpMax} className={styles.companionCard} />

        <Grid container spacing={3} justifyContent="center" style={{ width: '100%', maxWidth: '1600px' }}>
          <Grid item xs={12} md={7}>
            <Box className={styles.columnLayout}>
              <TaskList />
              <Button
                variant="contained"
                onClick={() => setOpenModal(true)}
                className={styles.addButton}
                startIcon={<Add />}
                sx={{
                  borderRadius: 25,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  px: 2,
                  py: 1.0,
                  background: 'linear-gradient(45deg,rgb(139, 107, 255),rgb(36, 164, 238))',
                  boxShadow: '0 8px 25px rgba(134, 107, 255, 0.4)',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                Add a task
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={6} md={6}>
                    <StatCard title="Levels" value={`${level}`} />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <StatCard title="Coins" value={`${gold}`} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <RewardCard
                  title="Reward"
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
