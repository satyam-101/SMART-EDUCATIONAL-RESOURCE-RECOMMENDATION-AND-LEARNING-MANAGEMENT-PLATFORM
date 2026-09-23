import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Play, Sparkles } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { duration, ease } from '../../config/motionConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMagnetic } from '../../hooks/useMagnetic';
import { ZunoIntelligence } from './ZunoIntelligence';

const entrance = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.4 } },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: duration.emphasis, ease: ease.out } },
};

/**
 * HERO — "From Zero to Know-How."
 *
 * The interface waking up: badge, then the headline line by line, subtitle,
 * CTAs, and finally the AI visual. The copy stays perfectly still while you
 * scroll; the only scroll cue is the small "Scroll" hint at the bottom
 * fading away as the user moves.
 */
export function HeroSection() {
  const root = useRef<HTMLElement | null>(null);
  const cue = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(cue.current, {
        opacity: 0,
        y: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '12% top',
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-clip pb-20 pt-28 lg:pt-24">

      <motion.div
        variants={entrance}
        initial={reduced ? false : 'hidden'}
        animate={reduced ? undefined : 'show'}
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8"
      >
        <div>
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold text-violet-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered learning that adapts to you
          </motion.p>

          <div className="mt-7">
            <h1 className="text-[2.9rem] font-black leading-[1.02] tracking-[-0.055em] text-zinc-100 sm:text-6xl lg:text-[5rem]">
              <span className="block overflow-hidden pb-1">
                <motion.span variants={item} className="block will-change-transform">
                  From Zero to
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span variants={item} className="block text-gradient-animated will-change-transform">
                  Know-How.
                </motion.span>
              </span>
            </h1>
          </div>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg"
          >
            Master any subject with curated courses, an AI tutor that explains anything, and a study
            planner that keeps you on track. Learn smarter, stay consistent, and hit every goal.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <HeroCta to="/register">
              <Play className="h-4 w-4" />
              Start learning free
            </HeroCta>
            <a
              href="#courses"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-6 py-3.5 font-bold text-zinc-200 transition-colors duration-300 hover:border-white/[0.2] hover:bg-white/[0.09] hover:text-white"
            >
              <Compass className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              Explore courses
            </a>
          </motion.div>
        </div>

        <motion.div variants={item} className="justify-self-center lg:justify-self-end">
          <ZunoIntelligence />
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        ref={cue}
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500 md:flex"
      >
        Scroll
        <motion.span
          aria-hidden
          className="h-9 w-px bg-violet-400/60"
          animate={reduced ? undefined : { y: [0, 7, 0], opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

/** Magnetic primary CTA rendered as a real link. */
function HeroCta({ to, children }: { to: string; children: React.ReactNode }) {
  const magnet = useMagnetic<HTMLAnchorElement>({ strength: 8 });

  return (
    <Link
      ref={magnet.ref}
      to={to}
      onPointerMove={magnet.onPointerMove}
      onPointerLeave={magnet.onPointerLeave}
      className="group relative inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-bold text-white shadow-md transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
    >
      {children}
    </Link>
  );
}