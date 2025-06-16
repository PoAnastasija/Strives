import { AppBar, Toolbar, Avatar, IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode, AutoAwesome } from '@mui/icons-material';
import { useThemeSwitcher } from '@theme/themeContext';
import styles from './AppBar.module.css';

export const TopAppBar = () => {
  const { theme, toggleTheme } = useThemeSwitcher();

  const icon =
    theme === 'light' ? <DarkMode /> :
    theme === 'dark' ? <AutoAwesome /> :
    <LightMode />;

  return (
    <AppBar position="static" color="primary">
      <Toolbar className={styles.toolbar}>
        <h1 className={styles.title}>Strives</h1>

        <div className={styles.rightSection}>
          <Tooltip title="Changer de thème">
            <IconButton onClick={toggleTheme} color="inherit">
              {icon}
            </IconButton>
          </Tooltip>
          <Avatar alt="User" className={styles.avatar} />
        </div>
      </Toolbar>
    </AppBar>
  );
};
