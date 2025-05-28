export type TaskType = 'daily' | 'habit' | 'todo' | 'movement' | 'nutrition' | 'work';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  xp: number;
  done: boolean;
};

export interface TaskStore {
  tasks: Task[];
  toggleTask: (id: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  gold: number;
  spendGold: (amount: number) => void;
};