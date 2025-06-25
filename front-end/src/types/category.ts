export type Category = 'movement' | 'work' | 'nutrition';

export const CATEGORY_LABELS: Record<Category, string> = {
  movement: 'Movement',
  work: 'Work',
  nutrition: 'Nutrition',
};

export interface SuggestedTasksModalProps {
  open: boolean;
  onClose: () => void;
};