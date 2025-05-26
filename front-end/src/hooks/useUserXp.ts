import { useTaskStore } from '@features/tasks/taskSlice';

export const useUserXp = () => {
  const { tasks } = useTaskStore();
  const xp = tasks.filter((t) => t.done).reduce((acc, t) => acc + t.xp, 0);
  return xp;
};