import { Box, Typography } from '@mui/material';
import { useTaskStore } from './taskSlice';
import { TaskCard } from '../../components/cards/TaskCard';

export const TaskList = () => {
  const { tasks, toggleTask } = useTaskStore();

  console.log("Tâches chargées :", tasks);

  return (
    <Box>
      <Typography variant="h6" mb={2}>Tâches du jour</Typography>
      {tasks.length === 0 && <Typography>Aucune tâche à afficher.</Typography>}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={toggleTask} />
      ))}
    </Box>
  );
};

