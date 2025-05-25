import { Box, IconButton, Typography } from '@mui/material';

const moods = ['😢', '😐', '😊', '😄', '🤩'];

type Props = {
  selected: string;
  onChange: (mood: string) => void;
};

export const MoodSelector = ({ selected, onChange }: Props) => (
  <Box>
    <Typography variant="subtitle1" mb={1}>Ton humeur du jour</Typography>
    <Box display="flex" gap={1}>
      {moods.map((mood) => (
        <IconButton
          key={mood}
          onClick={() => onChange(mood)}
          sx={{ fontSize: 28, opacity: selected === mood ? 1 : 0.4 }}
        >
          {mood}
        </IconButton>
      ))}
    </Box>
  </Box>
);
