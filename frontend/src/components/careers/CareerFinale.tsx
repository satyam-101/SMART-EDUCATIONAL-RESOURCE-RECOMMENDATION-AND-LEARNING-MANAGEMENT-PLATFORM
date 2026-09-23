import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Check, Hammer, Layers3, Rocket, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allSkills, type CareerPath } from '../../data/careers';
import type { CareerProgressApi } from '../../hooks/useCareerProgress';
import { careerIcon } from './CareerIcon';

interface CareerFinaleProps {
  career: CareerPath;
  progress: CareerProgressApi;
}

/**
 * CAREER ENDPOINT — the honest completion screen.
 * No employment promises: here's what the path involved, the roles the skills
 * point at, and a clear next action.
 */
export function CareerFinale({ career, progress }: CareerFinaleProps) {
  const Icon = careerIcon(career);
  const navigate = useNavigate();
  const skills = allSkills(career);
  const projects = career.recommendedProjects;

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mx-auto grid place-items-center">
            <div className="relative grid h-20 w-20 place-items-center rounded-full" style={{ background: career.color }}>
              <Icon className="h-9 w-9 text-white" strokeWidth={2} />
            </div>
          </motion.div>

          <motion.h3 className="mt-8 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            YOU'VE REACHED THE NEXT LEVEL.
          </motion.h3>
          <motion.p className="mx-auto mt-4 max-w-xl text-zinc-400" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            {career.title} — you walked {career.phases.length} phases, {Math.round(progress.fraction * 100)}% of the path marked complete. Locked-in progress that belongs to your record, not a certificate wall.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card icon={<Check className="h-4 w-4" />} title="Skills you practiced" items={skills.slice(0, 8)} tint={career.color} />
          <Card icon={<Hammer className="h-4 w-4" />} title="Projects you can point at" items={projects} tint={career.color} />
          <Card icon={<Layers3 className="h-4 w-4" />} title="Technologies in your toolkit" items={career.technologies.slice(0, 8)} tint={career.color} />
        </div>

        <div className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7">
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-violet-300">
            <Briefcase className="h-3.5 w-3.5" /> You are job-ready for…
          </p>
          <p className="mt-1 text-xs text-zinc-500">These are roles the skillset points at — not a guarantee of employment.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {career.jobs.map((job) => (
              <div key={job.title} className="rounded-2xl border border-white/[0.07] bg-zuno-900/40 px-4 py-3.5">
                <p className="text-sm font-black text-white">{job.title}</p>
                <p className="mt-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">{job.level}</p>
                <p className="mt-1.5 text-xs leading-5 text-zinc-500">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7">
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-fuchsia-300">
            <Sparkles className="h-3.5 w-3.5" /> Explore next
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {career.specializations.map((s) => (
              <span key={s.id} className="rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/[0.07] px-3 py-1.5 text-xs font-bold text-fuchsia-100">
                {s.title}
              </span>
            ))}
          </div>
        </div>

        <motion.p className="mx-auto mt-12 max-w-2xl text-center text-base leading-7 text-zinc-400" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          "{career.endingNote}"
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black text-white transition hover:brightness-110"
            style={{ background: career.color }}
          >
            Start building
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/careers')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-6 py-3 text-sm font-bold text-zinc-200 transition hover:bg-white/[0.09]"
          >
            <Rocket className="h-4 w-4" /> Choose another path
          </button>
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, items, tint }: { icon: React.ReactNode; title: string; items: string[]; tint: string }) {
  return (
    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
      <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-zinc-400">
        <span style={{ color: tint }}>{icon}</span> {title}
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
            <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: tint }} />
            <span className="truncate">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}