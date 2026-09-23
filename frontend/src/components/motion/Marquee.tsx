import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** seconds for one full loop */
  speed?: number;
  reverse?: boolean;
}

/** Infinite horizontal marquee built purely from transforms. */
export function Marquee({ children, className, speed = 28, reverse = false }: MarqueeProps) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {children}
    </div>
  );
  return (
    <div className={cn('flex w-max overflow-hidden', reverse ? '[--dir:reverse]' : '', className)}>
      <motion.div
        className="flex"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {row}
        {row}
      </motion.div>
    </div>
  );
}