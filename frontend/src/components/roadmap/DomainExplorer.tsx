import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronRight, Clock, Hammer, Layers, TrendingUp } from 'lucide-react';
import { domains } from '../../data/roadmaps';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * DOMAIN EXPLORER — "Choose Your Path".
 * Each domain is a portal card with a flat illustrated glyph, real stats
 * (phases, lessons, projects, final level) and a cinematic expansion that
 * pulls the domain across the viewport before handing off to the roadmap route.
 */
export function DomainExplorer() {
  const [selected, setSelected] = useState<{ id: string; title: string } | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const navigate = useNavigate();

  function openDomain(domainId: string, title: string, x: number, y: number) {
    setOrigin({ x, y });
    setSelected({ id: domainId, title });
  }

  function finishTransition() {
    if (!selected) return;
    const id = selected.id;
    setSelected(null);
    navigate(`/roadmap/${id}`);
  }

  return (
    <section id="paths" className="relative overflow-hidden py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-300"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Choose your path
          </motion.p>
          <motion.h2
            className="mt-3 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Where do you want to go?
          </motion.h2>
          <motion.p className="mt-4 text-zinc-400" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.22 }}>
            Pick a destination. Each path opens into a purposeful sequence of skills, practice, and projects.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, index) => (
            <DomainTile key={domain.id} domain={domain} index={index} onSelect={openDomain} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="portal"
            className="fixed inset-0 z-[110] grid place-items-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={finishTransition}
          >
            <motion.div
              className="absolute inset-0 bg-zuno-950"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 0.96 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute h-40 w-40 rounded-full border border-violet-300/40"
              initial={{ left: origin.x, top: origin.y, scale: 0.5, opacity: 0.6 }}
              animate={{ left: '50%', top: '50%', scale: 24, opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: '-50%', y: '-50%' }}
            />
            <motion.div
              className="absolute"
              initial={{ left: origin.x, top: origin.y, x: '-50%', y: '-50%', scale: 0.2, opacity: 0 }}
              animate={{ left: '50%', top: '50%', scale: 1, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                className="text-center text-[11px] font-black uppercase tracking-[0.3em] text-fuchsia-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Entering path
              </motion.p>
              <motion.h2
                className="mt-2 whitespace-nowrap text-center text-5xl font-black tracking-[-0.04em] text-white sm:text-7xl"
                initial={{ scaleY: 0.4, opacity: 0, filter: 'blur(14px)' }}
                animate={{ scaleY: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {selected.title}
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface DomainTileProps {
  domain: (typeof domains)[number];
  index: number;
  onSelect: (id: string, title: string, x: number, y: number) => void;
}

function DomainTile({ domain, index, onSelect }: DomainTileProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement | null>(null);
  const totalLessons = domain.phases.reduce((sum, p) => sum + p.lessons, 0);
  const totalProjects = domain.phases.reduce((sum, p) => sum + p.projects.length, 0);
  const finalLevel = domain.phases[domain.phases.length - 1].difficulty;

  function handleSelect() {
    const rect = ref.current?.getBoundingClientRect();
    onSelect(domain.id, domain.title, (rect?.left ?? 0) + (rect?.width ?? 0) / 2, (rect?.top ?? 0) + (rect?.height ?? 0) / 2);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      data-cursor-label="EXPLORE"
      onClick={handleSelect}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 text-left transition-colors duration-500 hover:border-violet-300/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -6 }}
    >
      <PathGlyph skills={domain.skills} />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-300">Path {String(index + 1).padStart(2, '0')}</span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock className="h-3.5 w-3.5" /> {domain.duration}
          </span>
        </div>
        <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-white">{domain.title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{domain.description}</p>

        <dl className="mt-5 grid grid-cols-3 gap-2">
          <TileStat icon={<Layers className="h-3.5 w-3.5" />} value={String(domain.phases.length)} label="Phases" />
          <TileStat icon={<BookOpen className="h-3.5 w-3.5" />} value={String(totalLessons)} label="Lessons" />
          <TileStat icon={<Hammer className="h-3.5 w-3.5" />} value={String(totalProjects)} label="Projects" />
        </dl>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <TrendingUp className="h-3.5 w-3.5" /> Ends at <span className="font-bold text-violet-200">{finalLevel}</span>
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-violet-200 transition-transform duration-300 group-hover:translate-x-1">
            Open path <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/** Flat illustration per path tile — skill nodes orbiting a core. No glow. */
function PathGlyph({ skills }: { skills: string[] }) {
  const nodes = skills.slice(0, 6);
  return (
    <div className="pointer-events-none relative mb-5 h-32 overflow-hidden rounded-2xl border border-white/[0.08] bg-violet-500/[0.05]">
      <svg viewBox="0 0 320 128" className="h-full w-full" aria-hidden>
        <circle cx="160" cy="64" r="40" fill="none" stroke="rgba(139,92,246,0.35)" strokeWidth="1" />
        <circle cx="160" cy="64" r="24" fill="none" stroke="rgba(196,181,253,0.5)" strokeWidth="1.2" strokeDasharray="3 4" />
        {nodes.map((_, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const r = 40;
          return (
            <circle
              key={i}
              cx={160 + Math.cos(angle) * r}
              cy={64 + Math.sin(angle) * r}
              r={i === 0 ? 5 : 3.5}
              fill={i === 0 ? 'rgba(196,181,253,0.9)' : 'rgba(139,92,246,0.55)'}
            />
          );
        })}
      </svg>
      <div className="absolute bottom-2 left-2 flex max-w-[70%] flex-wrap gap-1">
        {nodes.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-md border border-violet-400/25 bg-zuno-900/80 px-1.5 py-0.5 text-[9px] font-bold text-violet-100">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function TileStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-2.5 py-2">
      <dt className="sr-only">{label}</dt>
      <dd className="flex items-center gap-1.5 text-sm font-black text-white">
        {icon} {value}
      </dd>
      <dd className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">{label}</dd>
    </div>
  );
}