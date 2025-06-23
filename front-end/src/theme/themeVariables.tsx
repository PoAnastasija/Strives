import { useEffect } from 'react';
import bgLight from '@assets/background/light_mode_background.png';
import bgDark from '@assets/background/dark_mode_background.png';
import { useThemeSwitcher } from '@theme/themeContext';

const ThemeCSSVariables = () => {
  const { theme } = useThemeSwitcher();

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';

    const background = isDark ? bgDark : bgLight;

    root.style.setProperty('--bg-dashboard', `url(${background})`);
    root.style.setProperty('--background-default', isDark ? '#121212' : '#f7f6fc');
    root.style.setProperty('--background-paper', isDark ? '#332b76' : '#8583eb');
    root.style.setProperty('--text-primary', isDark ? '#ffffff' : '#31265a');
    root.style.setProperty('--text-secondary', isDark ? '#aaaaaa' : '#444444');
  }, [theme]);

  return null;
};

export default ThemeCSSVariables;
