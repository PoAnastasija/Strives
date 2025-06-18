import { create } from 'zustand';
import { RewardStore } from '@types/reward';


export const useRewardStore = create<RewardStore>((set) => ({
  rewards: [
    { id: '1', title: 'Reward', cost: 50 },
    { id: '2', title: 'Reward', cost: 100 },
  ],
  addReward: (reward) =>
    set((state) => ({
      rewards: [...state.rewards, reward],
    })),
}));
