import { motion } from 'framer-motion';
import { AtSign, BookOpen, Bot, Flame, LineChart as LineChartIcon, Trophy } from 'lucide-react';
import { Reveal } from '../motion/Reveal';
import { Parallax } from '../motion/Parallax';
import { ease } from '../../config/motionConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const WEEK = [
  { day: 'M', h: 38 },
  { day: 'T', h: 55 },
  { day: 'W', h: 31 },
  { day: 'T', h: 74 },
  { day: 'F', h: 50 },
  { day: 'S', h: 88 },
  { day: 'S', h: 63 },
];

const SPARK = [22, 34, 30, 48, 44, 62, 58, 74, 70, 88];

const sparkPoints = SPARK.map((v, i) => [
  ((i / (SPARK.length - 1)) * 100).toFixed(1),
  (40 - (v / 88) * 40).toFixed(1),
]).join(' ');

const sparkArea = `M0,40 L${sparkPoints.replaceAll(' ', ' L')} L100,40 Z`;

function SparkPath() {
  return (
    <motion.polyline
      points={sparkPoints}
      fill="none"
      stroke="#a78bfa"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.4, ease: ease.out }}
    />
  );
}

/**
 * PLATFORM PREVIEW — "Your learning, at a glance".
 * A framed dashboard window rendered on the landing so ZUNO reads as a real
 * product before you even sign up: animated weekly activity, a skill sparkline,
 * a radial path-progress ring, and floating live badges around the frame.
 */
export function PlatformPreview() {
  const reduced = useReducedMotion();
  const ring = 0.62;

  return (
    <section className="relative py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="section-label">Inside your learning space</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-zinc-100 sm:text-4xl">
            Progress you can <span className="text-gradient-animated">see</span>
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
            Every lesson, quiz and project feeds a graph — so you always know what
            you’ve mastered and what’s next.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-14">
          {/* floating live badges */}
          {!reduced && (
            <>
              <Parallax speed={0.06} invert className="absolute -left-2 top-8 z-20 hidden sm:block lg:-left-10">
                <FloatingBadge icon={<Bot className="h-3.5 w-3.5" />} text="AI tutor • explained 3 doubts" />
              </Parallax>
              <Parallax speed={0.1} invert className="absolute -right-2 top-24 z-20 hidden sm:block lg:-right-12">
                <FloatingBadge icon={<Flame className="h-3.5 w-3.5" />} text="18-day streak" />
              </Parallax>
              <Parallax speed={0.08} className="absolute -bottom-6 left-8 z-20 hidden sm:block">
                <FloatingBadge icon={<Trophy className="h-3.5 w-3.5" />} text="Milestone unlocked" />
              </Parallax>
            </>
          )}

          {/* the window */}
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-zuno-900/70 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.75)] backdrop-blur-xl">
            {/* window bar */}
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/25" />
              <span className="ml-3 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-zinc-500">
                <BookOpen className="h-3 w-3" /> zuno.space / dashboard
              </span>
            </div>

            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.1fr_0.9fr]">
              {/* left: continuing course + path ring */}
              <div className="flex flex-col gap-5">
                <div className="on-accent relative overflow-hidden rounded-2xl bg-violet-600 p-5">
                  <div className="relative flex items-start justify-between">
                    <span className="rounded-lg bg-white/15 px-2 py-1 text-[10px] font-bold tracking-wider text-white">CONTINUE</span>
                    <span className="rounded-lg bg-white/15 px-2 py-1 text-[10px] font-bold text-white">68%</span>
                  </div>
                  <p className="relative mt-6 text-[11px] font-medium text-white/70">AI Engineer · Phase 4</p>
                  <h3 className="relative mt-1 text-lg font-black text-white">Deep Learning</h3>
                  <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-black/25">
                    <motion.div
                      className="h-full rounded-full bg-white"
                      initial={{ width: '0%' }}
                      whileInView={{ width: '68%' }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 1.2, ease: ease.out, delay: 0.2 }}
                    />
                  </div>
                  <div className="relative mt-2 flex justify-between text-[10px] text-white/70">
                    <span>8 of 12 lessons</span>
                    <span>Backprop, CNNs, Training loop…</span>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-between gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <div className="relative h-20 w-20 shrink-0">
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="11" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#a78bfa"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeDasharray="264"
                        initial={{ strokeDashoffset: 264 }}
                        whileInView={{ strokeDashoffset: 264 * (1 - ring) }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.4, ease: ease.out, delay: 0.3 }}
                      />
                    </svg>
                    <span className="absolute inset-0 grid place-items-center text-sm font-black text-zinc-100">62%</span>
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-sm font-bold text-zinc-100">
                      <LineChartIcon className="h-4 w-4 text-violet-300" /> AI Engineer path
                    </p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      Foundations done · Machine Learning in progress · LLMs on deck
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {['Python', 'ML', 'LLMs', 'MLOps'].map((s) => (
                        <span key={s} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-violet-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* right: weekly activity + sparkline */}
              <div className="flex flex-col gap-5">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-zinc-100">Weekly focus</p>
                    <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">+18%</span>
                  </div>
                  <div className="mt-5 flex h-24 items-end justify-between gap-2">
                    {WEEK.map((w, i) => (
                      <div key={`${w.day}-${i}`} className="flex w-full flex-col items-center gap-1.5">
                        <motion.div
                          className="w-full rounded-t-md bg-violet-500"
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.8, ease: ease.out, delay: 0.2 + i * 0.07 }}
                          style={{ height: `${w.h}px`, transformOrigin: 'bottom' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[9px] font-semibold uppercase tracking-wider text-zinc-600">
                    {WEEK.map((w, i) => (
                      <span key={`${w.day}-${i}`}>{w.day}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-zinc-100">XP growth</p>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-violet-300">
                      <AtSign className="h-3 w-3" /> 2.3x this month
                    </span>
                  </div>
                  <svg viewBox="0 0 100 40" className="mt-2 h-20 w-full" preserveAspectRatio="none">
                    <path d={sparkArea} fill="rgba(139,92,246,0.2)" />
                    <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.4, duration: 0.6 }}>
                      <SparkPath />
                    </motion.g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FloatingBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-zuno-900/90 px-3 py-2 text-xs font-semibold text-zinc-200 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)] backdrop-blur"
      animate={reduced ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="grid h-6 w-6 place-items-center rounded-lg bg-violet-600 text-[#fff]">{icon}</span>
      {text}
    </motion.div>
  );
}