import { Box, Button, Dialog, DialogTitle, DialogContent, Grid, Tabs, Tab,
  Paper, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTaskStore } from './taskSlice';
import styles from './SuggestedTasksModal.module.css';

const suggestions = {
  Movement: ['🤸 Take a stretch break', '🚶 Go for a 15 min walk', '🏃 Run for 15 min', '🧘 Meditate for 10 min'],
  work: ['⏳ Do 45 min of deep work', '🧹 Clean for 15 min', '⭐ Start with the most important task'],
  nutrition: ['🚰 Drink 2L of water', '🍏 Eat a fruit', '🍩 Don’t eat processed sugar',
     '🍵 Drink tea', '📴 Eat without distractions'],
};

type Category = 'Movement' | 'work' | 'nutrition' | 'custom';

type SuggestedTasksModalProps = {
  open: boolean;
  onClose: () => void;
};

export const SuggestedTasksModal = ({ open, onClose }: SuggestedTasksModalProps) => {
  const [category, setCategory] = useState<Category>('Movement');
  const { addTask } = useTaskStore();
  const [customTitle, setCustomTitle] = useState('');
  const [customXp, setCustomXp] = useState(10);
  const [customType, setCustomType] = useState<'Movement' | 'work' | 'nutrition'>('Movement');

  const handleAdd = (title: string, type: Category = category) => {
    addTask({
      id: crypto.randomUUID(),
      title,
      type: type as 'Movement' | 'work' | 'nutrition',
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
          <Tab label="🏋️ Movement" value="Movement" />
          <Tab label="💼 Work" value="work" />
          <Tab label="🍎 Nutrition" value="nutrition" />
          <Tab label="🛠️ Custom" value="custom" />
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
                onChange={(e) => setCustomType(e.target.value as any)}
                fullWidth
              >
                <MenuItem value="Movement">Movement</MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="nutrition">Nutrition</MenuItem>
              </TextField>
              <Button onClick={handleAddCustom} variant="contained">
                Add
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {suggestions[category].map((task) => (
                <Grid item xs={12} sm={6} key={task}>
                  <Paper className={styles.suggestionCard} onClick={() => handleAdd(task)}>
                    <p className={styles.taskText}>{task}</p>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
