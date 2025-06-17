import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import bgLight from '@assets/background.png';
import bgDark from '@assets/dark_mode_background.png';
import bgFocus from '@assets/focus_background.png';

const ThemeCSSVariables = () => {
  const theme = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme.palette.mode === 'dark';
    root.style.setProperty('--bg-dashboard', `url(${isDark ? bgDark : bgLight})`);
    root.style.setProperty('--background-default', isDark ? '#121212' : '#f7f6fc');
    root.style.setProperty('--background-paper', isDark ? '#1f1f1f' : '#ffffff');
    root.style.setProperty('--text-primary', isDark ? '#ffffff' : '#000000');
    root.style.setProperty('--text-secondary', isDark ? '#aaaaaa' : '#444444');
  }, [theme]);

  return null;
};

export default ThemeCSSVariables;
