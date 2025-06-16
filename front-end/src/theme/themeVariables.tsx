import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

const ThemeCSSVariables = () => {
  const theme = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background-default', theme.palette.background.default);
    root.style.setProperty('--background-paper', theme.palette.background.paper);
    root.style.setProperty('--text-primary', theme.palette.text.primary);
    root.style.setProperty('--text-secondary', theme.palette.text.secondary);
    root.style.setProperty('--primary-main', theme.palette.primary.main);
    root.style.setProperty('--secondary-main', theme.palette.secondary.main);
  }, [theme]);

  return null;
};

export default ThemeCSSVariables;
