// import { useTheme } from '@mui/material/styles';
// import { useEffect } from 'react';
// import bgLight from '@assets/background.png';
// import bgDark from '@assets/dark_mode_background.png';
// import bgFocus from '@assets/focus_background.png';

// const ThemeCSSVariables = () => {
//   const theme = useTheme();

//   useEffect(() => {
//     const root = document.documentElement;
//     const mode = document.body.getAttribute('data-mode') || theme.palette.mode;
//     const isDark = mode === 'dark';
//     const isFocus = mode === 'focus';
//     const background = isFocus ? bgFocus : isDark ? bgDark : bgLight;
//     root.style.setProperty('--bg-dashboard', `url(${background})`);
//     root.style.setProperty('--background-default', isFocus ? '#d8f1ef' : isDark ? '#121212' : '#f7f6fc');
//     root.style.setProperty('--background-paper', isFocus ? '#e4f7f5' : isDark ? '#1f1f1f' : '#ffffff');
//     root.style.setProperty('--text-primary', isFocus ? '#0c3c3b' : isDark ? '#ffffff' : '#31265a');
//     root.style.setProperty('--text-secondary', isFocus ? '#3c5c5c' : isDark ? '#aaaaaa' : '#444444');
//   }, [theme]);

//   return null;
// };

// export default ThemeCSSVariables;
import { useEffect } from 'react';
import bgLight from '@assets/background.png';
import bgDark from '@assets/dark_mode_background.png';
import bgFocus from '@assets/focus_background.png';
import { useThemeSwitcher } from '@theme/themeContext';

const ThemeCSSVariables = () => {
  const { theme } = useThemeSwitcher(); // ← on récupère light / dark / focus

  useEffect(() => {
    const root = document.documentElement;

    const isDark = theme === 'dark';
    const isFocus = theme === 'focus';

    const background = isFocus ? bgFocus : isDark ? bgDark : bgLight;

    root.style.setProperty('--bg-dashboard', `url(${background})`);
    root.style.setProperty('--background-default', isFocus ? '#d8f1ef' : isDark ? '#121212' : '#f7f6fc');
    root.style.setProperty('--background-paper', isFocus ? '#e4f7f5' : isDark ? '#1f1f1f' : '#ffffff');
    root.style.setProperty('--text-primary', isFocus ? '#0c3c3b' : isDark ? '#ffffff' : '#31265a');
    root.style.setProperty('--text-secondary', isFocus ? '#3c5c5c' : isDark ? '#aaaaaa' : '#444444');
  }, [theme]);

  return null;
};

export default ThemeCSSVariables;
