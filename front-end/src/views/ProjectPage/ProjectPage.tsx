import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import ProjectsToolbar from '@components/ProjectToolBar';
import ProjectsKanban from '@components/ProjectKanban';
import ProjectsStats from '@components/ProjectStats';
import ProjectForm, { ProjectFormData } from '@components/ProjectForm';
import { useProjects, Project } from '@hooks/useProject';
import styles from './ProjectPage.module.css';

export default function ProjectPage() {
  const { projects, addProject, updateProject, removeProject } = useProjects();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] =
    useState<'all' | Project['status']>('all');
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [formOpen, setFormOpen] = useState(false);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [projects, search, statusFilter]);

  const onDragEnd = (res: DropResult) => {
    const { source, destination, draggableId } = res;
    if (!destination || source.droppableId === destination.droppableId) return;
    updateProject(draggableId, {
      status: destination.droppableId as Project['status']
    });
  };

  const handleAdd = () => {
    setEditingProject(undefined);
    setFormOpen(true);
  };

  const handleEdit = (id: string) => {
    const p = projects.find(x => x.id === id);
    if (!p) return;
    setEditingProject(p);
    setFormOpen(true);
  };

  const handleSave = (data: ProjectFormData) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
    } else {
      addProject(data);
    }
  };

  return (
    <PageLayout>
      <ProjectsToolbar
        search={search}
        statusFilter={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onAddClick={handleAdd}
      />

      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        minHeight="75vh"
        width="100%"
        overflow="hidden"
      >
        <Box className={styles.kanbanContainer}>
          <ProjectsKanban
            projects={filtered}
            onDragEnd={onDragEnd}
            onEdit={handleEdit}
            onDelete={removeProject}
          />
        </Box>

        <Box className={styles.statsContainer}>
          <ProjectsStats projects={filtered} />
        </Box>
      </Box>

      <ProjectForm
        open={formOpen}
        project={editingProject}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />
    </PageLayout>
  );
}
