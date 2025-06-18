import { Box, useTheme } from '@mui/material';
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
      <h4 style={{ marginBottom: '0.5rem', fontSize: '1.0rem' }}>Stats</h4>
      <h4 style={{ fontSize: '0.9rem' }}>To Do: {countByStatus('todo')}</h4>
      <h4 style={{ fontSize: '0.9rem' }}>In Progress: {countByStatus('in-progress')}</h4>
      <h4 style={{ fontSize: '0.9rem' }}>Done: {countByStatus('done')}</h4>
      <h4 style={{ fontSize: '0.9rem' }}>Total: {projects.length}</h4>
    </Box>
  );
}
