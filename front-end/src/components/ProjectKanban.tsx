import { Box, Typography, useTheme } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import ProjectCard from '@components/cards/ProjectCard/ProjectCard';
import { Project } from '@hooks/useProject';

type Props = {
  projects: Project[];
  onDragEnd: (result: DropResult) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const statuses: { key: Project['status']; label: string }[] = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];

export default function ProjectsKanban({ projects, onDragEnd, onEdit, onDelete }: Props) {
  const theme = useTheme();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex" gap={2} flexGrow={1} flexWrap="wrap">
        {statuses.map(({ key, label }) => (
          <Box
            key={key}
            sx={{
              width: 200,
              backgroundColor:
                theme.palette.mode === 'dark' ? '#2b2b2b' : '#E5E5FF',
              color: theme.palette.text.primary,
              p: 1.5,
              borderRadius: 2,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 0 6px rgba(255,255,255,0.1)'
                : '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.3s ease',
            }}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              {label}
            </Typography>
            <Droppable droppableId={key}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  minHeight={120}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.2,
                  }}
                >
                  {projects
                    .filter(p => p.status === key)
                    .map((p, index) => (
                      <Draggable key={p.id} draggableId={p.id} index={index}>
                        {(prov) => (
                          <Box
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                          >
                            <ProjectCard
                              project={p}
                              onEdit={onEdit}
                              onDelete={onDelete}
                            />
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        ))}
      </Box>
    </DragDropContext>
  );
}
