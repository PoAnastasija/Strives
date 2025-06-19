import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

type ThemeName = 'light' | 'dark';

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

interface ThemeContextValue {
  theme: ThemeName;
  toggleTheme: () => void;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useThemeSwitcher = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('ThemeContext not found');
  return ctx;
};

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as ThemeName;
    if (saved && (saved === 'light' || saved === 'dark')) {
      setThemeState(saved);
    }
  }, []);

  const setTheme = (name: ThemeName) => {
    localStorage.setItem('theme', name);
    setThemeState(name);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={themes[theme]}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
