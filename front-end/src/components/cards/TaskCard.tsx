import { Card, CardContent, Checkbox, FormControlLabel } from '@mui/material';
import { Task } from '@features/tasks/taskSlice';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

export const TaskCard = ({ task, onToggle }: TaskCardProps) => (
  <Card className={styles.card}>
    <CardContent className={styles.cardContent}>
      <FormControlLabel
        control={<Checkbox checked={task.done} onChange={() => onToggle(task.id)} />}
        label={
          <span className={styles.labelText}>
            {task.title} <small>+{task.xp} XP</small>
          </span>
        }
      />
    </CardContent>
  </Card>
);
