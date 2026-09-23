import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { duration, ease } from '../../config/motionConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Page transition shell. Wraps route content so every navigation reads as a
 * connected scene change rather than a hard swap.
 *
 * Deliberately opacity-only: transforms and `filter` on this wrapper would make
 * it the containing block for every `position: fixed` descendant the page
 * hosts (CreativeHeader, AnimatedBackground, ScrollTrigger pins), breaking
 * their viewport attachment and causing visible scroll glitches.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={reduced ? undefined : { opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0, transition: { duration: duration.normal } }}
      transition={{ duration: duration.emphasis, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}

/** Exit variant palette used by AnimatePresence-wrapped routes. */
export const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: duration.normal } },
};