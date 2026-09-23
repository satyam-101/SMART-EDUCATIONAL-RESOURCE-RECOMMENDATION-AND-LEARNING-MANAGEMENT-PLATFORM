import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { careers, type CareerPath } from '../../data/careers';
import { careerIcon } from './CareerIcon';
import { cn } from '../../lib/utils';

type Choice = string;

const INTERESTS: Choice[] = ['Coding', 'Math', 'Design', 'Infrastructure', 'Security', 'Data', 'AI'];
const PREFERENCES: Choice[] = ['Building products', 'Analyzing data', 'Working with systems', 'Research', 'Automation'];

const MATCH: Record<CareerPath['id'], { interests: Choice[]; preferences: Choice[] }> = {
  'ai-engineer': { interests: ['Coding', 'Math', 'AI'], preferences: ['Building products', 'Research'] },
  'ml-engineer': { interests: ['Coding', 'Math', 'AI', 'Data'], preferences: ['Research', 'Building products'] },
  'data-scientist': { interests: ['Math', 'Data', 'AI'], preferences: ['Analyzing data', 'Research'] },
  'data-engineer': { interests: ['Coding', 'Data', 'Infrastructure'], preferences: ['Working with systems', 'Building products'] },
  'software-engineer': { interests: ['Coding'], preferences: ['Building products', 'Working with systems'] },
  'full-stack': { interests: ['Coding', 'Design'], preferences: ['Building products'] },
  backend: { interests: ['Coding', 'Infrastructure'], preferences: ['Working with systems', 'Building products'] },
  'cloud-devops': { interests: ['Coding', 'Infrastructure'], preferences: ['Automation', 'Working with systems'] },
  mlops: { interests: ['Coding', 'Data', 'AI', 'Infrastructure'], preferences: ['Automation', 'Working with systems'] },
  cybersecurity: { interests: ['Security', 'Infrastructure', 'Coding'], preferences: ['Working with systems', 'Automation'] },
  'data-analyst': { interests: ['Data', 'Math', 'Design'], preferences: ['Analyzing data'] },
  'llm-app-engineer': { interests: ['Coding', 'AI'], preferences: ['Building products', 'Automation'] },
  frontend: { interests: ['Coding', 'Design'], preferences: ['Building products'] },
  mobile: { interests: ['Coding', 'Design'], preferences: ['Building products'] },
  embedded: { interests: ['Coding', 'Infrastructure'], preferences: ['Building products', 'Working with systems'] },
};

interface Result {
  career: CareerPath;
  score: number;
  reasons: string[];
}

/**
 * CAREER DISCOVERY — "Not sure what to choose?"
 * A two-step taste quiz. Suggestions are exactly that — no path is presented
 * as universally best.
 */
export function CareerDiscover() {
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<Choice[]>([]);
  const [prefs, setPrefs] = useState<Choice[]>([]);
  const [results, setResults] = useState<Result[] | null>(null);
  const navigate = useNavigate();

  function toggle(list: Choice[], set: (next: Choice[]) => void, item: Choice) {
    set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  }

  function next() {
    if (step < 1) {
      setStep(step + 1);
      return;
    }
    const scored: Result[] = careers
      .map((career) => {
        const m = MATCH[career.id];
        const iScore = interests.filter((i) => m.interests.includes(i)).length;
        const pScore = prefs.filter((p) => m.preferences.includes(p)).length;
        const score = iScore * 2 + pScore;
        const reasons: string[] = [];
        if (iScore) {
          const matched = interests.filter((i) => m.interests.includes(i));
          reasons.push(`matches your interest in ${matched.join(', ').toLowerCase()}`);
        }
        if (pScore) {
          const matched = prefs.filter((p) => m.preferences.includes(p));
          reasons.push(`fits your preference for ${matched.join(', ').toLowerCase()}`);
        }
        return { career, score, reasons };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);
    setResults(scored.slice(0, 4));
  }

  function reset() {
    setStep(0);
    setInterests([]);
    setPrefs([]);
    setResults(null);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <AnimatePresence mode="wait">
        {!results ? (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-fuchsia-300">Step {step + 1} of 2</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                <div className="h-full bg-violet-500 transition-all duration-500" style={{ width: `${((step + 1) / 2) * 100}%` }} />
              </div>
            </div>

            {step === 0 ? (
              <div className="mt-6">
                <h3 className="text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">What do you enjoy?</h3>
                <p className="mt-2 text-sm text-zinc-400">Pick what pulls you in — as many as you like.</p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {INTERESTS.map((i) => (
                    <Chip key={i} active={interests.includes(i)} onClick={() => toggle(interests, setInterests, i)}>
                      {i}
                    </Chip>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <h3 className="text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">What do you prefer?</h3>
                <p className="mt-2 text-sm text-zinc-400">The kind of work you want doing most days.</p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {PREFERENCES.map((p) => (
                    <Chip key={p} active={prefs.includes(p)} onClick={() => toggle(prefs, setPrefs, p)}>
                      {p}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={next}
              disabled={step === 0 ? interests.length === 0 : prefs.length === 0}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-500 disabled:opacity-40"
            >
              {step === 0 ? 'Next' : 'Show me paths'} <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">Paths worth exploring</h3>
              <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 transition hover:text-zinc-200">
                <RotateCcw className="h-3.5 w-3.5" /> Retake
              </button>
            </div>
            <p className="mt-2 text-sm text-zinc-400">Starts, not answers — every path that lit up is worth a closer look.</p>

            <div className="mt-6 space-y-3">
              {results.map((r, i) => {
                const Icon = careerIcon(r.career);
                return (
                  <motion.button
                    key={r.career.id}
                    type="button"
                    onClick={() => navigate(`/careers/${r.career.id}`)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group flex w-full items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-left transition hover:border-violet-300/30 hover:bg-white/[0.05]"
                  >
                    <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-2xl border" style={{ borderColor: `${r.career.color}44`, background: `${r.career.color}14`, color: r.career.color }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-extrabold tracking-[-0.02em] text-white">{r.career.title}</p>
                      <p className="mt-0.5 truncate text-xs text-zinc-500">{r.reasons.join(' · ') || r.career.subtitle}</p>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-violet-200 transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <p className="mt-6 flex items-start gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-xs leading-5 text-zinc-500">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
              No career here is "the best". They involve different work, different tools, and different trade-offs — the quiz just narrows where to start looking.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300',
        active ? 'border-violet-300/50 bg-violet-500/15 text-white' : 'border-white/[0.09] bg-white/[0.04] text-zinc-400 hover:border-white/20 hover:text-zinc-100',
      )}
    >
      {children}
    </button>
  );
}