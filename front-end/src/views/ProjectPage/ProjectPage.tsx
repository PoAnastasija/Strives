import { useState, useMemo, useCallback } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { DropResult } from 'react-beautiful-dnd';
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
  const [statusFilter, setStatusFilter] = useState<'all' | Project['status']>('all');
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [formOpen, setFormOpen] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const filtered = useMemo(() => {
    return projects.filter(p => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [projects, search, statusFilter]);

  const showNotification = useCallback((message: string, severity: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  }, []);

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || 
        (source.droppableId === destination.droppableId &&
         source.index === destination.index)) {
      return;
    }

    try {
      const project = projects.find(p => p.id === draggableId);
      if (!project) return;

      if (source.droppableId !== destination.droppableId) {
        const newStatus = destination.droppableId as Project['status'];
        updateProject(draggableId, { status: newStatus });
        showNotification(
          `"${project.title}" déplacé vers ${
            { 'todo': 'À faire', 'in-progress': 'En cours', 'done': 'Terminé' }[newStatus]
          }`,
          'success'
        );

        console.log(`✅ Projet "${project.title}" déplacé vers "${newStatus}"`);
      }
    } catch (error) {
      console.error('Erreur drag and drop:', error);
      showNotification('Erreur lors du déplacement du projet', 'error');
    }
  }, [projects, updateProject, showNotification]);

  const handleAdd = useCallback(() => {
    setEditingProject(undefined);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((id: string) => {
    const project = projects.find(x => x.id === id);
    if (!project) {
      showNotification('Projet non trouvé', 'error');
      return;
    }
    setEditingProject(project);
    setFormOpen(true);
  }, [projects, showNotification]);

  const handleDelete = useCallback((id: string) => {
    try {
      const project = projects.find(p => p.id === id);
      removeProject(id);
      showNotification(
        `Projet "${project?.title || 'Untitled'}" supprimé`,
        'info'
      );
    } catch (error) {
      showNotification('Erreur lors de la suppression', 'error');
    }
  }, [projects, removeProject, showNotification]);

  const handleSave = useCallback((data: ProjectFormData) => {
    try {
      if (editingProject) {
        updateProject(editingProject.id, data);
        showNotification(`Projet "${data.title}" mis à jour`, 'success');
      } else {
        addProject({ ...data, status: 'todo' });
        showNotification(`Projet "${data.title}" créé`, 'success');
      }
      setFormOpen(false);
    } catch (error) {
      showNotification(
        `Erreur lors de ${editingProject ? 'la mise à jour' : 'la création'} du projet`,
        'error'
      );
    }
  }, [editingProject, updateProject, addProject, showNotification]);

  const handleCloseNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, open: false }));
  }, []);

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
        sx={{ overflow: 'visible' }}
      >
        <Box className={styles.kanbanContainer}>
          <ProjectsKanban
            projects={projects}
            onDragEnd={onDragEnd}
            onEdit={handleEdit}
            onDelete={handleDelete}
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

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </PageLayout>
  );
}
