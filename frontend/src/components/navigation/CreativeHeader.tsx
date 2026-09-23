import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const LINKS = [
  { label: 'Courses', target: '#courses' },
  { label: 'Paths', target: '#paths' },
  { label: 'Outcomes', target: '#outcomes' },
];

/**
 * Landing header. Transparent until the user scrolls, then it thins down
 * into a blurred translucent bar. Hovering a link grows an underline that
 * follows the cursor; the active indicator glides between items.
 */
export function CreativeHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hovering, setHovering] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={reduced ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'border-b border-white/[0.07] bg-zuno-950/72 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className={cn('mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8', scrolled ? 'h-14' : 'h-[72px]')}>
        <Link to="/" className="flex items-center gap-2.5" aria-label="ZUNO home">
          <Logo className="h-7 w-7" />
          <span className="text-lg font-black tracking-[-0.04em] text-white">ZUNO</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const isActive = hovering === link.label;
            return (
              <a
                key={link.label}
                href={link.target}
                className="group relative px-1 py-2 text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white"
                onMouseEnter={() => setHovering(link.label)}
                onMouseLeave={() => setHovering(null)}
                onFocus={() => setHovering(link.label)}
                onBlur={() => setHovering(null)}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-violet-400 transition-transform duration-300 ease-out',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-40',
                  )}
                />
                {hovering === null && <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-400" />}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/login"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            Get started
          </Link>
        </div>

        {pathname === '/' && !reduced && (
          <motion.div
            key={scrolled ? 'scrolled' : 'top'}
            initial={false}
            animate={{ opacity: scrolled ? 0 : 1 }}
            className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-violet-400/40"
          />
        )}
      </div>
    </motion.header>
  );
}