import { useEffect, useRef } from 'react';
import { BookOpen, Dices, Hammer, Rocket, Trophy } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Reveal } from '../motion/Reveal';

const STEPS = [
  {
    icon: BookOpen,
    n: '01',
    t: 'Learn',
    d: 'Concise, concept-first lessons that build one idea on the last.',
    tags: ['Concepts', 'Guides', 'AI tutor on tap'],
    tone: 'text-violet-300 border-violet-400/25 bg-violet-500/10',
  },
  {
    icon: Dices,
    n: '02',
    t: 'Practice',
    d: 'Adaptive quizzes and spaced drills that find your gaps for you.',
    tags: ['Quizzes', 'Spaced recall'],
    tone: 'text-fuchsia-300 border-fuchsia-400/25 bg-fuchsia-500/10',
  },
  {
    icon: Hammer,
    n: '03',
    t: 'Apply',
    d: 'Solve problems that look like the real world — not textbooks.',
    tags: ['Challenges', 'Case studies'],
    tone: 'text-emerald-300 border-emerald-400/25 bg-emerald-500/10',
  },
  {
    icon: Rocket,
    n: '04',
    t: 'Build',
    d: 'Ship projects end-to-end with live feedback from the AI tutor.',
    tags: ['Projects', 'Portfolio'],
    tone: 'text-sky-300 border-sky-400/25 bg-sky-500/10',
  },
  {
    icon: Trophy,
    n: '05',
    t: 'Master',
    d: 'Prove it. Your streak, progress and skill graph tell the story.',
    tags: ['Skill graph', 'Mastery'],
    tone: 'text-amber-300 border-amber-400/25 bg-amber-500/10',
  },
];

/**
 * MASTERY FLOW — "How ZUNO turns learning into skill".
 *
 * A short pinned chapter: vertical scroll drives the five stages across the
 * viewport horizontally. A purple thread draws alongside the row as progress
 * moves, so the section reads as one continuous journey toward mastery.
 * Falls back to a simple stacked reveal on mobile / reduced motion.
 */
export function MasteryFlow() {
  const root = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const thread = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current || !track.current || !thread.current) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (pointer: fine)', () => {
      const tween = gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${track.current!.scrollWidth - window.innerWidth + 160}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (thread.current) {
              thread.current.style.transform = `scaleX(${self.progress})`;
              thread.current.style.opacity = String(Math.min(self.progress * 12 + 0.15, 0.9));
            }
          },
        },
      });
      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section id="outcomes" className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FlowHeader />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s) => (
              <FlowCard key={s.n} s={s} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="outcomes" ref={root} className="relative overflow-hidden">
      {/* Desktop — pinned horizontal journey */}
      <div className="hidden md:block">
        <div className="flex min-h-[100svh] flex-col justify-center py-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <FlowHeader />
            <div className="relative mt-16">
              <div
                ref={thread}
                aria-hidden
                className="pointer-events-none absolute left-0 top-5 h-px w-full origin-left bg-violet-400"
                style={{ transform: 'scaleX(0)', opacity: 0 }}
              />
              <div ref={track} className="flex w-max items-stretch gap-5 pb-2">
                {STEPS.map((s, i) => (
                  <FlowCard key={s.n} s={s} wide={i === STEPS.length - 1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet / mobile — stacked vertical reveal */}
      <div className="md:hidden">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <FlowHeader />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {STEPS.map((s) => (
              <FlowCard key={s.n} s={s} className={s.n === '1' ? 'sm:col-span-2' : ''} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowHeader() {
  return (
    <Reveal>
      <div>
        <p className="section-label">The ZUNO loop</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.04em] text-zinc-100 sm:text-4xl lg:text-5xl">
          How ZUNO turns learning into <span className="text-gradient-animated">skill</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
          Every day moves you through the same deliberate loop — each stage hands off to the next,
          so progress compounds.
        </p>
      </div>
    </Reveal>
  );
}

function FlowCard({ s, wide = false, className = '' }: { s: (typeof STEPS)[number]; wide?: boolean; className?: string }) {
  const Icon = s.icon;
  return (
    <article
      className={`group relative flex w-[min(84vw,26rem)] shrink-0 snap-center flex-col justify-between rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 shadow-card backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.16] ${
        wide ? 'mr-[6vw] sm:w-[28rem]' : ''
      } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className={`grid h-11 w-11 place-items-center rounded-xl border ${s.tone}`}>
            <Icon className="h-5 w-5" />
          </span>
          <span className="text-4xl font-black tracking-tight text-zinc-400/10 transition-colors duration-300 group-hover:text-zinc-400/25">
            {s.n}
          </span>
        </div>
        <h3 className="mt-7 text-2xl font-black tracking-[-0.03em] text-zinc-100">{s.t}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{s.d}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {s.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}