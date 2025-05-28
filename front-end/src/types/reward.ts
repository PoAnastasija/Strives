export interface Reward {
    id: string;
    title: string;
    cost: number;
    link?: string; 
  };

  export interface RewardStore {
    rewards: Reward[];
    addReward: (reward: Reward) => void;
  };
  