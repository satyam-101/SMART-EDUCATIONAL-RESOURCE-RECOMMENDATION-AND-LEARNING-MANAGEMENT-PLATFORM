import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getDomain, domains } from '../data/roadmaps';
import { RoadmapJourney } from '../components/roadmap/RoadmapJourney';
import { Logo } from '../components/ui/Logo';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PageTransition } from '../components/motion/PageTransition';

export function Roadmap() {
  const { domainId } = useParams<{ domainId: string }>();
  const domain = getDomain(domainId);
  const reduced = useReducedMotion();
  const totalLessons = domain ? domain.phases.reduce((sum, p) => sum + p.lessons, 0) : 0;
  const totalProjects = domain ? domain.phases.reduce((sum, p) => sum + p.projects.length, 0) : 0;
  const finalLevel = domain ? domain.phases[domain.phases.length - 1].difficulty : '';

  if (!domain) {
    return (
      <div className="grid min-h-screen place-items-center px-5 text-center">
        <div>
          <p className="text-5xl">◌</p>
          <h1 className="mt-4 text-2xl font-black text-white">This path hasn’t been charted yet.</h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">The roadmap you asked for doesn’t exist. Here are the paths that are ready:</p>
          <div className="mx-auto mt-5 flex max-w-sm flex-wrap justify-center gap-2">
            {domains.map((d) => (
              <Link key={d.id} to={`/roadmap/${d.id}`} className="rounded-full border border-violet-400/25 bg-violet-500/[0.07] px-4 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/15">
                {d.title}
              </Link>
            ))}
          </div>
          <Link to="/#paths" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white transition hover:bg-violet-500">
            Return to paths
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen overflow-hidden pt-16">
        {/* fixed nav — logo returns home, back button leaves the journey */}
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-zuno-950/72 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.05] px-2.5 py-1.5 text-sm font-semibold text-zinc-300 transition hover:border-violet-400/40 hover:bg-white/[0.09] hover:text-white"
                aria-label="Back to home"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link to="/" aria-label="ZUNO home" className="flex items-center gap-2.5 text-zinc-100 transition hover:text-violet-200">
                <Logo className="h-7 w-7" />
                <span className="text-lg font-black tracking-[-0.04em]">ZUNO</span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <header className="relative border-b border-white/[0.06] overflow-hidden">
          <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:px-8 lg:py-20">

            <div>
              <motion.p
                className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-300"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Sparkles className="h-3.5 w-3.5" /> {domain.duration} journey
              </motion.p>
              <h1 className="mt-3 text-5xl font-black tracking-[-0.05em] text-white sm:text-7xl">
                {domain.title.split(' ').map((word, i) => (
                  <motion.span
                    key={word}
                    className={`inline-block ${i === domain.title.split(' ').length - 1 ? 'text-violet-300' : ''}`}
                    initial={reduced ? false : { opacity: 0, y: 30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.15 + i * 0.09, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                    {i < domain.title.split(' ').length - 1 ? '\u00A0' : ''}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {domain.tagline}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-2.5"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.46, duration: 0.6 }}
            >
              {domain.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-violet-400/20 bg-violet-500/[0.07] px-3.5 py-1.5 text-xs font-semibold text-violet-200">
                  {skill}
                </span>
              ))}
            </motion.div>

            <motion.dl
              className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroStat value={String(domain.phases.length)} label="Phases" />
              <HeroStat value={String(totalLessons)} label="Lessons" />
              <HeroStat value={String(totalProjects)} label="Projects" />
              <HeroStat value={finalLevel} label="You'll reach" />
            </motion.dl>
          </div>
        </header>

        <RoadmapJourney domain={domain} />
      </div>
    </PageTransition>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
      <dd className="text-2xl font-black tracking-[-0.03em] text-white">{value}</dd>
      <dt className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">{label}</dt>
    </div>
  );
}