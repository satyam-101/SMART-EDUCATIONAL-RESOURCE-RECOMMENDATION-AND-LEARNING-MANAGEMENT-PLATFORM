import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Bot, ArrowDown, Hammer } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';
import { type Domain } from '../../data/roadmaps';
import { PhaseVisual, type Motif } from './PhaseVisual';

interface RoadmapJourneyProps {
  domain: Domain;
}

/**
 * ROADMAP JOURNEY — the signature ZUNO scroll experience.
 *
 * Phases stack as sticky full-bleed scenes: scrolling physically moves you
 * through the learning path. Each phase reveals its own motive visual and
 * cascades its skills; a rail on the left tracks where you are, fills as you
 * progress, and streams knowledge particles toward the final AI ENGINEER node.
 */
export function RoadmapJourney({ domain }: RoadmapJourneyProps) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement | null>(null);
  const [active, setActiveState] = useActivePhase();

  useEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      domain.phases.forEach((_, i) => {
        const scene = document.getElementById(`phase-scene-${i}`);
        if (!scene) return;

        ScrollTrigger.create({
          trigger: scene,
          start: 'top 62%',
          end: 'bottom 46%',
          onEnter: () => setActiveState(i),
          onEnterBack: () => setActiveState(i),
          onLeaveBack: () => {
            if (i === 0) return;
            setActiveState(i - 1);
          },
          onLeave: () => {
            if (i < domain.phases.length - 1) setActiveState(i + 1);
          },
        });
      });
    });
    return () => ctx.revert();
  }, [reduced, domain.phases, setActiveState]);

  return (
    <div ref={root} className="relative" id="journey-track">
      <div className="hidden gap-10 lg:grid lg:grid-cols-[200px_1fr]">
        <Rail domain={domain} sticky />
        <div className="relative">
          <IntroMarker />
          {domain.phases.map((phase, i) => (
            <PhaseScene key={phase.id} phase={phase} index={i} active={active === i} total={domain.phases.length} />
          ))}
          <Finale domain={domain} />
        </div>
      </div>

      {/* Mobile: vertical storytelling, no pinning */}
      <div className="lg:hidden">
        <div className="sticky top-0 z-30 border-b border-white/[0.07] bg-zuno-950/85 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-xl items-center gap-3 px-5">
            <span className="text-xs font-black tracking-[0.16em] text-violet-300">PHASE {String(Math.max(active + 1, 1)).padStart(2, '0')} / {String(domain.phases.length).padStart(2, '0')}</span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full rounded-full bg-violet-500 transition-all duration-500" style={{ width: `${((Math.max(active, 0) + 1) / domain.phases.length) * 100}%` }} />
            </div>
          </div>
        </div>
        {domain.phases.map((phase) => (
          <MobilePhase key={phase.id} phase={phase} />
        ))}
        <div className="py-16 text-center">
          <p className="text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">You’re ready to build.</p>
          <FinalOrb domain={domain} />
        </div>
      </div>
    </div>
  );
}

/** tiny state hook so we can call setActive from inside gsap callbacks */
function useActivePhase() {
  const [active, setActive] = useState(-1);
  const setActiveState = (i: number) => setActive((prev) => (i === prev ? prev : i));
  return [active, setActiveState] as const;
}

function IntroMarker() {
  const reduced = useReducedMotion();
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <motion.span
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-violet-200"
      >
        START
      </motion.span>
      <motion.span initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-zinc-500">
        <ArrowDown className="h-4 w-4" />
      </motion.span>
    </div>
  );
}

interface PhaseLike {
  id: string;
  label: string;
  kicker: string;
  description: string;
  skills: string[];
  concepts: string[];
  lessons: number;
  projects: string[];
  practice: string[];
  duration: string;
  difficulty: string;
  motif: string;
}

function PhaseScene({ phase, index, active, total }: { phase: PhaseLike; index: number; active: boolean; total: number }) {
  const reduced = useReducedMotion();
  const isLast = index === total - 1;
  return (
    <section style={{ height: isLast ? '120vh' : '140vh' }} className="relative" id={`phase-scene-${index}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <PhaseVisual motif={phase.motif as Motif} active={active} className="right-0 opacity-70 lg:opacity-[0.55]" />
        <div className="relative mx-auto w-full max-w-2xl px-5 sm:px-8">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              className="text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-300"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {phase.kicker}
            </motion.p>

            <h3 className="mt-3 overflow-hidden text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              <motion.span
                className="block"
                initial={reduced ? false : { y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {phase.label}
              </motion.span>
            </h3>

            <motion.p
              className="mt-4 max-w-lg text-base leading-7 text-zinc-300 sm:text-lg"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {phase.description}
            </motion.p>

            <motion.ul
              className="mt-7 flex max-w-xl flex-wrap gap-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.4 }}
              variants={{ show: { transition: { staggerChildren: 0.045 } } }}
            >
              {phase.skills.map((skill) => (
                <motion.li
                  key={skill}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 8 },
                    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="rounded-xl border border-violet-400/25 bg-violet-500/[0.08] px-3.5 py-2 text-sm font-semibold text-violet-100"
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-7 flex flex-wrap items-center gap-2 text-xs text-zinc-500"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <span className="rounded-lg border border-white/[0.08] px-2.5 py-1">{phase.duration}</span>
              <span className="rounded-lg border border-white/[0.08] px-2.5 py-1">{phase.difficulty}</span>
              <span className="rounded-lg border border-white/[0.08] px-2.5 py-1">{phase.lessons} lessons</span>
            </motion.div>

            <motion.div
              className="mt-6 max-w-xl"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Concepts you'll learn</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {phase.concepts.map((concept) => (
                  <span key={concept} className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-300">
                    {concept}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-violet-200">
                  <Hammer className="h-3 w-3" /> Build
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {phase.projects.map((project) => (
                    <li key={project} className="text-xs text-zinc-300">{project}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-violet-200">
                  <Check className="h-3 w-3" /> Practice
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {phase.practice.map((item) => (
                    <li key={item} className="text-xs text-zinc-300">{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MobilePhase({ phase }: { phase: PhaseLike }) {
  return (
    <motion.section className="relative mx-auto max-w-xl px-5 py-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.3 }}>
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
        <PhaseVisual motif={phase.motif as Motif} active className="opacity-50" />
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-fuchsia-300">{phase.kicker}</p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">{phase.label}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{phase.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {phase.skills.map((skill, i) => (
            <motion.li
              key={skill}
              className="rounded-lg border border-violet-400/25 bg-violet-500/[0.08] px-2.5 py-1.5 text-xs font-semibold text-violet-100"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {skill}
            </motion.li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {phase.concepts.map((concept) => (
            <span key={concept} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-400">{concept}</span>
          ))}
        </div>
        {phase.projects.length > 0 && (
          <div className="mt-4">
            <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-violet-200">
              <Hammer className="h-3 w-3" /> Build
            </p>
            <ul className="mt-2 space-y-1.5">
              {phase.projects.map((project) => (
                <li key={project} className="text-xs text-zinc-300">{project}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4 flex gap-2 text-[11px] text-zinc-500">
          <span className="rounded-md border border-white/[0.08] px-2 py-0.5">{phase.duration}</span>
          <span className="rounded-md border border-white/[0.08] px-2 py-0.5">{phase.difficulty}</span>
        </div>
      </div>
    </motion.section>
  );
}

function Finale({ domain }: { domain: Domain }) {
  return (
    <section className="relative flex min-h-[110vh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center">
      <FinalOrb domain={domain} />
      <motion.h3
        className="mt-12 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        You’re ready to build.
      </motion.h3>
      <motion.p className="mt-4 max-w-md text-zinc-400" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        Every phase you passed is now a tool in your kit. Pick your capstone and make something real.
      </motion.p>
    </section>
  );
}

function FinalOrb({ domain, compact = false }: { domain: Domain; compact?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: compact ? 0.2 : 0.6 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-8 grid place-items-center"
    >
      <motion.span className="absolute h-40 w-40 rounded-full border border-violet-400/25" animate={reduced ? undefined : { scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut' }} />
      <motion.div className="relative grid h-20 w-20 place-items-center rounded-full bg-violet-600">
        <Bot className="h-8 w-8 text-[#fff]" strokeWidth={2} />
      </motion.div>
      <motion.p className="absolute -bottom-8 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.24em] text-violet-300" animate={reduced ? undefined : { opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.4, repeat: Infinity }}>
        {domain.title}
      </motion.p>
    </motion.div>
  );
}

interface RailProps {
  domain: Domain;
  sticky?: boolean;
}

function Rail({ domain, sticky }: RailProps) {
  const reduced = useReducedMotion();
  const lineRef = useRef<SVGLineElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Track how far through the journey the viewport is — scroll-based, so the
  // rail stays in sync even when ScrollTrigger isn't driving the active phase.
  useEffect(() => {
    const update = () => {
      const track = document.getElementById('journey-track');
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      setProgress(Math.min(1, Math.max(0, -rect.top / total)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const localActive = Math.min(domain.phases.length - 1, Math.floor(progress * domain.phases.length));

  // Drive the rail fill from the active phase. Runs on the GSAP ticker so it
  // stays transform/frame aligned without extra scroll listeners.
  useEffect(() => {
    const line = lineRef.current;
    if (reduced || !line) return undefined;
    const setHeight = () => {
      const node = document.getElementById(`rail-node-${Math.max(localActive, 0)}`);
      const container = line.parentElement;
      if (!node || !container) return;
      const cRect = container.getBoundingClientRect();
      const nRect = node.getBoundingClientRect();
      if (!cRect.height || !Number.isFinite(cRect.height)) return;
      const ratio = Math.min(1, Math.max(0, (nRect.top + nRect.height / 2 - cRect.top) / cRect.height));
      line.setAttribute('y2', String((ratio * 100).toFixed(1)));
    };
    gsap.ticker.add(setHeight);
    setHeight();
    return () => gsap.ticker.remove(setHeight);
  }, [reduced, localActive]);

  const percent = Math.round(progress * 100);
  const isActive = (i: number) => i === localActive;
  const isDone = (i: number) => i < localActive;

  return (
    <aside className={cn(sticky && 'sticky top-10 self-start')}>
      <div className="mx-auto flex max-w-[200px] flex-col items-center">
        <svg className="absolute left-1/2 top-4 h-[calc(100%-5rem)] w-px -translate-x-1/2" width="4" height="100%" viewBox="0 0 4 100" preserveAspectRatio="none">
          <line x1="2" y1="0" x2="2" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <line ref={lineRef} x1="2" y1="0" x2="2" y2="100" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {domain.phases.map((phase, i) => {
          return (
            <div key={phase.id} className="relative z-10 flex w-full items-center gap-3 py-2.5" id={`rail-node-${i}`}>
              <span
                className={cn(
                  'inline-grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[10px] font-black transition-all duration-500',
                  isActive(i) ? 'border-violet-300/60 bg-violet-500 text-[#fff]' : isDone(i) ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-300' : 'border-white/[0.08] bg-white/[0.03] text-zinc-500',
                )}
                style={{ transform: isActive(i) ? 'scale(1.15)' : 'scale(1)' }}
              >
                {isDone(i) ? <Check className="h-3.5 w-3.5" /> : String(i + 1).padStart(2, '0')}
              </span>
              <span className={cn('truncate text-sm font-semibold transition-colors duration-300', isActive(i) ? 'text-violet-100' : isDone(i) ? 'text-zinc-500' : 'text-zinc-600')}>
                {phase.label}
              </span>
            </div>
          );
        })}
        <div className="mt-3 w-full rounded-full border border-white/[0.08] px-2 py-1 text-center text-[10px] font-black uppercase tracking-[0.18em] text-fuchsia-300">
          {percent}%
        </div>
      </div>
    </aside>
  );
}