import { create } from 'zustand';

type MoodState = {
  mood: string;
  note: string;
  setMood: (mood: string) => void;
  setNote: (note: string) => void;
};

export const useMoodStore = create<MoodState>((set) => ({
  mood: '😊',
  note: '',
  setMood: (mood) => set({ mood }),
  setNote: (note) => set({ note }),
}));
