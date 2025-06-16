import { Card, CardContent, Typography, Chip, Box, IconButton, Link } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Project } from '@hooks/useProject';

type Props = {
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProjectCard({ project, onEdit, onDelete }: Props) {
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Typography variant="h6">{project.title}</Typography>
          <Box>
            {project.link && (
              <Link href={project.link} target="_blank" rel="noopener" sx={{ mr: 1 }}>
                <LaunchIcon fontSize="small" />
              </Link>
            )}
            <IconButton size="small" onClick={() => onEdit(project.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(project.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {project.description}
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {project.tags.map(tag => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>
        {project.dueDate && (
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Due: {new Date(project.dueDate).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
