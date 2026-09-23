import { type ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SmoothScrollProps {
  /** Disable smooth scrolling entirely (reduced-motion / touch devices). */
  disabled?: boolean;
  children?: ReactNode;
}

/**
 * Mounts a Lenis instance that eases native scrolling. Pairs with GSAP
 * ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` and the RAF
 * driver so pinned sections and scrubbed timelines stay frame-aligned.
 *
 * Skipped entirely for reduced-motion users and non-fine pointers.
 */
export function SmoothScroll({ disabled = false, children }: SmoothScrollProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (disabled || reduced) return undefined;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReduced || !finePointer) return undefined;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(500, 33);

    // Positions for scrubbed/pinned timelines are measured before webfonts
    // and images settle — recalc once everything is in so nothing "jumps".
    const refreshOnLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshOnLoad);
    const settle = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener('load', refreshOnLoad);
      cancelAnimationFrame(settle);
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, [disabled, reduced]);

  return <>{children}</>;
}