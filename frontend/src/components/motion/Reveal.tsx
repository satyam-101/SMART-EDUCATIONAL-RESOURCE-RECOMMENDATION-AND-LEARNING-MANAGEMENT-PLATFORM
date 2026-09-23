import { type ReactNode } from 'react';
import { motion, type TargetAndTransition } from 'framer-motion';
import { blur, duration, ease } from '../../config/motionConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type RevealVariant = 'fade' | 'rise' | 'blur' | 'mask' | 'scale';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  variant?: RevealVariant;
  /** Direction for rise variant. */
  y?: number;
}

const variants: Record<RevealVariant, { initial: TargetAndTransition; whileInView: TargetAndTransition }> = {
  fade: { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
  rise: { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } },
  blur: {
    initial: { opacity: 0, y: 18, filter: `blur(${blur.soft}px)` },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  mask: {
    initial: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
    whileInView: { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
  },
  scale: { initial: { opacity: 0, scale: 0.96 }, whileInView: { opacity: 1, scale: 1 } },
};

/**
 * Scroll-triggered reveal. Sits at the top of the ZUNO motion vocabulary —
 * used for sections, not every paragraph.
 */
export function Reveal({ children, className, delay = 0, once = true, amount = 0.15, variant = 'rise', y = 30 }: RevealProps) {
  const reduced = useReducedMotion();
  const chosen = variants[variant];
  const target: TargetAndTransition = variant === 'rise' ? { ...chosen.whileInView, y } : chosen.whileInView;

  return (
    <motion.div
      className={className}
      initial={reduced ? false : chosen.initial}
      whileInView={reduced ? undefined : target}
      viewport={{ once, amount }}
      transition={{ duration: duration.emphasis, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  );
}