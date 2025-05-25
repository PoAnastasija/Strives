// import { create } from 'zustand';

// export type Task = {
//   id: string;
//   title: string;
//   type: 'daily' | 'habit' | 'todo';
//   xp: number;
//   done: boolean;
// };

// type TaskStore = {
//   tasks: Task[];
//   toggleTask: (id: string) => void;
//   addTask: (task: Task) => void;
// };

// export const useTaskStore = create<TaskStore>((set) => ({
//   tasks: [
//     { id: '1', title: 'Faire du sport', type: 'daily', xp: 10, done: false },
//     { id: '2', title: 'Lire 10 pages', type: 'habit', xp: 5, done: false },
//   ],
//   toggleTask: (id) =>
//     set((state) => ({
//       tasks: state.tasks.map((task) =>
//         task.id === id ? { ...task, done: !task.done } : task
//       ),
//     })),
//   addTask: (task) =>
//     set((state) => ({
//       tasks: [...state.tasks, task],
//     })),
// }));

import { create } from 'zustand';

export type Task = {
  id: string;
  title: string;
  type: 'daily' | 'habit' | 'todo';
  xp: number;
  done: boolean;
};

type TaskStore = {
  tasks: Task[];
  toggleTask: (id: string) => void;
  addTask: (task: Task) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { id: '1', title: 'Faire du sport', type: 'daily', xp: 10, done: false },
    { id: '2', title: 'Lire un chapitre', type: 'habit', xp: 5, done: false },
  ],
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      ),
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
}));
