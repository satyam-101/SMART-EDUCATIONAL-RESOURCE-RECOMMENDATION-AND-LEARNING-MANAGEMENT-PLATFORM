import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { careerAttributes, careers, type CareerPath } from '../../data/careers';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { careerIcon } from './CareerIcon';
import { cn } from '../../lib/utils';

const MAX = 3;

/**
 * ROADMAP COMPARISON — pick up to three careers and compare what each involves
 * on shared axes. Explicitly NOT a ranking: same axis, different weights per path.
 */
export function CareerCompare() {
  const [picked, setPicked] = useState<CareerPath[]>([careers[0], careers[1]]);
  const reduced = useReducedMotion();
  const navigate = useNavigate();

  function toggle(c: CareerPath) {
    setPicked((prev) => {
      const idx = prev.findIndex((p) => p.id === c.id);
      if (idx >= 0) return prev.filter((p) => p.id !== c.id);
      if (prev.length >= MAX) return prev;
      return [...prev, c];
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <p className="mr-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">Compare up to {MAX}</p>
        {careers.map((c) => {
          const active = picked.some((p) => p.id === c.id);
          const Icon = careerIcon(c);
          const full = picked.length >= MAX && !active;
          return (
            <button
              key={c.id}
              type="button"
              disabled={full}
              onClick={() => toggle(c)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all duration-300 disabled:opacity-35',
                active ? 'border-violet-300/50 bg-violet-500/15 text-white' : 'border-white/[0.09] bg-white/[0.04] text-zinc-400 hover:text-zinc-100',
              )}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: active ? undefined : c.color }} />
              {c.title}
            </button>
          );
        })}
      </div>

      {picked.length === 0 && <p className="mt-8 text-sm text-zinc-500">Pick at least one career to see its axis profile.</p>}

      {picked.length > 0 && (
        <motion.div className="mt-8 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {careerAttributes(picked[0]).map((attr) => (
            <div key={attr.label} className="grid grid-cols-[120px_1fr] items-center gap-4 sm:grid-cols-[150px_1fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-zinc-400">{attr.label}</p>
                <p className="mt-0.5 text-[11px] leading-4 text-zinc-600">{attr.hint}</p>
              </div>
              <div className="space-y-2.5">
                {picked.map((c) => {
                  const score = careerAttributes(c).find((a) => a.label === attr.label)?.score ?? 0;
                  return (
                    <div key={c.id} className="flex items-center gap-3">
                      <span className="w-36 truncate text-xs font-semibold text-zinc-400 sm:w-44">{c.title}</span>
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: c.color }}
                          initial={reduced ? { width: `${score * 20}%` } : { width: 0 }}
                          animate={{ width: `${score * 20}%` }}
                          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-xs leading-5 text-zinc-500">
            <Scale className="h-4 w-4 shrink-0 text-violet-300" />
            None of these paths is better than the others — compare what each involves, then choose the one that fits how you think.
          </div>

          <div className="flex flex-wrap gap-3">
            {picked.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => navigate(`/careers/${c.id}`)}
                className="group inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/[0.08] px-4 py-2 text-sm font-bold text-violet-100 transition hover:bg-violet-500/15"
              >
                Open {c.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}