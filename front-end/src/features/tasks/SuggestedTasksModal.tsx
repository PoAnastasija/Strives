import { Box, Button, Dialog, DialogTitle, DialogContent, Typography, Grid, Tabs, Tab,
  Paper, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTaskStore } from './taskSlice';
import styles from './SuggestedTasksModal.module.css';

const suggestions = {
  sport: ['Faire du sport', 'Marcher 5k pas', 'Faire 15 pompes'],
  travail: ['Avancer le projet', 'Répondre aux mails', 'Faire une réunion'],
  alimentation: ['Boire 2L d’eau', 'Manger un fruit', 'Préparer un repas sain'],
};

type Category = 'sport' | 'travail' | 'alimentation' | 'custom';

type SuggestedTasksModalProps = {
  open: boolean;
  onClose: () => void;
};

export const SuggestedTasksModal = ({ open, onClose }: SuggestedTasksModalProps) => {
  const [category, setCategory] = useState<Category>('sport');
  const { addTask } = useTaskStore();
  const [customTitle, setCustomTitle] = useState('');
  const [customXp, setCustomXp] = useState(10);
  const [customType, setCustomType] = useState<'sport' | 'travail' | 'alimentation'>('sport');

  const handleAdd = (title: string, type: Category = category) => {
    addTask({
      id: crypto.randomUUID(),
      title,
      type: type as 'sport' | 'travail' | 'alimentation',
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
      <DialogTitle>Ajouter une tâche</DialogTitle>
      <DialogContent>
        <Tabs value={category} onChange={(_, val) => setCategory(val)} centered>
          <Tab label="🏋️ Sport" value="sport" />
          <Tab label="💼 Travail" value="travail" />
          <Tab label="🍎 Alimentation" value="alimentation" />
          <Tab label="🛠️ Custom" value="custom" />
        </Tabs>

        <Box mt={2}>
          {category === 'custom' ? (
            <Box className={styles.customForm}>
              <TextField
                label="Nom de la tâche"
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
                label="Catégorie"
                value={customType}
                onChange={(e) => setCustomType(e.target.value as any)}
                fullWidth
              >
                <MenuItem value="sport">Sport</MenuItem>
                <MenuItem value="travail">Travail</MenuItem>
                <MenuItem value="alimentation">Alimentation</MenuItem>
              </TextField>
              <Button onClick={handleAddCustom} variant="contained">
                Ajouter
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {suggestions[category].map((task) => (
                <Grid item xs={12} sm={6} key={task}>
                  <Paper className={styles.suggestionCard} onClick={() => handleAdd(task)}>
                    <Typography>{task}</Typography>
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
