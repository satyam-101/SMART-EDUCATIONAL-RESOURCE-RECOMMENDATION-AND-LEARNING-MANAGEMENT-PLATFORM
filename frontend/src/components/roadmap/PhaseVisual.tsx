import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

export type Motif = 'assemble' | 'flow' | 'connect' | 'network' | 'attention' | 'tokens' | 'pipeline' | 'infra' | 'materialize';

interface PhaseVisualProps {
  motif: Motif;
  active: boolean;
  className?: string;
}

/**
 * Small ambient visual per roadmap phase. Each phase gets its own metaphor
 * (nodes assembling, particles flowing, attention lines…) but they stay
 * quiet — the copy and the rail carry the story.
 */
export function PhaseVisual({ motif, active, className }: PhaseVisualProps) {
  const reduced = useReducedMotion();
  const v = reduced ? undefined : { opacity: 1, scale: 1 };

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 flex items-center justify-center opacity-40', className)}>
      <div className="relative h-[52vh] max-h-[26rem] w-[52vh] max-w-[26rem]">
        {motif === 'assemble' && <Assemble active={active} />}
        {motif === 'flow' && <Flow active={active} />}
        {motif === 'connect' && <Connect active={active} />}
        {motif === 'network' && <Network active={active} />}
        {motif === 'attention' && <Attention active={active} />}
        {motif === 'tokens' && <Tokens active={active} />}
        {motif === 'pipeline' && <Pipeline active={active} />}
        {motif === 'infra' && <Infra active={active} />}
        {motif === 'materialize' && <Materialize active={active} />}
        <motion.div className="absolute inset-0" animate={v} />
      </div>
    </div>
  );
}

function Nodes({ n, active, ring = false }: { n: number; active: boolean; ring?: boolean }) {
  const positions = [
    [110, 90], [250, 60], [180, 130], [260, 210], [120, 200],
    [80, 130], [210, 180], [160, 60], [110, 210], [250, 150],
  ];
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const [x, y] = positions[i % positions.length];
        return (
          <motion.span
            key={i}
            className={cn('absolute h-1.5 w-1.5 rounded-full', ring ? 'border border-violet-300/70 bg-transparent' : 'bg-violet-200')}
            style={{ left: x, top: y }}
            animate={active ? { x: [0, 0], opacity: [0, 1], scale: [0.4, 1] } : { opacity: 0.3, scale: 0.8 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          />
        );
      })}
    </>
  );
}

function Assemble({ active }: { active: boolean }) {
  return (
    <motion.svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.circle cx={170} cy={120} r={26} fill="none" stroke="rgba(196,181,253,0.85)" strokeWidth={1.6} animate={active ? { scale: [0.6, 1], opacity: [0.3, 1] } : { opacity: 0.45 }} transition={{ duration: 0.8 }} />
      <Nodes n={9} active={active} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x = 170 + Math.cos(a) * 70;
        const y = 120 + Math.sin(a) * 70;
        return <motion.line key={i} x1={170} y1={120} x2={x} y2={y} stroke="rgba(139,92,246,0.5)" strokeWidth={0.9} animate={active ? { opacity: [0.2, 0.8, 0.2] } : { opacity: 0.3 }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12 }} />;
      })}
    </motion.svg>
  );
}

function Flow({ active }: { active: boolean }) {
  const bars = [22, 40, 34, 62, 48, 74, 55];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.path d="M-10 200 Q 120 120 320 90" fill="none" stroke="rgba(217,70,239,0.35)" strokeWidth={1.4} animate={active ? { pathLength: [0, 1], opacity: [0, 0.8] } : { opacity: 0.25 }} transition={{ duration: 1.4 }} />
      {bars.map((h, i) => (
        <motion.rect key={i} x={40 + i * 34} y={230 - h} width={16} height={h} rx={4} fill="rgba(139,92,246,0.5)" animate={active ? { height: [h * 0.3, h], opacity: [0.3, 0.9] } : { opacity: 0.3 }} transition={{ delay: i * 0.09, duration: 0.8 }} />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.circle key={i} cx={-10 - i * 30} cy={210 - (i % 3) * 40} r={2.4} fill="rgba(196,181,253,0.7)" animate={active ? { x: [0, 380], opacity: [0, 1, 0] } : { opacity: 0.2 }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.22, ease: 'linear' }} />
      ))}
    </svg>
  );
}

function Connect({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.circle cx={160} cy={130} r={18} fill="none" stroke="rgba(196,181,253,0.7)" strokeWidth={1.4} animate={active ? { scale: [0.8, 1.15, 1] } : { opacity: 0.3 }} transition={{ duration: 1.2 }} style={{ transformOrigin: '160px 130px' }} />
      {[
        [50, 60], [270, 50], [60, 210], [265, 205], [160, 20], [160, 240],
      ].map(([x, y], i) => (
        <g key={i}>
          <motion.line x1={160} y1={130} x2={x} y2={y} stroke="rgba(139,92,246,0.6)" strokeWidth={1.1} animate={active ? { pathLength: [0, 1], opacity: [0.2, 1] } : { opacity: 0.4 }} transition={{ delay: 0.3 + i * 0.14 }} />
          <motion.circle cx={x} cy={y} r={7} fill="rgba(217,70,239,0.5)" animate={active ? { opacity: [0.4, 1, 0.4], r: [5, 8, 5] } : { opacity: 0.3 }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }} />
        </g>
      ))}
    </svg>
  );
}

function Network({ active }: { active: boolean }) {
  const layers = [4, 5, 6, 4];
  const nodes: Array<[number, number]> = [];
  const yStart = 50;
  const gaps = (200 - yStart) / (layers.length - 1);
  layers.forEach((count, l) => {
    for (let c = 0; c < count; c += 1) {
      const x = 60 + (c * 200) / (count - 1);
      nodes.push([x, yStart + l * gaps]);
    }
  });
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {Array.from({ length: 4 }).map((_, l) => {
        const from = layers.slice(0, l).reduce((a, b) => a + b, 0);
        const count = layers[l];
        const nextCount = layers[l + 1] ?? count;
        const pairs = [];
        for (let c = 0; c < count; c += 1) {
          for (let nc = 0; nc < nextCount; nc += 1) {
            const fromIdx = from + c;
            const toIdx = from + count + nc;
            if ((c + nc) % 2 === 0 && fromIdx < nodes.length && toIdx < nodes.length) {
              pairs.push([fromIdx, toIdx]);
            }
          }
        }
        return pairs.map(([a, b2], i) => {
          const [x1, y1] = nodes[a];
          const [x2, y2] = nodes[b2];
          return <motion.line key={`${a}-${b2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(139,92,246,0.45)" strokeWidth={1} animate={active ? { opacity: [0.15, 0.7, 0.15] } : { opacity: 0.3 }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 + l }} />;
        });
      })}
      <Nodes n={nodes.length} active={active} />
    </svg>
  );
}

function Attention({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.line key={i} x1={30} y1={30 + i * 22} x2={290} y2={30 + i * 22 + ((i % 2) * 14)} stroke="rgba(196,181,253,0.35)" strokeWidth={1} animate={active ? { opacity: [0.15, 0.8, 0.15], x1: [30, 26], x2: [290, 294] } : { opacity: 0.2 }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.12 }} />
      ))}
      <motion.circle cx={160} cy={130} r={20} fill="none" stroke="rgba(217,70,239,0.85)" strokeWidth={1.4} animate={active ? { scale: [0.7, 1.1, 0.85], opacity: [0.4, 1] } : { opacity: 0.4 }} transition={{ duration: 2.2, repeat: Infinity }} style={{ transformOrigin: '160px 130px' }} />
    </svg>
  );
}

function Tokens({ active }: { active: boolean }) {
  const widths = [34, 42, 30, 52, 38, 44, 32];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {widths.map((w, i) => (
        <motion.rect key={i} x={90 + i * 18} y={120 + ((i % 3) - 1) * 34} width={w} height={26} rx={5} fill={i % 2 ? 'rgba(217,70,239,0.35)' : 'rgba(139,92,246,0.4)'} animate={active ? { opacity: [0, 1], scale: [0.6, 1], y: [14, 0] } : { opacity: 0.25 }} transition={{ delay: i * 0.1, duration: 0.6 }} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span key={i} className="absolute h-1.5 w-1.5 rounded-full bg-violet-300/70" style={{ left: 60 + i * 40, top: 70 }} animate={active ? { y: [0, 90, 160], opacity: [0, 1, 0.2] } : { opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </svg>
  );
}

function Pipeline({ active }: { active: boolean }) {
  const boxes = [
    { x: 20, y: 105, label: 'Docs' },
    { x: 110, y: 105, label: 'Chunk' },
    { x: 200, y: 105, label: 'Embed' },
    { x: 250, y: 200, label: 'Retrieve' },
  ];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {[
        [62, 118, 130, 118],
        [150, 118, 220, 118],
        [240, 130, 265, 190],
        [160, 200, 250, 220],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(139,92,246,0.4)" strokeWidth={1.2} animate={active ? { pathLength: [0, 1], opacity: [0.3, 1] } : { opacity: 0.25 }} transition={{ delay: i * 0.25, duration: 0.8 }} />
      ))}
      {boxes.map((b, i) => (
        <motion.rect key={i} x={b.x} y={b.y} width={62} height={40} rx={8} fill="rgba(11,13,28,0.6)" stroke="rgba(196,181,253,0.5)" strokeWidth={1} animate={active ? { opacity: [0, 1], scale: [0.7, 1] } : { opacity: 0.25 }} transition={{ delay: 0.2 + i * 0.16 }} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.circle key={i} cx={0} cy={106 + (i % 2) * 12} r={3} fill="rgba(217,70,239,0.8)" animate={active ? { x: [0, 305], opacity: [0, 1, 0] } : { opacity: 0.1 }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: 'linear' }} />
      ))}
    </svg>
  );
}

function Infra({ active }: { active: boolean }) {
  const layers = [
    { y: 40, w: 260, label: 'Model serving' },
    { y: 90, w: 210, label: 'Vector DB' },
    { y: 140, w: 170, label: 'API gateway' },
    { y: 190, w: 130, label: 'Monitor' },
  ];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {layers.map((l, i) => (
        <g key={i}>
          <motion.rect x={(320 - l.w) / 2} y={l.y} width={l.w} height={34} rx={7} fill="rgba(11,13,28,0.6)" stroke="rgba(196,181,253,0.45)" strokeWidth={1} animate={active ? { opacity: [0, 1], x: [24, 0] } : { opacity: 0.25 }} transition={{ delay: i * 0.2, duration: 0.7 }} />
          <motion.line x1={160} y1={74} x2={160} y2={90} stroke="rgba(217,70,239,0.5)" strokeWidth={1} animate={active ? { pathLength: [0, 1] } : { opacity: 0.3 }} transition={{ delay: 0.2 + i * 0.2 }} />
        </g>
      ))}
    </svg>
  );
}

function Materialize({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.rect x={90} y={80} width={140} height={100} rx={16} fill="rgba(11,13,28,0.7)" stroke="rgba(217,70,239,0.5)" strokeWidth={1.2} animate={active ? { scale: [0.6, 1], opacity: [0, 1], rotateY: [18, 0] } : { opacity: 0.25 }} transition={{ duration: 0.9 }} style={{ transformOrigin: '160px 130px' }} />
      <motion.line x1={118} y1={112} x2={202} y2={112} stroke="rgba(196,181,253,0.6)" strokeWidth={2} animate={active ? { pathLength: [0, 1] } : { opacity: 0.4 }} transition={{ delay: 0.5 }} />
      <motion.line x1={118} y1={126} x2={180} y2={126} stroke="rgba(139,92,246,0.5)" strokeWidth={1.4} animate={active ? { pathLength: [0, 1] } : { opacity: 0.3 }} transition={{ delay: 0.7 }} />
      <motion.circle cx={196} cy={160} r={10} fill="rgba(217,70,239,0.8)" animate={active ? { scale: [0.5, 1.2, 1], opacity: [0.4, 1] } : { opacity: 0.3 }} transition={{ delay: 0.9, duration: 0.8 }} />
    </svg>
  );
}

export function FullstackIcon() {
  return <Layers className="h-4 w-4" />;
}