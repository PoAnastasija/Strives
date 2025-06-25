import { Box, Button, Dialog, DialogTitle, Grid, DialogContent, Tabs, Tab, Paper,
  TextField, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTaskStore } from '@features/tasks/taskSlice';
import styles from './SuggestedTasksModal.module.css';
import { Category, CATEGORY_LABELS, SuggestedTasksModalProps } from '@type/category';

const suggestions: Record<Category, string[]> = {
  movement: ['Take a stretch break', 'Go for a 15 min walk', 'Run for 15 min', 'Meditate for 10 min'],
  work: ['Do 45 min of deep work', 'Clean for 15 min', 'Start with the most important task'],
  nutrition: ['Drink 2L of water', 'Eat a fruit', 'Don’t eat processed sugar',
    'Drink tea', ' Eat without distractions'],
};

export const SuggestedTasksModal = ({ open, onClose }: SuggestedTasksModalProps) => {
  const [category, setCategory] = useState<Category | 'custom'>('movement');
  const { addTask } = useTaskStore();
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customXp, setCustomXp] = useState<number>(10);
  const [customType, setCustomType] = useState<Category>('movement');

  const handleAdd = (title: string, type: Category = category as Category) => {
    addTask({
      id: crypto.randomUUID(),
      title,
      type,
      xp: 10,
      done: false,
    });
    onClose();
  };

  const handleAddCustom = () => {
    if (!customTitle.trim()) return;
    addTask({
      id: crypto.randomUUID(),
      title: customTitle,
      type: customType,
      xp: customXp,
      done: false,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add a task</DialogTitle>
      <DialogContent>
        <Tabs value={category} onChange={(_, val) => setCategory(val)} centered>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Tab key={key} label={label} value={key} />
          ))}
          <Tab label="Custom" value="custom" />
        </Tabs>

        <Box mt={2}>
          {category === 'custom' ? (
            <Box className={styles.customForm}>
              <TextField
                label="Task's name"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                fullWidth
              />
              <TextField
                label="XP"
                type="number"
                value={customXp}
                onChange={(e) => setCustomXp(Number(e.target.value))}
                inputProps={{ min: 0, max: 100 }}
                fullWidth
              />
              <TextField
                select
                label="Category"
                value={customType}
                onChange={(e) => setCustomType(e.target.value as Category)}
                fullWidth
              >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
              <Button onClick={handleAddCustom} variant="contained">
                Add
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {suggestions[category as Category].map((task) => (
                  <Paper className={styles.suggestionCard} onClick={() => handleAdd(task)}>
                    <p className={styles.taskText}>{task}</p>
                  </Paper>
              ))}
            </Grid>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
