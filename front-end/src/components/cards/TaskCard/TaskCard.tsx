import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '@features/tasks/taskSlice';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      sx={{
        backgroundColor: isDark ? '#28206f' : '#ffffff',
        borderRadius: '20px',
        boxShadow: isDark
          ? '0 0 4px rgba(255,255,255,0.05)'
          : '0 4px 12px rgba(0,0,0,0.06)',
        mb: 2,
      }}
    >
      <CardContent
        sx={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={task.done}
              onChange={() => onToggle(task.id)}
              sx={{
                color: isDark ? '#90CAF9' : undefined,
              }}
            />
          }
          label={
            <span style={{ fontWeight: 500, color: isDark ? '#E3F2FD' : '#2C2C3E' }}>
              {task.title}{' '}
              <small style={{ opacity: 0.7 }}>+{task.xp} XP</small>
            </span>
          }
        />
        <IconButton
          onClick={() => onDelete(task.id)}
          size="small"
          aria-label="Delete"
          sx={{
            color: isDark ? '#90CAF9' : '#333',
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardContent>
    </Card>
  );
};
