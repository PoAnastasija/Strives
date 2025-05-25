import { Box, Typography, Avatar } from '@mui/material';

export const AvatarDisplay = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={4}>
      <Avatar
        alt="Compagnon"
        src="/avatar.png" // ou une URL dynamique si tu veux customiser
        sx={{ width: 120, height: 120 }}
      />
      <Typography variant="h6" mt={2}>Ton compagnon</Typography>
    </Box>
  );
};
