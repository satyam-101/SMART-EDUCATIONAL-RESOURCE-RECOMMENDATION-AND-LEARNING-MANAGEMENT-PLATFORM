import { type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * CourseCard's signature interaction: a subtle 3D tilt driven by pointer
 * position, with layered depth (content translates at a different rate than
 * the tilt) and a travelling rounded-square accent on hover.
 */
export function HoverCard({
  children,
  className,
  tilt = 4,
  accent = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  accent?: boolean;
}) {
  const reduced = useReducedMotion();

  function apply(event: PointerEvent<HTMLElement>, reset = false) {
    if (reduced || event.pointerType !== 'mouse') return;
    const card = event.currentTarget.firstElementChild as HTMLElement | null;
    if (!card) return;
    const content = card.querySelector<HTMLElement>('[data-tilt-content]');
    if (!content) return;

    if (reset) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      card.style.transition = 'transform 520ms cubic-bezier(.16,1,.3,1)';
      content.style.transform = 'translate3d(0,0,0)';
      content.style.transition = 'transform 520ms cubic-bezier(.16,1,.3,1)';
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${(-py * tilt).toFixed(2)}deg) rotateY(${(px * tilt).toFixed(2)}deg) translateZ(0)`;
    card.style.transition = 'transform 140ms cubic-bezier(.22,1,.36,1)';
    content.style.transform = `translate3d(${(px * 10).toFixed(2)}px, ${(py * 10).toFixed(2)}px, 0)`;
    content.style.transition = 'transform 200ms cubic-bezier(.22,1,.36,1)';
  }

  return (
    <motion.div
      className={cn('group relative', reduced ? '' : 'will-change-transform', className)}
      whileHover={reduced ? undefined : { y: -5 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.9 }}
      onPointerMove={(e) => apply(e)}
      onPointerLeave={(e) => apply(e, true)}
    >
      {accent && !reduced ? <AccentCorner /> : null}
      <motion.div
        className="relative h-full"
        style={{ transformStyle: 'preserve-3d' } as CSSProperties}
        initial={false}
      >
        <div data-tilt-content style={{ transform: 'translateZ(0)' } as CSSProperties}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Rounded square accent: border draw + travelling square. */
function AccentCorner() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      <div className="absolute inset-0 rounded-2xl opacity-0 shadow-[inset_0_0_0_1px_rgba(196,181,253,0.4)] transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute right-3 top-3 h-6 w-6 rounded-md border border-violet-300/60 opacity-0 transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-100 group-hover:rotate-[18deg] group-hover:opacity-100" style={{ transform: 'translateX(8px) translateY(-8px) scale(0.5) rotate(38deg)' }} />
    </div>
  );
}