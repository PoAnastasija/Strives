import { create } from 'zustand';
import { Reward } from '@types/reward';

type RewardStore = {
  rewards: Reward[];
  addReward: (reward: Reward) => void;
};

export const useRewardStore = create<RewardStore>((set) => ({
  rewards: [
    { id: '1', title: 'Casque audio', cost: 50 },
    { id: '2', title: 'Cours udemy', cost: 100 },
  ],
  addReward: (reward) =>
    set((state) => ({
      rewards: [...state.rewards, reward],
    })),
}));
