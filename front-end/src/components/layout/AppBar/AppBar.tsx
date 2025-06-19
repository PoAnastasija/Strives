import { AppBar, Toolbar, Avatar, IconButton, Tooltip, useTheme, Button, Box } from '@mui/material';
import { LightMode, DarkMode, AutoAwesome } from '@mui/icons-material';
import { useThemeSwitcher } from '@theme/themeContext';
import { useNavigate } from 'react-router-dom';
import styles from './AppBar.module.css';

import BlackHatCompanion from '@assets/blob_blue_hat.png';

export const TopAppBar = () => {
  const { theme: currentMode, toggleTheme } = useThemeSwitcher();
  const muiTheme = useTheme();
  const navigate = useNavigate();

  const icon =
    currentMode === 'light' ? <DarkMode /> :
    currentMode === 'dark' ? <AutoAwesome /> :
    <LightMode />;

  const color = muiTheme.palette.mode === 'dark' ? '#ffffff' : '#31265a';

  return (
    <AppBar position="static" elevation={0} className={styles.transparentAppBar}>
      <Toolbar className={styles.toolbar}>
        <Tooltip title="Dressing room">
          <Button
            onClick={() => navigate('/dressing-room')}
            sx={{
              borderRadius: '50%',
              padding: 0,
              width: 42,
              height: 42,
            }}
          >
            <Avatar
              alt="Companion"
              src={BlackHatCompanion}
              sx={{ width: 36, height: 36 }}
            />
            <Box
              component="span"
              className={styles.title}
              sx={{ fontSize: '1.8rem', fontWeight: 700 }}
            />
          </Button>
        </Tooltip>

        <div className={styles.rightSection}>
          <Tooltip title="Change theme">
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
