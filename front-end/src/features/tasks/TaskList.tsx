import { Box } from '@mui/material';
import { useTaskStore } from '@features/tasks/taskSlice';
import { TaskCard } from '@components/cards/TaskCard';
import styles from './TaskList.module.css';

export const TaskList = () => {
  const { tasks, toggleTask, deleteTask } = useTaskStore();

  return (
    <Box>
      <h2 className={styles.title}>Today's tasks</h2>
      {tasks.length === 0 && <p className={styles.empty}>There is no tasks to display.</p>}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ))}
    </Box>
  );
};

