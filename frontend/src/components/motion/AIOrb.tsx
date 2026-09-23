import { type PointerEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { motionConfig } from '../../config/motionConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SparklesIcon } from '../icons';

export function AIOrb() {
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({ x: (event.clientX - rect.left - rect.width / 2) / 22, y: (event.clientY - rect.top - rect.height / 2) / 22 });
  }

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={() => setOffset({ x: 0, y: 0 })} className="relative grid min-h-[300px] place-items-center overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-zinc-900/60 p-6 shadow-card sm:min-h-[380px]">
      {[[-118, -68], [108, -88], [-96, 110], [125, 95], [0, -135], [15, 132]].map(([x, y], index) => (
        <motion.span key={index} className="absolute h-2 w-2 rounded-full bg-violet-200" animate={reducedMotion ? undefined : { x: [x, x + (index % 2 ? 10 : -12), x], y: [y, y + (index % 3 ? -9 : 12), y], opacity: [0.45, 1, 0.45] }} transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
      <motion.div className="relative z-10 grid h-32 w-32 place-items-center rounded-full border border-white/30 bg-violet-600" animate={reducedMotion ? undefined : { x: offset.x, y: offset.y, scale: [1, 1.05, 1], rotate: [0, 4, 0] }} transition={reducedMotion ? undefined : { ...motionConfig.spring.gentle, scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}>
        <span className="grid h-20 w-20 place-items-center rounded-full border border-white/20 bg-zinc-950/30 backdrop-blur"><SparklesIcon className="h-8 w-8 text-[#fff]" /></span>
      </motion.div>
      <motion.div className="absolute h-52 w-52 rounded-full border border-violet-300/25" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute h-72 w-72 rounded-full border border-fuchsia-300/10" animate={reducedMotion ? undefined : { rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute bottom-5 left-5 rounded-xl border border-white/[0.1] bg-zinc-950/55 px-3 py-2 backdrop-blur"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-200">ZUNO intelligence</p><p className="mt-1 text-xs text-zinc-400">Adapting to your next step</p></div>
    </div>
  );
}
