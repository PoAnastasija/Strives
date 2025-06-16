import { Box, Typography, useTheme } from '@mui/material';
import { Project } from '@hooks/useProject';

type Props = { projects: Project[] };

export default function ProjectsStats({ projects }: Props) {
  const theme = useTheme();

  const countByStatus = (s: Project['status']) =>
    projects.filter(p => p.status === s).length;

  return (
    <Box
      sx={{
        width: 200,
        p: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="subtitle1" gutterBottom sx={{ color: 'inherit' }}>
        Stats
      </Typography>
      <Typography sx={{ color: 'inherit' }}>To Do: {countByStatus('todo')}</Typography>
      <Typography sx={{ color: 'inherit' }}>In Progress: {countByStatus('in-progress')}</Typography>
      <Typography sx={{ color: 'inherit' }}>Done: {countByStatus('done')}</Typography>
      <Typography sx={{ mt: 1, color: 'inherit' }}>Total: {projects.length}</Typography>
    </Box>
  );
}
