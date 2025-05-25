import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type Props = {
  toggleTheme: () => void;
};

export const TopAppBar = ({ toggleTheme }: Props) => {
  const theme = useTheme();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🐤 MyCompanion
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Avatar alt="User" sx={{ ml: 2 }} />
      </Toolbar>
    </AppBar>
  );
};
