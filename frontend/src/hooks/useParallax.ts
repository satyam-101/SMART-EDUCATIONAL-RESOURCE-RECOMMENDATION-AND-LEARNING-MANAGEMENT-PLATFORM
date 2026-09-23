import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

export interface ParallaxOptions {
  /** 0 = no movement, larger = moves faster against scroll. */
  speed?: number;
  /** When true, move opposite to scroll direction (foreground objects). */
  invert?: boolean;
  axis?: 'y' | 'x';
}

/**
 * Scroll-linked parallax on a ref'd element.
 * Works only on fine pointers and honors reduced motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>({ speed = 0.15, invert = false, axis = 'y' }: ParallaxOptions = {}) {
  const reduced = useReducedMotion();
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const direction = invert ? 1 : -1;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { [axis]: 0 },
        {
          [axis]: speed * direction * 1000,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [reduced, speed, invert, axis]);

  return ref;
}