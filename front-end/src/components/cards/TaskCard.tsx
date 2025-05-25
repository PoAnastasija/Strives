import { Card, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Task } from '../../features/tasks/taskSlice';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
};

export const TaskCard = ({ task, onToggle }: Props) => (
  // <Card sx={{ mb: 2 }}>
  <Card
  sx={{
    mb: 2,
    borderRadius: 3,
    backgroundColor: 'background.paper',
    boxShadow: 2,
    '&:hover': {
      boxShadow: 4,
      transform: 'scale(1.01)',
      transition: '0.2s ease',
    },
  }}
>

    <CardContent>
      <FormControlLabel
        control={<Checkbox checked={task.done} onChange={() => onToggle(task.id)} />}
        label={
          <Typography>
            {task.title} <small>+{task.xp} XP</small>
          </Typography>
        }
      />
    </CardContent>
  </Card>
);
