import { AppBar, Toolbar, Avatar, IconButton, Tooltip, useTheme } from '@mui/material';
import { LightMode, DarkMode, AutoAwesome } from '@mui/icons-material';
import { useThemeSwitcher } from '@theme/themeContext';
import styles from './AppBar.module.css';

export const TopAppBar = () => {
  const { theme: currentMode, toggleTheme } = useThemeSwitcher();
  const muiTheme = useTheme();

  const icon =
    currentMode === 'light' ? <DarkMode /> :
    currentMode === 'dark' ? <AutoAwesome /> :
    <LightMode />;

  const color = muiTheme.palette.mode === 'dark' ? '#ffffff' : '#31265a';

  return (
    <AppBar
      position="static"
      elevation={0}
      className={styles.transparentAppBar}
    >
      <Toolbar className={styles.toolbar}>
        <h1 className={styles.title} style={{ color }}>Strives</h1>

        <div className={styles.rightSection}>
          <Tooltip title="Changer de thème">
            <IconButton onClick={toggleTheme} style={{ color }}>
              {icon}
            </IconButton>
          </Tooltip>
          <Avatar alt="User" className={styles.avatar} />
        </div>
      </Toolbar>
    </AppBar>
  );
};
