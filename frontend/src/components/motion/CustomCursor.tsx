import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * ZUNO cursor: a small violet dot that trails the pointer with a spring,
 * expanding over interactive elements and labeling signature surfaces
 * (course cards → OPEN, AI → ASK AI, roadmap → EXPLORE).
 *
 * Desktop + fine pointers + full-motion only. Never for touch devices.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [interactive, setInteractive] = useState(false);
  const [hidden, setHidden] = useState(true);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 420, damping: 34, mass: 0.45 });
  const sy = useSpring(my, { stiffness: 420, damping: 34, mass: 0.45 });
  const hiddenState = useRef(hidden);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(fine.matches && !reducedQuery.matches && !reduced);
    update();

    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX);
      my.set(event.clientY);
      setHidden(false);
      hiddenState.current = false;

      const target = event.target as HTMLElement | null;
      const labeled = target?.closest<HTMLElement>('[data-cursor-label]');
      if (labeled) {
        setLabel(labeled.dataset.cursorLabel ?? '');
        setInteractive(true);
        return;
      }
      const isDisabled = target?.closest<HTMLElement>('[disabled], [aria-disabled="true"]');
      const isInteractive = target?.closest<HTMLElement>('a, button, [role="button"], input, textarea, select, [data-cursor-interactive]');
      setLabel('');
      setInteractive(Boolean(isInteractive && !isDisabled));
    };

    const onLeave = () => {
      setHidden(true);
      hiddenState.current = true;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    fine.addEventListener('change', update);
    reducedQuery.addEventListener('change', update);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      fine.removeEventListener('change', update);
      reducedQuery.removeEventListener('change', update);
    };
  }, [mx, my, reduced]);

  if (!enabled) return null;

  const show = !hidden && (interactive || Boolean(label));
  const size = label ? 56 : 34;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120] flex items-center justify-center rounded-full will-change-transform"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
        opacity: show ? 1 : 0,
        background: 'rgba(139,92,246,0.16)',
        border: '1px solid rgba(196,181,253,0.65)',
        transition: 'width 240ms cubic-bezier(.16,1,.3,1), height 240ms cubic-bezier(.16,1,.3,1), opacity 180ms ease',
      }}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="text-[10px] font-black tracking-[0.14em] text-white"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}