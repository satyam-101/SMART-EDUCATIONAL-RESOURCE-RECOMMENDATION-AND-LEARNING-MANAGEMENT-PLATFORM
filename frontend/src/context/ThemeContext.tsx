import { type ReactNode, createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggle: () => {}, setTheme: () => {} });

const META_THEME: Record<Theme, string> = { dark: '#080A16', light: '#F5F5FA' };

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('zuno.theme', 'dark');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = META_THEME[theme];
    // Refreshing GSAP triggers helps pinned parallax recalc after bg change.
    import('../lib/gsap').then(({ ScrollTrigger }) => requestAnimationFrame(() => ScrollTrigger.refresh()));
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);

/** Convenience hook for components that only need to react to the mode. */
export const useTheme = useThemeContext;