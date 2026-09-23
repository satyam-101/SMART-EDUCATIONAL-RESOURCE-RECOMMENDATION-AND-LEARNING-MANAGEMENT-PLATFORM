import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  /** seconds for the count-up */
  duration?: number;
  /** render the final number specially (suffixes, decimals, compact form) */
  format?: (value: number) => string;
  /** shortcut for the common "58%" case */
  suffix?: string;
}

/**
 * Count-up number. Springs from 0 to `value` the moment it enters the
 * viewport, once. Honors reduced motion by snapping straight to the value.
 */
export function AnimatedNumber({ value, className, duration = 1.6, format, suffix }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setDisplay(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  const body = format ? format(display) : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      {body}
      {suffix ?? ''}
    </span>
  );
}