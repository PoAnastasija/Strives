import { create } from 'zustand';
import { TaskStore } from '@type/task';

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { id: '1', title: 'Do a workout', type: 'daily', xp: 10, done: false },
    { id: '2', title: 'Read a chapter', type: 'habit', xp: 5, done: false },
  ],
  toggleTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );

      const goldEarned = updatedTasks
        .filter((t) => t.done)
        .reduce((acc, t) => acc + Math.floor(t.xp / 2), 0);

      return {
        tasks: updatedTasks,
        gold: goldEarned,
      };
    }),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  gold: 0,
  spendGold: (amount) =>
    set((state) => ({
      gold: state.gold - amount,
    })),
}));
