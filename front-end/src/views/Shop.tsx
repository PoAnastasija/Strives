import { Box, Grid, Button } from '@mui/material';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import { RewardCard } from '@components/cards/RewardCard/RewardCard';
import { useRewardStore } from '@features/rewards/rewardSlice';
import { useState } from 'react';
import { AddRewardModal } from '@features/rewards/AddRewardModal';
import { useTaskStore } from '@features/tasks/taskSlice';
import { Reward } from '@types/reward';

export default function Shop() {
  const { rewards } = useRewardStore();
  const { gold, spendGold } = useTaskStore();
  const [open, setOpen] = useState<boolean>(false);
  const handleClaimReward = (reward: Reward) => {
    if (gold < reward.cost) {
      console.log("Not enough money");
      return;
    }
    spendGold(reward.cost);
    console.log(`"${reward.title}" claimed`);
  };

  return (
    <PageLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>🏪 Shop</h1>
        <div>🪙 Your coins : {gold}</div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add a reward
        </Button>
      </Box>

      <Grid container spacing={3} mt={2}>
        {rewards.map((reward) => (
          <Grid item xs={12} sm={6} md={4} key={reward.id}>
            <RewardCard
              title={reward.title}
              cost={reward.cost}
              link={reward.link}
              onClaim={() => handleClaimReward(reward)}
              disabled={gold < reward.cost}
            />
          </Grid>
        ))}
      </Grid>

      <AddRewardModal open={open} onClose={() => setOpen(false)} />
    </PageLayout>
  );
}
