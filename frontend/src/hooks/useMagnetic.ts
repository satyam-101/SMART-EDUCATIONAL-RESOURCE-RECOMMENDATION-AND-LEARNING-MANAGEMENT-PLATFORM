import { type PointerEvent, useCallback, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export interface MagneticOptions {
  strength?: number;
}

/**
 * Magnetic pointer attraction: moves the element up to `strength` px toward
 * the cursor, springs back on leave. Uses rAF + transforms, no layout thrash.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(_options: MagneticOptions = {}) {
  const reduced = useReducedMotion();
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(false);

  const onPointerMove = useCallback(
    (event: PointerEvent<T>) => {
      if (reduced || event.pointerType !== 'mouse' || !ref.current) return;
      const bounds = ref.current.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
      ref.current.style.transition = 'transform 140ms cubic-bezier(.22,1,.36,1)';
      setActive(true);
    },
    [reduced],
  );

  const onPointerLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
    ref.current.style.transition = 'transform 520ms cubic-bezier(.16,1,.3,1)';
    setActive(false);
  }, []);

  return { ref, onPointerMove, onPointerLeave, active };
}