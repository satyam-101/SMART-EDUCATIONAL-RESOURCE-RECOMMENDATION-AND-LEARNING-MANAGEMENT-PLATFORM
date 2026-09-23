import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PinSectionProps {
  children: ReactNode;
  /** Height of the pinned scroll window, e.g. "300%" of section. */
  distance?: string;
  className?: string;
  /** Called on every progress update (0..1). */
  onProgress?: (progress: number) => void;
}

/**
 * Pins the child for `distance` of scroll. Children who listen for progress
 * via a scroll-spy callback get a scrub-safe source of truth.
 */
export function PinSection({ children, distance = '320%', className, onProgress }: PinSectionProps) {
  const root = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return undefined;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: distance,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => onProgress?.(self.progress),
        invalidateOnRefresh: true,
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, distance, onProgress]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}