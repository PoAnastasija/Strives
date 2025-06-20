import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography, useTheme } from '@mui/material';
import ProjectCard from '@components/cards/ProjectCard/ProjectCard';
import { Project } from '@hooks/useProject';

const statuses: { key: Project['status']; label: string; color: string }[] = [
  { key: 'todo', label: 'To Do', color: '#f44336' },
  { key: 'in-progress', label: 'In Progress', color: '#ff9800' },
  { key: 'done', label: 'Done', color: '#4caf50' },
];

type Props = {
  projects: Project[];
  onStatusChange: (id: string, newStatus: Project['status']) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProjectsKanbanDndKit({ projects, onStatusChange, onEdit, onDelete }: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const draggedProject = projects.find(p => p.id === activeId);
    if (!draggedProject) return;

    const sourceStatus = draggedProject.status;
    const destinationStatus = overId as Project['status'];
    if (sourceStatus !== destinationStatus) {
      onStatusChange(draggedProject.id, destinationStatus);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box display="flex" gap={2} flexGrow={1} flexWrap="wrap">
        {statuses.map(({ key, label, color }) => {
          const columnProjects = projects.filter(p => p.status === key);
          return (
            <DroppableColumn
              key={key}
              id={key}
              label={label}
              color={color}
              isDark={isDark}
              projects={columnProjects}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </Box>
    </DndContext>
  );
}

function DroppableColumn({
  id,
  label,
  color,
  projects,
  onEdit,
  onDelete,
  isDark,
}: {
  id: string;
  label: string;
  color: string;
  isDark: boolean;
  projects: Project[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <Box
      ref={setNodeRef}
      id={id}
      sx={{
        width: 200,
        backgroundColor: isDark ? '#423c83' : '#E5E5FF',
        color: 'inherit',
        p: 2,
        borderRadius: 2,
        boxShadow: isDark
          ? '0 0 6px rgba(255,255,255,0.1)'
          : '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: color }} />
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', flex: 1 }}>{label}</Typography>
        <Typography
          variant="caption"
          sx={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderRadius: '12px',
            px: 1,
            py: 0.5,
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {projects.length}
        </Typography>
      </Box>

      <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
        <Box display="flex" flexDirection="column" gap={1.5} p={1} borderRadius={1} minHeight={120}>
          {projects.map(project => (
            <SortableCard
              key={project.id}
              id={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </Box>
      </SortableContext>
    </Box>
  );
}

function SortableCard({
  id,
  project,
  onEdit,
  onDelete
}: {
  id: string;
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
      }}
    >
      <ProjectCard
        project={project}
        onEdit={() => onEdit(project.id)}
        onDelete={() => onDelete(project.id)}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </Box>
  );
}
