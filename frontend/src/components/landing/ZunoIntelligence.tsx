import { type PointerEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, BookOpen, Check } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Logo } from '../ui/Logo';

/**
 * ZUNO Intelligence — the hero's abstract AI visual.
 * Three flat layers (neural mesh / rotating rings / central orb) float at
 * different parallax rates. The orb carries the ZUNO mark and two small
 * product cards (AI tutor reply + progress) float beside it so the visual
 * reads as a real interface — no glow, everything on transform / opacity.
 */
export function ZunoIntelligence() {
  const reduced = useReducedMotion();
  const [lean, setLean] = useState({ x: 0, y: 0 });

  const nodes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return {
          x: 50 + Math.cos(a) * 33,
          y: 50 + Math.sin(a) * 33 * 0.82,
          r: 2 + (i % 3),
          delay: (i % 6) * 0.4,
        };
      }),
    [],
  );

  const edges = useMemo(
    () => nodes.map((n, i) => ({ a: n, b: nodes[(i + 1) % nodes.length] })),
    [nodes],
  );

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setLean({ x: x * 14, y: y * 10 });
  }

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={() => setLean({ x: 0, y: 0 })}
      className="relative mx-auto aspect-square w-full max-w-[38rem] select-none"
      role="img"
      aria-label="Abstract ZUNO artificial intelligence visual"
    >
      {/* layer 1 — neural mesh, slowest parallax */}
      <motion.div
        data-parallax-speed="0.1"
        className="absolute inset-0"
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full opacity-95">
          {edges.map((edge, i) => (
            <motion.line
              key={`e-${i}`}
              x1={edge.a.x}
              y1={edge.a.y}
              x2={edge.b.x}
              y2={edge.b.y}
              stroke="rgba(167,139,250,0.55)"
              strokeWidth={0.25}
              animate={reduced ? undefined : { opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            />
          ))}
          {nodes.map((n, i) => (
            <g key={`n-${i}`}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="rgba(196,181,253,0.9)"
                animate={reduced ? undefined : { opacity: [0.5, 1, 0.5], r: [n.r, n.r + 0.6, n.r] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: n.delay }}
              />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* layer 2 — rotating rings */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative h-[58%] w-[58%]">
          <motion.div
            className="absolute inset-0 rounded-full border border-violet-300/45"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-[12%] rounded-full border border-dashed border-fuchsia-300/40"
            animate={reduced ? undefined : { rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-fuchsia-300" />
        </div>
      </motion.div>

      {/* layer 3 — the orb itself, foreground fast parallax + cursor lean */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        animate={reduced ? undefined : { x: lean.x, y: lean.y }}
        transition={{ type: 'spring', stiffness: 70, damping: 16 }}
      >
        <motion.div
          className="relative grid h-[44%] w-[44%] place-items-center rounded-full bg-violet-600 shadow-md"
          animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="pointer-events-none absolute inset-[-14%] rounded-full border border-violet-300/50" />
          <span className="pointer-events-none absolute inset-[-30%] rounded-full border border-dashed border-fuchsia-300/40" />
          <span className="grid h-1/2 w-1/2 place-items-center rounded-full border border-white/25 bg-zinc-950/40">
            <Logo className="h-[58%] w-[58%]" />
          </span>
          <span className="absolute -right-[6%] -top-[2%] h-[22%] w-[22%] rounded-full bg-fuchsia-400" />
        </motion.div>
      </motion.div>

      {/* AI tutor preview card */}
      <motion.div
        className="absolute bottom-[4%] left-0 w-[14.5rem] rounded-2xl border border-white/[0.1] bg-zuno-900/85 p-3.5 backdrop-blur"
        animate={reduced ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-lg bg-violet-600">
            <Bot className="h-3 w-3 text-white" />
          </span>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-zinc-400">ZUNO AI</p>
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </div>
        <p className="mt-2.5 rounded-xl rounded-tl-sm bg-white/[0.07] px-3 py-2 text-xs leading-5 text-zinc-300">
          Explain closures like I'm new to functions.
        </p>
        <p className="mt-1.5 rounded-xl rounded-tr-sm bg-violet-500/15 px-3 py-2 text-xs leading-5 text-zinc-200">
          A closure is a function that remembers the variables around where it was created.
        </p>
      </motion.div>

      {/* progress preview card */}
      <motion.div
        className="absolute right-0 top-[6%] w-[11.5rem] rounded-2xl border border-white/[0.1] bg-zuno-900/85 p-3.5 backdrop-blur"
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
          <BookOpen className="h-3 w-3" /> Continue learning
        </p>
        <p className="mt-2 text-sm font-bold text-zinc-100">Python · Module 6</p>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.08]">
          <div className="h-full w-[68%] rounded-full bg-violet-500" />
        </div>
        <p className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3 text-emerald-400" /> 12 min done
          </span>
          <span className="font-bold text-zinc-400">68%</span>
        </p>
      </motion.div>
    </div>
  );
}