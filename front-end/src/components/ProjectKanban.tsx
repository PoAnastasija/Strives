import { Box, useTheme } from '@mui/material';
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
  const isDark = theme.palette.mode === 'dark';

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex" gap={2} flexGrow={1} flexWrap="wrap">
        {statuses.map(({ key, label }) => (
          <Box
            key={key}
            sx={{
              width: 187,
              backgroundColor: isDark ? '#423c83' : '#E5E5FF',
              color: theme.palette.text.primary,
              p: 1.5,
              borderRadius: 2,
              boxShadow: isDark
                ? '0 0 6px rgba(255,255,255,0.1)'
                : '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.3s ease',
            }}
          >
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>{label}</h3>
            <Droppable droppableId={key}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  minHeight={110}
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
