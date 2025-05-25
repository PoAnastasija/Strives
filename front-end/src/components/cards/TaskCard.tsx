import { Card, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Task } from '../../features/tasks/taskSlice';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
};

export const TaskCard = ({ task, onToggle }: Props) => (
  <Card
    sx={{
      mb: 2,
      borderRadius: 3,
      backgroundColor: 'background.paper',
      boxShadow: 2,
      maxWidth: 320,
      '&:hover': {
        boxShadow: 4,
        transform: 'scale(1.01)',
        transition: '0.2s ease',
      },
    }}
  >
    <CardContent sx={{ p: '9px 12px', '&:last-child': { pb: '10px' } }}>
      <FormControlLabel
        control={<Checkbox checked={task.done} onChange={() => onToggle(task.id)} />}
        label={
          <Typography variant="body2">
            {task.title} <small>+{task.xp} XP</small>
          </Typography>
        }
      />
    </CardContent>
  </Card>
);
