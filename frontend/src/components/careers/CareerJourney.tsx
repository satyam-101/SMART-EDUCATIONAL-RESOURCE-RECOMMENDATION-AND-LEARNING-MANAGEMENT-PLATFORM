import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Check, Clock, Hammer, Trophy } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';
import { levelFor, type CareerPath, type CareerPhase } from '../../data/careers';
import type { CareerProgressApi } from '../../hooks/useCareerProgress';
import { careerIcon } from './CareerIcon';
import { PhaseArt } from './PhaseArt';

interface CareerJourneyProps {
  career: CareerPath;
  progress: CareerProgressApi;
}

/**
 * CAREER JOURNEY — a scroll-driven story per career path.
 * Each phase is a sticky scene; scrolling moves you through the ladder.
 * Active phase reveals its skills, tools, projects, and an assessable milestone.
 */
export function CareerJourney({ career, progress }: CareerJourneyProps) {
  const reduced = useReducedMotion();
  const [active, setActiveState] = useActivePhase();

  useEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      career.phases.forEach((_, i) => {
        const scene = document.getElementById(`cscene-${career.id}-${i}`);
        if (!scene) return;
        ScrollTrigger.create({
          trigger: scene,
          start: 'top 60%',
          end: 'bottom 45%',
          onEnter: () => setActiveState(i),
          onEnterBack: () => setActiveState(i),
          onLeaveBack: () => {
            if (i === 0) return;
            setActiveState(i - 1);
          },
          onLeave: () => {
            if (i < career.phases.length - 1) setActiveState(i + 1);
          },
        });
      });
    });
    return () => ctx.revert();
  }, [reduced, career, setActiveState]);

  const done = progress.state.completedPhases;

  return (
    <div className="relative">
      <div className="hidden gap-12 lg:grid lg:grid-cols-[220px_1fr]">
        <LadderRail career={career} active={active} done={done} fraction={progress.fraction} />
        <div className="relative">
          <StartMarker career={career} />
          {career.phases.map((phase, i) => (
            <PhaseScene
              key={phase.id}
              career={career}
              phase={phase}
              index={i}
              total={career.phases.length}
              active={active === i}
              known={progress.state.knownSkills}
              completed={done.includes(phase.id)}
              onToggleDone={() => progress.togglePhase(phase.id)}
            />
          ))}
        </div>
      </div>

      {/* Mobile: vertical storytelling, no pinning */}
      <div className="lg:hidden">
        <div className="sticky top-0 z-30 border-b border-white/[0.07] bg-zuno-950/85 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-xl items-center gap-3 px-5">
            <span className="text-xs font-black tracking-[0.16em] text-violet-300">
              LEVEL {levelFor(career.phases[Math.max(active, 0)]?.level ?? 1).short} · {String(Math.max(active + 1, 1)).padStart(2, '0')}/{String(career.phases.length).padStart(2, '0')}
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full rounded-full bg-violet-500 transition-all duration-500" style={{ width: `${((Math.max(active, 0) + 1) / career.phases.length) * 100}%` }} />
            </div>
          </div>
        </div>
        {career.phases.map((phase, i) => (
          <MobilePhase
            key={phase.id}
            career={career}
            phase={phase}
            known={progress.state.knownSkills}
            completed={done.includes(phase.id)}
            onToggleDone={() => progress.togglePhase(phase.id)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

function useActivePhase() {
  const [active, setActive] = useState(-1);
  const setActiveState = (i: number) => setActive((prev) => (i === prev ? prev : i));
  return [active, setActiveState] as const;
}

function StartMarker({ career }: { career: CareerPath }) {
  const reduced = useReducedMotion();
  const Icon = careerIcon(career);
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <motion.span
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em]"
        style={{ borderColor: `${career.color}44`, color: career.color, background: `${career.color}12` }}
      >
        <Icon className="h-3.5 w-3.5" /> Start · {career.title}
      </motion.span>
      <motion.span initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-zinc-500">
        <ArrowDown className="h-4 w-4" />
      </motion.span>
    </div>
  );
}

interface SceneProps {
  career: CareerPath;
  phase: CareerPhase;
  index: number;
  total: number;
  active: boolean;
  known: string[];
  completed: boolean;
  onToggleDone: () => void;
}

function PhaseScene({ career, phase, index, total, active, known, completed, onToggleDone }: SceneProps) {
  const level = levelFor(phase.level);
  const reduced = useReducedMotion();
  const isLast = index === total - 1;

  return (
    <section style={{ height: isLast ? '120vh' : '150vh' }} className="relative" id={`cscene-${career.id}-${index}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <PhaseArt type={phase.animationType} active={active} tint={career.color} className="right-0 opacity-70 lg:opacity-[0.5]" />
        <div className="relative mx-auto w-full max-w-2xl px-5 sm:px-8">
          <SceneBody career={career} phase={phase} active={active} known={known} completed={completed} level={level.short} onToggleDone={onToggleDone} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}

interface SceneBodyProps {
  career: CareerPath;
  phase: CareerPhase;
  active: boolean;
  known: string[];
  completed: boolean;
  level: string;
  onToggleDone: () => void;
  reduced: boolean;
}

function SceneBody({ career, phase, active, known, completed, level, onToggleDone, reduced }: SceneBodyProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0, y: active ? 0 : 18 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
      <motion.div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em]" animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }} transition={{ duration: 0.4, delay: 0.05 }}>
        <span className="text-fuchsia-300">Phase {phase.title}</span>
        <span className="h-1 w-1 rounded-full bg-zinc-600" />
        <span
          className="rounded-full border px-2 py-0.5"
          style={{ borderColor: `${career.color}55`, color: career.color, background: `${career.color}12` }}
        >
          L{phase.level} · {level}
        </span>
        <span className="text-zinc-500">{phase.estimatedTime}</span>
      </motion.div>

      <h3 className="mt-3 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
        <motion.span className="block" initial={{ y: reduced ? 0 : '110%' }} animate={{ y: active ? '0%' : reduced ? 0 : '110%' }} transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
          {phase.title}
        </motion.span>
      </h3>
      <motion.p className="mt-2 text-lg font-bold text-white/80" animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.22 }}>
        {phase.subtitle}
      </motion.p>
      <motion.p className="mt-3 max-w-lg text-base leading-7 text-zinc-300" animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }} transition={{ duration: 0.55, delay: 0.28 }}>
        {phase.description}
      </motion.p>

      <motion.ul className="mt-6 flex max-w-xl flex-wrap gap-2" animate={active ? 'show' : 'hidden'} initial="hidden">
        {phase.skills.map((skill) => {
          const isKnown = known.includes(skill);
          return (
            <motion.li
              key={skill}
              variants={{ hidden: { opacity: 0, scale: 0.85, y: 8 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
              className={cn(
                'flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm font-semibold',
                isKnown ? 'border-emerald-300/40 bg-emerald-400/10 text-emerald-200' : 'text-zinc-100',
              )}
              style={isKnown ? undefined : { borderColor: `${career.color}44`, background: `${career.color}12` }}
            >
              {isKnown && <Check className="h-3 w-3" />} {skill}
            </motion.li>
          );
        })}
      </motion.ul>

      <motion.div className="mt-6 flex flex-wrap items-center gap-2 text-xs" animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
        {phase.tools.slice(0, 4).map((t) => (
          <span key={t} className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-zinc-400">
            {t}
          </span>
        ))}
        <span className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-zinc-400">
          <Clock className="h-3 w-3" /> {phase.estimatedTime}
        </span>
      </motion.div>

      {phase.projects.length > 0 && (
        <motion.div className="mt-6 space-y-2" animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
          <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <Hammer className="h-3 w-3" /> Build this phase
          </p>
          {phase.projects.map((proj) => (
            <div key={proj.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-white">{proj.title}</span>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-400">{proj.difficulty}</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-zinc-500">{proj.output}</p>
            </div>
          ))}
        </motion.div>
      )}

      <motion.div className="mt-6 flex flex-wrap items-center gap-3" animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 0.65, duration: 0.5 }}>
        <span className="inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-400/10 px-3.5 py-2 text-xs font-black text-amber-200">
          <Trophy className="h-3.5 w-3.5" /> {phase.milestones[0]?.title}
        </span>
        <button
          type="button"
          onClick={onToggleDone}
          className={cn(
            'rounded-xl border px-3.5 py-2 text-xs font-bold transition',
            completed
              ? 'border-emerald-300/50 bg-emerald-400/15 text-emerald-200'
              : 'border-white/[0.12] bg-white/[0.05] text-zinc-300 hover:border-violet-300/50 hover:text-white',
          )}
        >
          {completed ? 'Phase learned ✓' : 'Mark phase learned'}
        </button>
      </motion.div>
    </motion.div>
  );
}

interface MobilePhaseProps {
  career: CareerPath;
  phase: CareerPhase;
  index: number;
  known: string[];
  completed: boolean;
  onToggleDone: () => void;
}

function MobilePhase({ career, phase, known, completed, onToggleDone, index }: MobilePhaseProps) {
  return (
    <motion.section className="relative mx-auto max-w-xl px-5 py-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.2 }}>
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
        <PhaseArt type={phase.animationType} active tint={career.color} className="opacity-50" />
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-fuchsia-300">
          Phase {String(index + 1).padStart(2, '0')} · {levelFor(phase.level).short}
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">{phase.title}</h3>
        <p className="mt-1 text-sm font-bold text-white/70">{phase.subtitle}</p>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{phase.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {phase.skills.map((skill) => (
            <li key={skill} className="rounded-lg border border-violet-400/25 bg-violet-500/[0.08] px-2.5 py-1.5 text-xs font-semibold text-violet-100" style={{ opacity: known.includes(skill) ? 0.5 : 1 }}>
              {known.includes(skill) && <Check className="mr-1 inline h-3 w-3 text-emerald-300" />}
              {skill}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-md border border-white/[0.08] px-2 py-0.5 text-[11px] text-zinc-500">{phase.estimatedTime}</span>
          <button
            type="button"
            onClick={onToggleDone}
            className={cn(
              'rounded-md border px-2 py-0.5 text-[11px] font-bold',
              completed ? 'border-emerald-300/50 bg-emerald-400/15 text-emerald-200' : 'border-white/[0.12] text-zinc-400',
            )}
          >
            {completed ? 'Learned ✓' : 'Mark learned'}
          </button>
        </div>
      </div>
    </motion.section>
  );
}

interface LadderRailProps {
  career: CareerPath;
  active: number;
  done: string[];
  fraction: number;
}

function LadderRail({ career, active, done, fraction }: LadderRailProps) {
  const reduced = useReducedMotion();
  const lineRef = useRef<SVGLineElement | null>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (reduced || !line) return undefined;
    const setHeight = () => {
      const node = document.getElementById(`rail-dot-${career.id}-${Math.max(active, 0)}`);
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
  }, [reduced, active, career.id]);

  return (
    <aside className="sticky top-12 self-start">
      <div className="mx-auto flex max-w-[220px] flex-col items-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Ladder</p>
        <svg className="absolute left-1/2 top-10 h-[calc(100%-4rem)] w-px -translate-x-1/2" width="4" height="100%" viewBox="0 0 4 100" preserveAspectRatio="none">
          <line x1="2" y1="0" x2="2" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <line ref={lineRef} x1="2" y1="0" x2="2" y2="100" stroke={career.color} strokeWidth="2" strokeLinecap="round" />
        </svg>
        {career.phases.map((phase, i) => {
          const isActive = active === i;
          const isDone = done.includes(phase.id);
          const level = levelFor(phase.level);
          return (
            <div key={phase.id} className="relative z-10 flex w-full items-center gap-3 py-2.5" id={`rail-dot-${career.id}-${i}`}>
              <span
                className={cn(
                  'inline-grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[10px] font-black transition-all duration-500',
                  isActive ? 'text-white' : isDone ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-300' : 'border-white/[0.08] bg-white/[0.03] text-zinc-500',
                )}
                style={isActive ? { borderColor: `${career.color}88`, background: career.color } : undefined}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className={cn('block truncate text-sm font-semibold transition-colors', isActive ? 'text-white' : 'text-zinc-500')}>{phase.title}</span>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                  <span style={{ color: level.color }}>{level.short}</span> · {level.label}
                </span>
              </span>
            </div>
          );
        })}
        <div className="mt-3 w-full rounded-full border border-white/[0.08] px-2 py-1 text-center text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: career.color }}>
          {Math.round(fraction * 100)}%
        </div>
      </div>
    </aside>
  );
}