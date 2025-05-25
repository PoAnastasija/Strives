import { Box, Typography, Avatar } from '@mui/material';

export const AvatarDisplay = () => {
  return (
    // <Box display="flex" flexDirection="column" alignItems="center" my={4}>
    //   <Avatar
    //     alt="Compagnon"
    //     src="/avatar.png" // ou une URL dynamique si tu veux customiser
    //     sx={{ width: 120, height: 120 }}
    //   />
    //   <Typography variant="h6" mt={2}>Ton compagnon</Typography>
    // </Box>
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
  <Box
    sx={{
      width: 130,
      height: 130,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #a78bfa, #facc15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 3,
    }}
  >
    {/* <img src="/monstre.png" alt="Compagnon" width="80" /> */}
  </Box>
  <Typography variant="h6" mt={2}>Ton compagnon</Typography>
</Box>

  );
};
