import { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlowProps {
  children?: ReactNode;
  className?: string;
  /** CSS color, brighten when children are hovered. */
  color?: string;
  size?: number;
}

/** Kept for markup compatibility — no glow is drawn. */
export function Glow({ children, className }: GlowProps) {
  return <div className={cn('pointer-events-none absolute', className)}>{children}</div>;
}