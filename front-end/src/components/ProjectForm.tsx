import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem
} from '@mui/material';
import { Project } from '@hooks/useProject';

export type ProjectFormData = Pick<Project, 'title'|'description'|'status'|'tags'|'dueDate'|'link'>;

type Props = {
  open: boolean;
  project?: Project;
  onClose: () => void;
  onSave: (data: ProjectFormData) => void;
};

export default function ProjectForm({ open, project, onClose, onSave }: Props) {
  const [form, setForm] = useState<ProjectFormData>({
    title: '',
    description: '',
    status: 'todo',
    tags: [],
    dueDate: null,
    link: null
  });

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        description: project.description,
        status: project.status,
        tags: project.tags,
        dueDate: project.dueDate,
        link: project.link
      });
    }
  }, [project]);

  const handleChange = <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{project ? 'Edut project' : 'Add a project'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField
          label="Title"
          value={form.title}
          onChange={e => handleChange('title', e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={form.description}
          onChange={e => handleChange('description', e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          label="Statut"
          select
          value={form.status}
          onChange={e => handleChange('status', e.target.value as Project['status'])}
        >
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>
        <TextField
          label="Notion link"
          value={form.link ?? ''}
          onChange={e => handleChange('link', e.target.value || null)}
          fullWidth
        />
        <TextField
          label="End date"
          type="date"
          value={form.dueDate ?? ''}
          onChange={e => handleChange('dueDate', e.target.value || null)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
}
