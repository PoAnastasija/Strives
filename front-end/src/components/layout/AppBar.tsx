import { AppBar, Toolbar, Avatar } from '@mui/material';
import styles from './AppBar.module.css';

export const TopAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar className={styles.toolbar}>
        <h1 className={styles.title}>Strives</h1>
        <Avatar alt="User" className={styles.avatar} />
      </Toolbar>
    </AppBar>
  );
};
