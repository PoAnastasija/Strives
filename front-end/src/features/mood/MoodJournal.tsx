import { Box, TextField, Typography } from '@mui/material';
import { useMoodStore } from './moodSlice';
import { MoodSelector } from '../../components/cards/MoodSelector';

export const MoodJournal = () => {
  const { mood, note, setMood, setNote } = useMoodStore();

  return (
    <Box mt={4}>
      <Typography variant="h6">Suivi d’humeur</Typography>
      <MoodSelector selected={mood} onChange={setMood} />
      <TextField
        label="Note du jour"
        fullWidth
        multiline
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};
