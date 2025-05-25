import { AppBar, Toolbar, Typography, IconButton, Avatar} from '@mui/material';

type Props = {
  toggleTheme: () => void;
};

export const TopAppBar = ({ toggleTheme }: Props) => {

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🐤 Strives
        </Typography> */}
        <Typography
        variant="h5"
        sx={{
          flexGrow: 1,
          fontWeight: 600,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
          }}>
            🐤 Strives
            </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
        </IconButton>
        <Avatar alt="User" sx={{ ml: 2 }} />
      </Toolbar>
    </AppBar>
  );
};
