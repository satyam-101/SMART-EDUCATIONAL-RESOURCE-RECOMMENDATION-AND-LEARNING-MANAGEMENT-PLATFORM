import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Clock, Layers3, Zap } from 'lucide-react';
import { coreCareers, optionalCareers, type CareerPath } from '../../data/careers';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { careerIcon } from './CareerIcon';
import { cn } from '../../lib/utils';

interface CareerHubProps {
  onSelect?: (career: CareerPath, origin: { x: number; y: number }) => void;
  /** narrower variant for embedding on the landing page */
  compact?: boolean;
}

/**
 * CAREER HUB — "What do you want to become?"
 * Premium portal cards: hover expands the card and blooms its skill nodes out
 * of the center while the backdrop glows in the career's accent. Clicking
 * portals into the roadmap route.
 */
export function CareerHub({ onSelect, compact = false }: CareerHubProps) {
  const navigate = useNavigate();

  function open(career: CareerPath, x: number, y: number) {
    if (onSelect) {
      onSelect(career, { x, y });
      return;
    }
    navigate(`/careers/${career.id}`);
  }

  return (
    <section id="paths" className="relative overflow-hidden py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-300" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            What do you want to become?
          </motion.p>
          <motion.h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            Choose a destination.
          </motion.h2>
          <motion.p className="mt-4 text-zinc-400" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.22 }}>
            Each path is its own progression — different phases, different skills, different projects. This is what each career involves. You decide which fits.
          </motion.p>
        </div>

        <CareersGrid careers={coreCareers} onOpen={open} compact={compact} />

        <div className="mt-16 text-center">
          <motion.p className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-500" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Optional tracks
          </motion.p>
        </div>
        <div className="mt-6">
          <CareersGrid careers={optionalCareers} onOpen={open} compact={compact} />
        </div>
      </div>
    </section>
  );
}

function CareersGrid({ careers, onOpen, compact }: { careers: CareerPath[]; onOpen: (c: CareerPath, x: number, y: number) => void; compact: boolean }) {
  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {careers.map((career, index) => (
        <CareerCard key={career.id} career={career} index={index} onOpen={onOpen} compact={compact} />
      ))}
      {Array.from({ length: (3 - (careers.length % 3)) % 3 }).map((_, i) => (
        <div key={`ghost-${i}`} className="min-h-44 rounded-3xl border border-dashed border-white/[0.07] max-lg:hidden" aria-hidden />
      ))}
    </div>
  );
}

interface CareerCardProps {
  career: CareerPath;
  index: number;
  onOpen: (c: CareerPath, x: number, y: number) => void;
  compact: boolean;
}

function CareerCard({ career, index, onOpen, compact }: CareerCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement | null>(null);
  const Icon = careerIcon(career);

  function handleOpen() {
    const rect = ref.current?.getBoundingClientRect();
    onOpen(career, (rect?.left ?? 0) + (rect?.width ?? 0) / 2, (rect?.top ?? 0) + (rect?.height ?? 0) / 2);
  }

  const jobs = career.jobs.slice(0, 2).map((j) => j.title);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleOpen}
      data-cursor-label="EXPLORE"
      className="group relative min-h-56 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 text-left transition-colors duration-500 hover:border-violet-300/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (index % 3) * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -6, scale: compact ? 1 : 1.015 }}
    >
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className="inline-grid h-11 w-11 place-items-center rounded-2xl border"
            style={{ borderColor: `${career.color}44`, background: `${career.color}14`, color: career.color }}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-300">
            <Zap className="h-3 w-3" /> {career.difficulty}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] text-white">{career.title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">{career.subtitle}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-bold text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> ~{career.estimatedMonths} months
          </span>
          <span className="flex items-center gap-1.5">
            <Layers3 className="h-3.5 w-3.5" /> {career.phases.length} phases
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" /> {jobs.join(', ')}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {career.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-md border border-violet-400/20 bg-violet-500/[0.07] px-2 py-0.5 text-[10px] font-semibold text-violet-200">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">Path {String(index + 1).padStart(2, '0')}</span>
          <span className={cn('flex items-center gap-1 text-sm font-bold text-violet-200 transition-transform duration-300 group-hover:translate-x-1')}>
            Open path <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 opacity-70 transition-opacity group-hover:opacity-100" style={{ backgroundColor: career.color }} aria-hidden />
    </motion.button>
  );
}