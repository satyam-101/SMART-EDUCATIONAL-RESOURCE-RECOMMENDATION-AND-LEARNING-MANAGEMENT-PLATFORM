import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Reveal } from '../motion/Reveal';
import { LineReveal } from '../motion/SplitText';
import { useMagnetic } from '../../hooks/useMagnetic';
import { duration, ease } from '../../config/motionConfig';

const FOOTER_COLUMNS: { heading: string; links: { label: string; target: string }[] }[] = [
  {
    heading: 'Learn',
    links: [
      { label: 'Courses', target: '#courses' },
      { label: 'Career paths', target: '/careers' },
      { label: 'Roadmaps', target: '#paths' },
      { label: 'Outcomes', target: '#outcomes' },
    ],
  },
  {
    heading: 'Practice',
    links: [
      { label: 'Study planner', target: '/study-planner' },
      { label: 'Practice sets', target: '/practice' },
      { label: 'Projects', target: '/projects' },
      { label: 'Progress tracking', target: '/progress' },
    ],
  },
  {
    heading: 'Access',
    links: [
      { label: 'AI tutor', target: '/ai-tutor' },
      { label: 'Explore courses', target: '/explore' },
      { label: 'Create account', target: '/register' },
      { label: 'Sign in', target: '/login' },
    ],
  },
];

/**
 * CTA + FOOTER. The last chapter: a single vivid call-to-action panel, then a
 * quiet footer where the logo rises, links stagger in, and a purple thread
 * draws itself across the full width as the "continuous visual thread" closes.
 */
export function CtaFooter() {
  return (
    <footer className="relative overflow-hidden pt-24 lg:pt-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* ─── Final CTA panel ─── */}
        <Reveal variant="scale" className="relative">
          <div className="on-accent relative overflow-hidden rounded-[2rem] bg-violet-600 px-6 py-14 text-center sm:px-12 sm:py-20">

            <span className="relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <Sparkles className="h-3.5 w-3.5" /> Your next skill is waiting
            </span>
            <h2 className="relative mx-auto mt-6 max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl">
              <LineReveal stagger={0.14}>From Zero to Know-How.</LineReveal>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Join thousands of learners building skills that matter. Free to start, harder to stop.
            </p>

            <div className="relative mt-9 flex justify-center">
              <MagneticCta />
            </div>
          </div>
        </Reveal>

        {/* ─── Footer ─── */}
        <div className="mt-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              <motion.span
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: duration.normal, ease: ease.out }}
                className="flex items-center gap-2.5"
              >
                <Logo className="h-8 w-8" />
                <span className="text-xl font-black tracking-[-0.04em] text-zinc-100">ZUNO</span>
              </motion.span>
              <p className="mt-4 text-sm leading-6 text-zinc-500">
                ZUNO is a hands-on learning platform: structured roadmaps, applied projects, and an AI tutor that
                keeps pace with you. Every path runs from fundamentals to something you can ship.
              </p>
            </div>

            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500">{column.heading}</p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) =>
                    link.target.startsWith('#') ? (
                      <li key={link.label}>
                        <a
                          href={link.target}
                          className="text-sm text-zinc-400 transition hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link to={link.target} className="text-sm text-zinc-400 transition hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="mt-16 text-2xl font-black tracking-[-0.03em] text-zinc-100 sm:text-3xl">
            <LineReveal stagger={0.2}>Keep learning.</LineReveal>
          </h3>

          {/* continuous thread — draws across the footer */}
          <div className="relative mx-auto mt-10 max-w-4xl">
            <div className="h-px w-full bg-white/[0.06]" />
            <motion.div
              aria-hidden
              className="absolute inset-y-0 left-0 h-px w-full origin-left bg-violet-400"
              initial={false}
              whileInView={{ scaleX: [0, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: ease.out }}
            />
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-between gap-3 pb-10 text-xs text-zinc-500 sm:flex-row">
            <p>© {new Date().getFullYear()} ZUNO Learning. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/login" className="transition hover:text-zinc-300">Sign in</Link>
              <Link to="/register" className="transition hover:text-zinc-300">Create account</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** White magnetic CTA on the brand panel. */
function MagneticCta() {
  const magnet = useMagnetic<HTMLAnchorElement>({ strength: 8 });

  return (
    <Link
      ref={magnet.ref}
      to="/register"
      onPointerMove={magnet.onPointerMove}
      onPointerLeave={magnet.onPointerLeave}
      className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-violet-700 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
    >
      Create your free account
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}