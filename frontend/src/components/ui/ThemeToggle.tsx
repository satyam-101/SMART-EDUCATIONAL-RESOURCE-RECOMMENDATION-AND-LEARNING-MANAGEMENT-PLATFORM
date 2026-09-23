import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

interface ThemeToggleProps {
  className?: string;
  /** subtle (icon-only round) vs wide pill */
  variant?: 'icon' | 'pill';
}

/**
 * Light/dark switcher. The icon swaps with a quick rotate + scale morph and a
 * burst of rays for the sun. Keyboard accessible, `aria-pressed` for state.
 */
export function ThemeToggle({ className, variant = 'icon' }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      data-cursor-interactive
      className={cn(
        'relative grid h-9 place-items-center overflow-hidden rounded-xl border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300',
        variant === 'icon' ? 'w-9' : 'w-auto px-2',
        isDark ? 'border-white/[0.1] bg-white/[0.05] text-zinc-300 hover:text-white' : 'border-zinc-800 bg-white/70 text-zinc-600 hover:text-zinc-900',
        className,
      )}
    >
      <span className="relative flex items-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'dark' : 'light'}
            initial={{ rotate: -80, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 80, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="grid place-items-center"
          >
            {isDark ? <span className="grid h-5 w-5 place-items-center rounded-full border border-white/25 bg-violet-600"><Moon className="h-3 w-3 text-white" /></span> : <Sun className="h-[17px] w-[17px]" />}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}