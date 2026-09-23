import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ overwrite: 'auto' });

/** Prefer transform/opacity-only tweens for smooth 60fps. */
gsap.ticker.lagSmoothing(500, 33);

export { gsap, ScrollTrigger };

/** Pause all GSAP + ScrollTrigger work for prefers-reduced-motion. */
export function reduceMotionGlobally(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf('*');
  }
  return undefined;
}

/** Refresh all ScrollTriggers after fonts/layout settle or resize. */
export function refreshScrollTriggers(): void {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}