import { useState } from 'react';
import { Box, Grid, Fade, Grow } from '@mui/material';
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
import AppButton from '@components/Buttons/AppButton';

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
      <Box className={styles.dashboardContainer}>
        <Fade in={true} timeout={800}>
          <div>
            <CompanionCard xp={xp} xpMax={xpMax} className={styles.companionCard} />
          </div>
        </Fade>

        <Grid container spacing={3} justifyContent="center" style={{ width: '100%', maxWidth: '1600px' }}>
          <Grow in={true} timeout={1200}>
            <Grid item xs={12} md={7}>
              <Box className={styles.columnLayout}>
                <TaskList />
                <AppButton onClick={() => setOpenModal(true)} startIcon={<Add />}>
                  Add a task
                </AppButton>
              </Box>
            </Grid>
          </Grow>

          <Grow in={true} timeout={1400}>
            <Grid item xs={12} md={7}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Grid container spacing={3} justifyContent="center">
                    <Grow in={true} timeout={1500}>
                      <Grid item xs={6} md={6}>
                        <StatCard title="Levels" value={`${level}`} />
                      </Grid>
                    </Grow>
                    <Grow in={true} timeout={1600}>
                      <Grid item xs={6} md={6}>
                        <StatCard title="Coins" value={`${gold}`} />
                      </Grid>
                    </Grow>
                  </Grid>
                </Grid>
                <Grow in={true} timeout={1700}>
                  <Grid item>
                    <RewardCard
                      title="Reward"
                      cost={100}
                      onClaim={handleClaimReward}
                      disabled={gold < 100}
                    />
                  </Grid>
                </Grow>
              </Grid>
            </Grid>
          </Grow>
        </Grid>

        <SuggestedTasksModal open={openModal} onClose={() => setOpenModal(false)} />
      </Box>
    </PageLayout>
  );
}
