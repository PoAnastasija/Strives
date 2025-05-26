import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import styles from './AppBar.module.css';

export const TopAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h5" className={styles.title}>
          Strives
        </Typography>
        <Avatar alt="User" className={styles.avatar} />
      </Toolbar>
    </AppBar>
  );
};
