import { create } from 'zustand';

type HatOption = 'none' | 'black' | 'blue' | 'brown';

interface CompanionHat {
  hat: HatOption;
  setHat: (hat: HatOption) => void;
}

export const useCompanionHatStore = create<CompanionHat>((set) => ({
  hat: 'none',
  setHat: (hat) => set({ hat }),
}));
