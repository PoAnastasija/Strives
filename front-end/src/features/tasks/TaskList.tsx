// import { Box } from '@mui/material';
// import { useTaskStore } from './taskSlice';
// import { TaskCard } from '@components/cards/TaskCard';
// import styles from './TaskList.module.css';

// export const TaskList = () => {
//   const { tasks, toggleTask } = useTaskStore();

//   console.log("Tâches chargées :", tasks);

//   return (
//     <Box>
//       <h2 className={styles.taskListTitle}>Tâches du jour</h2>
//       {tasks.length === 0 && <p className="taskListEmpty">Aucune tâche à afficher.</p>}
//       {tasks.map((task) => (
//         <TaskCard key={task.id} task={task} onToggle={toggleTask} />
//       ))}
//     </Box>
//   );
// };
import { Box } from '@mui/material';
import { useTaskStore } from '@features/tasks/taskSlice';
import { TaskCard } from '@components/cards/TaskCard';
import styles from './TaskList.module.css';

export const TaskList = () => {
  const { tasks, toggleTask, deleteTask } = useTaskStore();

  return (
    <Box>
      <h2 className={styles.title}>Tâches du jour</h2>
      {tasks.length === 0 && <p className={styles.empty}>Aucune tâche à afficher.</p>}
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

