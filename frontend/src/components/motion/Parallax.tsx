import { type ReactNode } from 'react';
import { useParallax } from '../../hooks/useParallax';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  invert?: boolean;
}

/** Thin wrapper around useParallax for declarative scrolling depth. */
export function Parallax({ children, className, speed = 0.15, invert = false }: ParallaxProps) {
  const ref = useParallax<HTMLDivElement>({ speed, invert });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}