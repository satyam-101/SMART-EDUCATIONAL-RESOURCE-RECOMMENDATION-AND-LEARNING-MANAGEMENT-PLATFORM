import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Magnetic button: gently pulls toward the cursor within `strength` px and
 * springs back when the pointer leaves. Falls back to a plain button for
 * touch + reduced-motion users.
 */
export function MagneticButton({ children, strength = 7, className, ...rest }: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLButtonElement>({ strength });

  return (
    <button
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(reduced ? '' : 'will-change-transform', className)}
      {...rest}
    >
      {children}
    </button>
  );
}