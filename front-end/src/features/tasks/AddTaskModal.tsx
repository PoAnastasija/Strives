import { Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions } from '@mui/material';
  import { useState } from 'react';
  import { useTaskStore } from './taskSlice';
  import { TaskType } from '@type/category';
  
  export const AddTaskModal = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<TaskType>('daily');
    const [xp, setXp] = useState<number>(5);
    const { addTask } = useTaskStore();
    const handleSubmit = () => {
      addTask({ id: crypto.randomUUID(), title, type, xp, done: false });
      setOpen(false);
      setTitle('');
    };
  
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add a task
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>New task</DialogTitle>
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
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="habit">Habit</MenuItem>
              <MenuItem value="todo">To-do</MenuItem>
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
            <Button onClick={() => setOpen(false)}>Reset</Button>
            <Button onClick={handleSubmit} variant="contained">Add</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  