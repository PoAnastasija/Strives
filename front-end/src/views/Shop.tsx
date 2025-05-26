import { Box, Grid, Button } from '@mui/material';
import { PageLayout } from '@components/layout/PageLayout';
import { RewardCard } from '@components/cards/RewardCard';
import { useRewardStore } from '@features/rewards/rewardSlice';
import { useState } from 'react';
import { AddRewardModal } from '@features/rewards/AddRewardModal';

export default function Shop() {
  const { rewards } = useRewardStore();
  const [open, setOpen] = useState(false);

  return (
    <PageLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>🏪 Boutique</h1>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Ajouter une récompense
        </Button>
      </Box>
      <Grid container spacing={3} mt={2}>
        {rewards.map((reward) => (
          <Grid item xs={12} sm={6} md={4} key={reward.id}>
            <RewardCard
              title={reward.title}
              cost={reward.cost}
              onClaim={() => alert(`Récompense "${reward.title}" réclamée !`)}
              disabled={false}
            />
          </Grid>
        ))}
      </Grid>
      <AddRewardModal open={open} onClose={() => setOpen(false)} />
    </PageLayout>
  );
}
