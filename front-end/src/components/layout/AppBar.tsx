import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';

export const TopAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          Strives
        </Typography>
        <Avatar alt="User" sx={{ ml: 2 }} />
      </Toolbar>
    </AppBar>
  );
};
