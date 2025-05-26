export type Task = {
    id: string;
    title: string;
    type: 'daily' | 'habit' | 'todo';
    xp: number;
    done: boolean;
  };
  