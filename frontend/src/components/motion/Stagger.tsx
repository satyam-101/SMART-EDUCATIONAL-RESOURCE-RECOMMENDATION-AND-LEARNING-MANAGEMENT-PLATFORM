import { type ReactNode, Children, isValidElement } from 'react';
import { motion } from 'framer-motion';
import { duration, ease, stagger as staggerPreset } from '../../config/motionConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Time between children starting, in seconds. */
  interval?: number;
  delay?: number;
  /** Distance children travel from. */
  from?: { y?: number; x?: number };
}

/** Staggered entrance for direct children (motion or plain nodes). */
export function Stagger({ children, className, interval = staggerPreset.normal, delay = 0, from = { y: 22 } }: StaggerProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'show'}
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: interval, delayChildren: delay } } }}
    >
      {Children.map(children, (child) =>
        isValidElement(child) ? (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: from.y ?? 0, x: from.x ?? 0, filter: `blur(${reduced ? 0 : 6}px)` },
              show: { opacity: 1, y: 0, x: 0, filter: 'blur(0px)', transition: { duration: duration.emphasis, ease: ease.out } },
            }}
          >
            {child}
          </motion.div>
        ) : (
          child
        ),
      )}
    </motion.div>
  );
}