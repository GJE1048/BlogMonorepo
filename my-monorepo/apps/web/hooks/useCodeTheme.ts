import { useEffect, useState } from 'react';
import { useTheme } from '../lib/theme';

export function useCodeTheme() {
  const { theme } = useTheme();
  const [codeTheme, setCodeTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      setCodeTheme('dark');
      document.documentElement.classList.add('dark-code');
      document.documentElement.classList.remove('light-code');
    } else {
      setCodeTheme('light');
      document.documentElement.classList.add('light-code');
      document.documentElement.classList.remove('dark-code');
    }
  }, [theme]);

  return codeTheme;
}
