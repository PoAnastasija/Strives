// import { Card, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material';
// import { Task } from '../../types/Task.ts';

// type Props = {
//   task: Task;
//   onToggle: (id: string) => void;
// };

// export const TaskCard = ({ task, onToggle }: Props) => (
//   <Card sx={{ mb: 2 }}>
//     <CardContent>
//       <FormControlLabel
//         control={<Checkbox checked={task.done} onChange={() => onToggle(task.id)} />}
//         label={
//           <Typography>
//             {task.title} <small>+{task.xp} XP</small>
//           </Typography>
//         }
//       />
//     </CardContent>
//   </Card>
// );
import { Card, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Task } from '../../features/tasks/taskSlice';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
};

export const TaskCard = ({ task, onToggle }: Props) => (
  <Card sx={{ mb: 2 }}>
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
