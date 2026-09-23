import { type CSSProperties, type PointerEvent, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useTilt(max = 4) {
  const reducedMotion = useReducedMotion();
  const [transform, setTransform] = useState('perspective(900px) rotateX(0deg) rotateY(0deg)');

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTransform(`perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateZ(0)`);
  }

  function onPointerLeave() {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)');
  }

  return {
    onPointerMove,
    onPointerLeave,
    style: {
      transform,
      transition: 'transform 260ms cubic-bezier(.16, 1, .3, 1)',
      willChange: 'transform',
    } satisfies CSSProperties,
  };
}
