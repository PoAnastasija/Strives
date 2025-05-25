import { Typography, Box } from '@mui/material';
import { PageLayout } from '../components/layout/PageLayout';
import { AvatarDisplay } from '../components/AvatarDisplay';
import { TaskList } from '../features/tasks/TaskList';
import { AddTaskModal } from '../features/tasks/AddTaskModal';
import { XpProgressBar } from '../components/layout/XpProgressBar';
import { useTaskStore } from '../features/tasks/taskSlice';


export default function Dashboard() {
  const { tasks } = useTaskStore();
  const xp = tasks.filter((t) => t.done).reduce((acc, t) => acc + t.xp, 0);
  const xpMax = 100;

  return (
    <PageLayout>
      <Box mt={2}>
        <AvatarDisplay />
      </Box>
      <Box mb={4}>
        <XpProgressBar xp={xp} xpMax={xpMax} />
      </Box>
      <Box mt={4}>
        <TaskList />
      </Box>

      <Box mt={2}>
        <AddTaskModal />
      </Box>
    </PageLayout>
  );
}
