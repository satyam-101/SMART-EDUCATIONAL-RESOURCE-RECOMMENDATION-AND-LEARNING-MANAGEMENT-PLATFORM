import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-spy: reports the fractional progress of a section as it crosses
 * the viewport (0 before entering, 1 once scrolled past). Used by the
 * roadmap journey to drive phase activation.
 */
export function useSectionProgress(sectionId?: string) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const target = sectionId ? document.getElementById(sectionId) : document.body;
    if (!target) return undefined;
    const el = target;

    let raf = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top > vh || rect.bottom < 0) return;
      const value = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      if (Math.abs(value - progressRef.current) > 0.004) {
        progressRef.current = value;
        setProgress(value);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionId]);

  return progress;
}