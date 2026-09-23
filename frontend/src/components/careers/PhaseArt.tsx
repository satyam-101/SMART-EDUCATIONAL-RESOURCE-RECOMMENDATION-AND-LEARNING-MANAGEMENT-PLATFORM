import { motion } from 'framer-motion';
import type { AnimationType } from '../../types/careers';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

interface PhaseArtProps {
  type: AnimationType;
  active: boolean;
  tint?: string;
  className?: string;
}

/**
 * Small ambient visual per phase. Same ideas as the legacy PhaseVisual, but
 * driven by the data model's `animationType` and tinted by the career accent.
 * Quiet visuals — the copy and the ladder carry the story.
 */
export function PhaseArt({ type, active, tint = '#8b5cf6', className }: PhaseArtProps) {
  const reduced = useReducedMotion();
  const dim = reduced ? undefined : { opacity: 1 };
  const stroke = hexA(tint, 0.85);
  const soft = hexA(tint, 0.45);
  const faint = hexA(tint, 0.18);

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 flex items-center justify-center opacity-40', className)}>
      <div className="relative h-[50vh] max-h-[24rem] w-[50vh] max-w-[24rem]">
        {type === 'code' && <Code active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'data' && <Data active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'model' && <Model active={active} stroke={stroke} soft={soft} aggressive={faint} reduced={reduced} />}
        {type === 'network' && <Network active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'attention' && <Attention active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'tokens' && <Tokens active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'pipeline' && <Pipeline active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'infra' && <Infra active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'assemble' && <Assemble active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'connect' && <Connect active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'shield' && <ShieldArt active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'ui' && <Ui active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'device' && <Device active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'architecture' && <Architecture active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'materialize' && <Materialize active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        {type === 'flow' && <Flow active={active} stroke={stroke} soft={soft} reduced={reduced} />}
        <motion.div className="absolute inset-0" animate={dim} />
      </div>
    </div>
  );
}

function hexA(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function Code({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  const lines = [90, 60, 75, 50, 70, 55, 80, 45];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.rect x={45} y={40} width={230} height={185} rx={14} fill="none" stroke={soft} strokeWidth={1.4} animate={active ? { pathLength: [0, 1], opacity: [0.2, 1] } : { opacity: 0.3 }} transition={{ duration: 1 }} />
      {lines.map((w, i) => (
        <motion.line
          key={i}
          x1={70}
          y1={70 + i * 18}
          x2={70 + w}
          y2={70 + i * 18}
          stroke={i % 3 === 0 ? stroke : soft}
          strokeWidth={2.2}
          strokeLinecap="round"
          animate={reduced ? {} : active ? { opacity: [0, 1], pathLength: [0, 1] } : { opacity: 0.25 }}
          transition={{ delay: i * 0.12, duration: 0.6 }}
        />
      ))}
      <motion.circle cx={255} cy={50} r={6} fill={stroke} animate={active ? { opacity: [1, 0.2, 1] } : { opacity: 0.3 }} transition={{ duration: 1.4, repeat: Infinity }} />
    </svg>
  );
}

function Data({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  const bars = [30, 52, 40, 68, 55, 78, 60, 46];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.path d="M40 210 Q 120 140 180 90 T 285 40" fill="none" stroke={stroke} strokeWidth={1.6} animate={reduced ? {} : active ? { pathLength: [0, 1], opacity: [0.3, 1] } : { opacity: 0.3 }} transition={{ duration: 1.4 }} />
      {bars.map((h, i) => (
        <motion.rect key={i} x={42 + i * 30} y={220 - h} width={14} height={h} rx={3} fill={soft} animate={reduced ? {} : active ? { opacity: [0.2, 0.9], y: [8, 0] } : { opacity: 0.25 }} transition={{ delay: i * 0.08, duration: 0.6 }} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle key={i} cx={0} cy={150 + i * 28} r={3} fill={stroke} animate={reduced ? {} : active ? { x: [0, 320], opacity: [0, 1, 0] } : { opacity: 0.15 }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'linear' }} />
      ))}
    </svg>
  );
}

function Model({ active, stroke, soft, aggressive, reduced }: { active: boolean; stroke: string; soft: string; aggressive: string; reduced: boolean }) {
  const pts = [
    [60, 190], [90, 150], [120, 175], [150, 120], [180, 140], [210, 100], [240, 130], [270, 80],
  ] as const;
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.rect x={70} y={90} width={180} height={90} rx={12} fill={aggressive} stroke={soft} strokeWidth={1.2} animate={active ? { opacity: [0, 1], scale: [0.85, 1] } : { opacity: 0.25 }} transition={{ duration: 0.8 }} style={{ transformOrigin: '160px 135px' }} />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5} fill={soft} opacity={active ? 1 : 0.3} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <motion.line x1={pts[i % pts.length][0]} y1={pts[i % pts.length][1]} x2={160} y2={140} stroke={stroke} strokeWidth={0.7} animate={reduced ? {} : active ? { pathLength: [0, 1], opacity: [0.1, 0.6] } : { opacity: 0.2 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }} />
        </g>
      ))}
      <motion.circle cx={160} cy={140} r={6} fill={stroke} animate={active ? { scale: [1, 1.35, 1] } : { opacity: 0.3 }} transition={{ duration: 1.6, repeat: Infinity }} />
      <motion.circle cx={262} cy={60} r={9} fill={stroke} animate={reduced ? {} : active ? { opacity: [0, 1, 0] } : { opacity: 0.15 }} transition={{ duration: 1.2, repeat: Infinity }} />
    </svg>
  );
}

function Network({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  const layers = [1, 4, 5, 3];
  const nodes: Array<[number, number]> = [];
  const y0 = 60;
  const gap = 46;
  layers.forEach((count, l) => {
    for (let c = 0; c < count; c += 1) {
      const x = 90 + (c * 140) / Math.max(1, count - 1);
      nodes.push([x, y0 + l * gap + (l % 2) * 8]);
    }
  });
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {layers.map((count, l) => {
        const from = layers.slice(0, l).reduce((a, b) => a + b, 0);
        const nextCount = layers[l + 1] ?? count;
        const pairs: Array<[number, number]> = [];
        for (let c = 0; c < count; c += 1) {
          for (let nc = 0; nc < nextCount; nc += 1) {
            const a = from + c;
            const b = from + count + nc;
            if (a < nodes.length && b < nodes.length && (c + nc) % 2 === 0) pairs.push([a, b]);
          }
        }
        return pairs.map(([a, b], i) => (
          <motion.line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={soft} strokeWidth={1} animate={reduced ? {} : active ? { opacity: [0.15, 0.8, 0.15] } : { opacity: 0.3 }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.08 + l * 0.4 }} />
        ));
      })}
      {nodes.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={5} fill={l0(layers, i) ? stroke : soft} animate={reduced ? {} : active ? { scale: [0.7, 1.15, 0.9], opacity: [0.5, 1] } : { opacity: 0.3 }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.1 }} style={{ transformOrigin: `${x}px ${y}px` }} />
      ))}
    </svg>
  );
}

function l0(layers: number[], index: number): boolean {
  let acc = 0;
  for (const c of layers) {
    if (index < acc + c) return acc === 0;
    acc += c;
  }
  return false;
}

function Attention({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.g key={i}>
          <motion.rect x={20} y={24 + i * 24} width={120} height={14} rx={7} fill={soft} animate={reduced ? {} : active ? { opacity: [0.2, 0.9], scaleX: [0.7, 1] } : { opacity: 0.2 }} transition={{ delay: i * 0.1, duration: 0.6 }} style={{ transformOrigin: '20px 31px' }} />
          <motion.rect x={180} y={24 + i * 24} width={120} height={14} rx={7} fill={soft} animate={reduced ? {} : active ? { opacity: [0.2, 0.9], scaleX: [0.7, 1] } : { opacity: 0.2 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }} style={{ transformOrigin: '300px 31px' }} />
          {(i + 2) % 3 === 0 && <motion.line x1={140} y1={31 + i * 24} x2={180} y2={31 + i * 24} stroke={stroke} strokeWidth={1} animate={reduced ? {} : active ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.2 }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }} />}
        </motion.g>
      ))}
      <motion.circle cx={160} cy={130} r={16} fill="none" stroke={stroke} strokeWidth={1.3} animate={reduced ? {} : active ? { scale: [0.85, 1.2, 0.95], opacity: [0.4, 1] } : { opacity: 0.3 }} transition={{ duration: 2.4, repeat: Infinity }} style={{ transformOrigin: '160px 130px' }} />
    </svg>
  );
}

function Tokens({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  const widths = [40, 52, 36, 60, 44, 50];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {widths.map((w, i) => (
        <motion.rect key={i} x={100 + i * 14} y={118 + ((i % 3) - 1) * 30} width={w} height={24} rx={6} fill={i % 2 ? soft : stroke} opacity={active ? 1 : 0.22} animate={reduced ? {} : active ? { opacity: [0, 1], y: [12, 0], scale: [0.8, 1] } : {}} transition={{ delay: i * 0.1, duration: 0.5 }} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span key={i} className="absolute h-1.5 w-1.5 rounded-full" style={{ left: `${50 + i * 40}px`, top: 80, background: stroke }} animate={reduced ? {} : active ? { y: [0, 40, 120], opacity: [0, 1, 0.2] } : { opacity: 0 }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </svg>
  );
}

function Pipeline({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  const boxes = [
    { x: 18, y: 100, w: 60, h: 40 },
    { x: 110, y: 100, w: 60, h: 40 },
    { x: 200, y: 100, w: 60, h: 40 },
    { x: 130, y: 180, w: 60, h: 40 },
  ];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {[
        [78, 120, 110, 120],
        [170, 120, 200, 120],
        [230, 130, 160, 180],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={soft} strokeWidth={1.3} animate={reduced ? {} : active ? { pathLength: [0, 1], opacity: [0.3, 1] } : { opacity: 0.25 }} transition={{ delay: i * 0.3, duration: 0.8 }} />
      ))}
      {boxes.map((b, i) => {
        const { x, y, w, h } = b;
        return <motion.rect key={i} x={x} y={y} width={w} height={h} rx={8} fill={hexA('#0b0d1c', 0.6)} stroke={soft} strokeWidth={1.1} animate={reduced ? {} : active ? { opacity: [0, 1], scale: [0.7, 1] } : { opacity: 0.25 }} transition={{ delay: 0.2 + i * 0.16 }} style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }} />;
      })}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.circle key={i} cx={0} cy={112 + (i % 2) * 10} r={3} fill={stroke} animate={reduced ? {} : active ? { x: [0, 320], opacity: [0, 1, 0] } : { opacity: 0.1 }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.28, ease: 'linear' }} />
      ))}
    </svg>
  );
}

function Infra({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  const layers = [260, 200, 150, 110];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {layers.map((w, i) => (
        <g key={i}>
          <motion.rect x={(320 - w) / 2} y={44 + i * 46} width={w} height={30} rx={7} fill={hexA('#0b0d1c', 0.6)} stroke={soft} strokeWidth={1.1} animate={reduced ? {} : active ? { opacity: [0, 1], x: [18, 0] } : { opacity: 0.25 }} transition={{ delay: i * 0.18, duration: 0.7 }} />
          <motion.line x1={160} y1={74} x2={160} y2={89} stroke={stroke} strokeWidth={1} animate={reduced ? {} : active ? { pathLength: [0, 1] } : { opacity: 0.25 }} transition={{ delay: 0.15 + i * 0.18 }} />
        </g>
      ))}
    </svg>
  );
}

function Assemble({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.circle cx={160} cy={130} r={26} fill="none" stroke={stroke} strokeWidth={1.5} animate={reduced ? {} : active ? { scale: [0.6, 1], opacity: [0.3, 1] } : { opacity: 0.4 }} transition={{ duration: 0.8 }} />
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 9) * Math.PI * 2;
        const x = 160 + Math.cos(a) * 78;
        const y = 130 + Math.sin(a) * 78;
        return (
          <g key={i}>
            <motion.line x1={160} y1={130} x2={x} y2={y} stroke={soft} strokeWidth={0.9} animate={reduced ? {} : active ? { opacity: [0.2, 0.7, 0.2] } : { opacity: 0.3 }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12 }} />
            <motion.circle cx={x} cy={y} r={6} fill={i % 2 ? stroke : soft} animate={reduced ? {} : active ? { scale: [0.4, 1], opacity: [0.3, 1] } : { opacity: 0.3 }} transition={{ delay: i * 0.08, duration: 0.5 }} style={{ transformOrigin: `${x}px ${y}px` }} />
          </g>
        );
      })}
    </svg>
  );
}

function Connect({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  const spokes: Array<[number, number]> = [[50, 55], [270, 45], [55, 210], [265, 205], [160, 18], [160, 242]];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.circle cx={160} cy={130} r={18} fill="none" stroke={stroke} strokeWidth={1.3} animate={reduced ? {} : active ? { scale: [0.85, 1.2, 1] } : { opacity: 0.3 }} transition={{ duration: 1.2 }} style={{ transformOrigin: '160px 130px' }} />
      {spokes.map(([x, y], i) => (
        <g key={i}>
          <motion.line x1={160} y1={130} x2={x} y2={y} stroke={soft} strokeWidth={1.1} animate={reduced ? {} : active ? { pathLength: [0, 1], opacity: [0.2, 1] } : { opacity: 0.35 }} transition={{ delay: 0.3 + i * 0.14 }} />
          <motion.circle cx={x} cy={y} r={7} fill={i % 2 ? stroke : soft} animate={reduced ? {} : active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.3 }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }} />
        </g>
      ))}
    </svg>
  );
}

function ShieldArt({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {Array.from({ length: 8 }).map((_, i) => {
        const x = 40 + (i % 4) * 60;
        const y = 36 + Math.floor(i / 4) * 50;
        return <motion.circle key={i} cx={x} cy={y} r={5} fill={soft} animate={reduced ? {} : active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.16 }} />;
      })}
      <motion.path
        d="M160 60 L225 78 L225 130 C225 175 198 205 160 222 C122 205 95 175 95 130 L95 78 Z"
        fill="none"
        stroke={stroke}
        strokeWidth={1.4}
        animate={reduced ? {} : active ? { pathLength: [0, 1], opacity: [0.3, 1] } : { opacity: 0.3 }}
        transition={{ duration: 1.2 }}
      />
      <motion.path d="M130 128 L150 148 L192 108" fill="none" stroke={stroke} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" animate={reduced ? {} : active ? { pathLength: [0, 1], opacity: [0, 1] } : { opacity: 0.3 }} transition={{ delay: 0.8, duration: 0.6 }} />
    </svg>
  );
}

function Ui({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.rect x={60} y={40} width={200} height={180} rx={12} fill="none" stroke={soft} strokeWidth={1.4} animate={reduced ? {} : active ? { pathLength: [0, 1], opacity: [0.2, 1] } : { opacity: 0.3 }} transition={{ duration: 0.9 }} />
      <motion.rect x={76} y={58} width={60} height={12} rx={6} fill={soft} animate={reduced ? {} : active ? { opacity: [0, 1], x: [-8, 0] } : { opacity: 0.25 }} transition={{ delay: 0.3, duration: 0.5 }} />
      <motion.rect x={76} y={86} width={130} height={8} rx={4} fill={soft} animate={reduced ? {} : active ? { opacity: [0, 1] } : { opacity: 0.2 }} transition={{ delay: 0.45, duration: 0.5 }} />
      <motion.rect x={76} y={102} width={110} height={8} rx={4} fill={soft} animate={reduced ? {} : active ? { opacity: [0, 1] } : { opacity: 0.2 }} transition={{ delay: 0.55, duration: 0.5 }} />
      <motion.rect x={76} y={150} width={64} height={26} rx={8} fill={stroke} animate={reduced ? {} : active ? { opacity: [0, 0.9], scale: [0.7, 1] } : { opacity: 0.2 }} transition={{ delay: 0.75, duration: 0.5 }} style={{ transformOrigin: '108px 163px' }} />
      <motion.rect x={150} y={150} width={90} height={40} rx={8} fill="none" stroke={soft} strokeWidth={1.2} animate={reduced ? {} : active ? { opacity: [0, 1], y: [10, 0] } : { opacity: 0.2 }} transition={{ delay: 0.9, duration: 0.5 }} />
    </svg>
  );
}

function Device({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.circle cx={50} cy={200} r={10} fill={stroke} animate={reduced ? {} : active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.35 }} transition={{ duration: 1.6, repeat: Infinity }} />
      <motion.rect x={115} y={150} width={34} height={60} rx={8} fill="none" stroke={soft} strokeWidth={1.3} animate={reduced ? {} : active ? { y: [8, 0], opacity: [0.2, 1] } : { opacity: 0.3 }} transition={{ delay: 0.3, duration: 0.6 }} />
      <motion.circle cx={132} cy={196} r={3} fill={stroke} animate={reduced ? {} : active ? { opacity: [0.3, 1] } : { opacity: 0.2 }} transition={{ delay: 0.5 }} />
      <motion.rect x={205} y={56} width={60} height={52} rx={10} fill={hexA('#0b0d1c', 0.6)} stroke={soft} strokeWidth={1.3} animate={reduced ? {} : active ? { y: [-8, 0], opacity: [0.2, 1] } : { opacity: 0.3 }} transition={{ delay: 0.5, duration: 0.6 }} />
      <motion.path d="M60 195 Q 100 195 115 178" fill="none" stroke={soft} strokeWidth={1.2} animate={reduced ? {} : active ? { pathLength: [0, 1] } : { opacity: 0.25 }} transition={{ delay: 0.5 }} />
      <motion.path d="M152 165 Q 185 130 205 90" fill="none" stroke={stroke} strokeWidth={1.2} animate={reduced ? {} : active ? { pathLength: [0, 1], opacity: [0.2, 1] } : { opacity: 0.3 }} transition={{ delay: 0.7, duration: 0.7 }} />
      {[236, 252, 268].map((x, i) => (
        <motion.circle key={i} cx={x} cy={38} r={4} fill={soft} animate={reduced ? {} : active ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.25 }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </svg>
  );
}

function Architecture({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  const boxes = [
    { x: 60, y: 50, w: 70, h: 36 },
    { x: 190, y: 50, w: 70, h: 36 },
    { x: 60, y: 130, w: 70, h: 36 },
    { x: 190, y: 130, w: 70, h: 36 },
    { x: 125, y: 205, w: 70, h: 36 },
  ];
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {boxes.map((b, i) => (
        <motion.rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={9} fill={hexA('#0b0d1c', 0.6)} stroke={i % 2 ? soft : stroke} strokeWidth={1.2} animate={reduced ? {} : active ? { opacity: [0, 1], scale: [0.7, 1] } : { opacity: 0.3 }} transition={{ delay: i * 0.14, duration: 0.6 }} style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + b.h / 2}px` }} />
      ))}
      {[
        [95, 86, 95, 110], [225, 86, 225, 110], [95, 166, 95, 190], [225, 166, 225, 190], [160, 166, 160, 205],
      ].map((c, i) => (
        <motion.line key={c[0]} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]} stroke={soft} strokeWidth={1} animate={reduced ? {} : active ? { pathLength: [0, 1] } : { opacity: 0.25 }} transition={{ delay: 0.3 + i * 0.1 }} />
      ))}
    </svg>
  );
}

function Materialize({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border"
          style={{ left: '50%', top: '50%', width: 60 + i * 42, height: 60 + i * 42, borderColor: hexA(i === 0 ? stroke : soft, 0.4) }}
          animate={reduced ? {} : { scale: [0.6, 1.4], opacity: [0.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
        />
      ))}
      <motion.rect x={105} y={92} width={110} height={80} rx={14} fill={hexA('#0b0d1c', 0.7)} stroke={stroke} strokeWidth={1.3} animate={reduced ? {} : active ? { scale: [0.5, 1], opacity: [0, 1], rotate: [-6, 0] } : { opacity: 0.25 }} transition={{ duration: 0.9 }} style={{ transformOrigin: '160px 132px' }} />
      <motion.line x1={128} y1={116} x2={192} y2={116} stroke={soft} strokeWidth={1.8} animate={reduced ? {} : active ? { pathLength: [0, 1] } : { opacity: 0.3 }} transition={{ delay: 0.5 }} />
      <motion.line x1={128} y1={132} x2={172} y2={132} stroke={stroke} strokeWidth={1.2} animate={reduced ? {} : active ? { pathLength: [0, 1] } : { opacity: 0.3 }} transition={{ delay: 0.7 }} />
      <motion.circle cx={200} cy={152} r={9} fill={stroke} animate={reduced ? {} : active ? { scale: [0.5, 1.2, 1], opacity: [0.4, 1] } : { opacity: 0.3 }} transition={{ delay: 0.9, duration: 0.8 }} />
    </svg>
  );
}

function Flow({ active, stroke, soft, reduced }: { active: boolean; stroke: string; soft: string; reduced: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <motion.path d="M20 200 Q 120 90 300 60" fill="none" stroke={soft} strokeWidth={1.4} animate={reduced ? {} : active ? { pathLength: [0, 1], opacity: [0.3, 0.9] } : { opacity: 0.3 }} transition={{ duration: 1.4 }} />
      <motion.circle cx={150} cy={150} r={24} fill="none" stroke={stroke} strokeWidth={1.3} animate={reduced ? {} : active ? { scale: [0.8, 1.15, 1] } : { opacity: 0.35 }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '150px 150px' }} />
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.circle key={i} cx={0} cy={195 + (i % 2) * 18} r={2.6} fill={i % 3 === 0 ? stroke : soft} animate={reduced ? {} : active ? { x: [0, 340], opacity: [0, 1, 0] } : { opacity: 0.15 }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.25, ease: 'linear' }} />
      ))}
    </svg>
  );
}