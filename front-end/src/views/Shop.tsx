import { Box, Grid, Chip, Fade, Grow } from '@mui/material';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import { RewardCard } from '@components/cards/RewardCard/RewardCard';
import { useRewardStore } from '@features/rewards/rewardSlice';
import { useState } from 'react';
import { AddRewardModal } from '@features/rewards/AddRewardModal';
import { useTaskStore } from '@features/tasks/taskSlice';
import { Reward } from '@type/reward';
import { useTheme } from '@mui/material/styles';
import { Add, AttachMoney } from '@mui/icons-material';
import AppButton from '@components/buttons/AppButton';

export default function Shop() {
  const { rewards } = useRewardStore();
  const { gold, spendGold } = useTaskStore();
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  const handleClaimReward = (reward: Reward) => {
    if (gold < reward.cost) {
      console.log("Not enough coins");
      return;
    }
    spendGold(reward.cost);
    console.log(`"${reward.title}" claimed`);
  };

  return (
    <PageLayout>
      <Fade in={true} timeout={800}>
        <Box mb={4} textAlign="center">
          <h1 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Reward Shop</h1>
          <p style={{ maxWidth: 500, margin: '0 auto' }}>
            Spend your hard-earned coins to treat yourself!
          </p>
        </Box>
      </Fade>

      <Grow in={true} timeout={1200}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
          flexWrap="wrap"
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Chip 
              icon={<AttachMoney />}
              label={`${gold} coins`}
              sx={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                color: '#333',
                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                '& .MuiChip-icon': { color: '#333' }
              }}
            />
          </Box>

          <AppButton 
            onClick={() => setOpen(true)}
            startIcon={<Add />}
          >
            Add New Reward
          </AppButton>
        </Box>
      </Grow>

      <Grid container spacing={3} mt={1}>
        {rewards.map((reward, index) => (
          <Grow in={true} timeout={800 + index * 100} key={reward.id}>
            <Box
              sx={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  '& .reward-card': {
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  }
                }
              }}
            >
              <RewardCard
                className="reward-card"
                title={reward.title}
                cost={reward.cost}
                link={reward.link}
                onClaim={() => handleClaimReward(reward)}
                disabled={gold < reward.cost}
              />
            </Box>
          </Grow>
        ))}
      </Grid>
      
      <AddRewardModal open={open} onClose={() => setOpen(false)} />
    </PageLayout>
  );
}
