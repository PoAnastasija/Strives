export type TaskType = 'daily' | 'habit' | 'todo';

export type Task = {
  id: string;
  title: string;
  type: 'daily' | 'habit' | 'todo';
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