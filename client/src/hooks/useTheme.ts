import { useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();
  
  useEffect(() => {
    // If no theme is set, use system preference
    if (!theme && systemTheme) {
      setTheme(systemTheme);
    }
  }, [theme, systemTheme, setTheme]);

  return { 
    theme, 
    setTheme,
    isDark: theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  };
}
