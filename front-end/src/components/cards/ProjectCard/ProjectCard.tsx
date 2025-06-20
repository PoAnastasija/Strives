import { Card, CardContent, Chip, Box, IconButton, Link } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Project } from '@hooks/useProject';

type Props = {
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  dragHandleProps?: any;
};

export default function ProjectCard({ project, onEdit, onDelete, dragHandleProps }: Props) {
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box
            {...dragHandleProps}
            sx={{ cursor: 'grab', '&:active': { cursor: 'grabbing' } }}
          >
            <h6 style={{ margin: 0 }}>{project.title}</h6>
          </Box>

          <Box>
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener"
                onClick={e => e.stopPropagation()}
                sx={{ mr: 1 }}
              >
                <LaunchIcon fontSize="small" />
              </Link>
            )}
            <IconButton
              size="small"
              onClick={e => {
                e.stopPropagation();
                onEdit(project.id);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={e => {
                e.stopPropagation();
                onDelete(project.id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <p style={{ margin: '0.5rem 0', color: 'gray', fontSize: '0.85rem' }}>
          {project.description}
        </p>

        <Box display="flex" gap={1} flexWrap="wrap">
          {project.tags.map(tag => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>

        {project.dueDate && (
          <small style={{ display: 'block', marginTop: '0.75rem', color: 'gray' }}>
            Due: {new Date(project.dueDate).toLocaleDateString()}
          </small>
        )}
      </CardContent>
    </Card>
  );
}
