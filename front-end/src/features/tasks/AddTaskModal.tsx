// src/features/tasks/AddTaskModal.tsx
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    DialogActions,
  } from '@mui/material';
  import { useState } from 'react';
  import { useTaskStore } from './taskSlice';
  
  export const AddTaskModal = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [type, setType] = useState<'daily' | 'habit' | 'todo'>('daily');
    const [xp, setXp] = useState(5);
  
    const { addTask } = useTaskStore();
  
    const handleSubmit = () => {
      addTask({ id: crypto.randomUUID(), title, type, xp, done: false });
      setOpen(false);
      setTitle('');
    };
  
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Ajouter une tâche
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Nouvelle tâche</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              margin="normal"
            >
              <MenuItem value="daily">Quotidienne</MenuItem>
              <MenuItem value="habit">Habitude</MenuItem>
              <MenuItem value="todo">À faire</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="XP"
              type="number"
              value={xp}
              onChange={(e) => setXp(parseInt(e.target.value))}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={handleSubmit} variant="contained">Ajouter</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  