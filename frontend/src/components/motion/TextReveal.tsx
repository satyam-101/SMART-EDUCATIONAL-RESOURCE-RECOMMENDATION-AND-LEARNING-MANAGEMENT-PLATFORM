import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  /** how much scroll drives the reveal (scroll-linked) vs viewport (once) */
  mode?: 'scrub' | 'once';
}

/**
 * Word-by-word reveal tied to scroll progress. Use for short, emphatic
 * statements ("Learn. Practice. Build."). Respects reduced motion.
 */
export function TextReveal({ text, className, mode = 'scrub' }: TextRevealProps) {
  const root = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return undefined;

    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'));
    const ctx = gsap.context(() => {
      if (mode === 'once') {
        gsap.fromTo(
          words,
          { opacity: 0.12, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.09,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          },
        );
      } else {
        gsap.fromTo(
          words,
          { opacity: 0.1, yPercent: 40, filter: 'blur(6px)' },
          {
            opacity: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            stagger: 0.06,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 78%', end: 'top 30%', scrub: true },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [reduced, mode]);

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span ref={root} className={cn('block', className)} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-top">
          <span data-word className="inline-block will-change-[opacity,transform,filter]">
            {word}
          </span>
          {i < text.split(' ').length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}

export function scrollSpyCleanup() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}