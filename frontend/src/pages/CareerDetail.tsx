import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock, GraduationCap, Layers3, Sparkles } from 'lucide-react';
import { getCareer } from '../data/careers';
import { useCareerProgress } from '../hooks/useCareerProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Logo } from '../components/ui/Logo';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { PageTransition } from '../components/motion/PageTransition';
import { careerIcon } from '../components/careers/CareerIcon';
import { CareerJourney } from '../components/careers/CareerJourney';
import { SkillGraph } from '../components/careers/SkillGraph';
import { RoadmapGenerator } from '../components/careers/RoadmapGenerator';
import { CareerFinale } from '../components/careers/CareerFinale';

/**
 * CAREER DETAIL — the full journey for one path.
 * Header → adaptive overview → scroll story → skill graph → plan generator →
 * honest endpoint. All driven by the career data file; nothing path-specific.
 */
export function CareerDetail() {
  const { pathId } = useParams<{ pathId: string }>();
  const career = getCareer(pathId);
  const reduced = useReducedMotion();

  const progress = useCareerProgress(pathId ?? 'career', career?.phases.length ?? 0);

  if (!career) {
    return (
      <div className="grid min-h-screen place-items-center px-5 text-center">
        <div>
          <p className="text-5xl">◌</p>
          <h1 className="mt-4 text-2xl font-black text-white">This path hasn't been charted yet.</h1>
          <Link to="/careers" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white">
            Return to paths
          </Link>
        </div>
      </div>
    );
  }

  const Icon = careerIcon(career);
  const knownCount = progress.knownCount;
  const knownInFirst = career.phases[0]?.skills.filter((s) => progress.state.knownSkills.includes(s)).length ?? 0;

  return (
    <PageTransition>
      <div className="min-h-screen overflow-hidden pt-16">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-zuno-950/72 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-4">
              <Link
                to="/careers"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.05] px-2.5 py-1.5 text-sm font-semibold text-zinc-300 transition hover:border-violet-400/40 hover:bg-white/[0.09] hover:text-white"
                aria-label="Back to career paths"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Paths</span>
              </Link>
              <Link to="/" aria-label="ZUNO home" className="flex items-center gap-2.5 text-zinc-100 transition hover:text-violet-200">
                <Logo className="h-7 w-7" />
                <span className="hidden text-lg font-black tracking-[-0.04em] sm:inline">ZUNO</span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <header className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 lg:py-20">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <motion.p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-300" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  <Sparkles className="h-3.5 w-3.5" /> Career roadmap
                </motion.p>
                <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
                  <motion.span className="inline-block" initial={reduced ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    {career.title}
                  </motion.span>
                </h1>
                <motion.p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                  {career.subtitle}
                </motion.p>
              </div>

              <motion.div
                className="inline-grid h-20 w-20 shrink-0 place-items-center rounded-3xl border"
                style={{ borderColor: `${career.color}55`, background: `${career.color}14`, color: career.color }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                <Icon className="h-10 w-10" strokeWidth={1.8} />
              </motion.div>
            </div>

            <motion.div className="flex flex-wrap items-center gap-4">
              <Meta icon={<Clock className="h-3.5 w-3.5" />} label={`${career.estimatedMonths} months`} />
              <Meta icon={<Layers3 className="h-3.5 w-3.5" />} label={`${career.phases.length} phases`} />
              <Meta icon={<GraduationCap className="h-3.5 w-3.5" />} label={career.difficulty} />
            </motion.div>

            <motion.div className="flex flex-wrap gap-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
              {career.technologies.slice(0, 8).map((tech) => (
                <span key={tech} className="rounded-full border px-3.5 py-1.5 text-xs font-semibold" style={{ borderColor: `${career.color}40`, background: `${career.color}10`, color: career.color }}>
                  {tech}
                </span>
              ))}
            </motion.div>

            <div>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: career.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round(progress.fraction * 100)}%` }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="text-xs font-black" style={{ color: career.color }}>
                  {Math.round(progress.fraction * 100)}%
                </span>
              </div>

              {knownCount > 0 && (
                <motion.div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-200">
                    <Check className="h-4 w-4" /> You already know {knownCount} prerequisite{knownCount > 1 ? 's' : ''}.
                  </span>
                  {knownInFirst > 0 && (
                    <span className="text-xs text-emerald-300/80">
                      That unlocks {knownInFirst} of {career.phases[0]?.skills.length ?? 0} opening skills — take the opening assessment to test out and start ahead.
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => document.getElementById('skill-graph')?.scrollIntoView({ behavior: 'smooth' })}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-emerald-300/40 px-3 py-1.5 text-xs font-bold text-emerald-200 transition hover:bg-emerald-400/10"
                  >
                    Review known skills <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        <CareerJourney career={career} progress={progress} />

        <div id="skill-graph">
          <SkillGraph career={career} knownSkills={progress.state.knownSkills} onToggleKnown={progress.toggleSkill} />
        </div>

        <div className="mx-auto max-w-6xl border-t border-white/[0.06] px-5 sm:px-8">
          <RoadmapGenerator career={career} progress={progress} />
        </div>

        <div className="border-t border-white/[0.06]">
          <CareerFinale career={career} progress={progress} />
        </div>
      </div>
    </PageTransition>
  );
}

function Meta({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.04] px-3.5 py-2 text-xs font-bold text-zinc-300">
      {icon} {label}
    </span>
  );
}