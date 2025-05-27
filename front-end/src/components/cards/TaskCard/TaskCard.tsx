import { Card, CardContent, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '@features/tasks/taskSlice';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => (
  <Card className={styles.card}>
    <CardContent className={styles.cardContent}>
      <div className={styles.row}>
        <FormControlLabel
          control={<Checkbox checked={task.done} onChange={() => onToggle(task.id)} />}
          label={
            <span className={styles.labelText}>
              {task.title} <small>+{task.xp} XP</small>
            </span>
          }
        />
        <IconButton onClick={() => onDelete(task.id)} size="small" aria-label="Supprimer">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </CardContent>
  </Card>
);
