// import { Typography, Box } from '@mui/material';
// import { PageLayout } from '../components/layout/PageLayout';
// import { AvatarDisplay } from '../components/AvatarDisplay';
// import { TaskList } from '../features/tasks/TaskList';
// import { AddTaskModal } from '../features/tasks/AddTaskModal';

// export default function Dashboard() {
//   return (
//     <PageLayout>
//       <Typography variant="h4" mb={2}>Bienvenue, Helios 👋</Typography>

//       <Box mt={2}>
//         <AvatarDisplay />
//       </Box>

//       <Box mt={4}>
//         <TaskList />
//       </Box>

//       <Box mt={2}>
//         <AddTaskModal />
//       </Box>
//     </PageLayout>
//   );
// }
import { Typography, Box } from '@mui/material';
import { PageLayout } from '../components/layout/PageLayout';
import { AvatarDisplay } from '../components/AvatarDisplay';
import { TaskList } from '../features/tasks/TaskList';
import { AddTaskModal } from '../features/tasks/AddTaskModal';

type DashboardProps = {
  toggleTheme: () => void;
};

export default function Dashboard({ toggleTheme }: DashboardProps) {
  return (
    <PageLayout toggleTheme={toggleTheme}>
      <Box mt={2}>
        <AvatarDisplay />
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
