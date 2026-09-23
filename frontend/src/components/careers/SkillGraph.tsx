import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Check, ChevronRight, Info } from 'lucide-react';
import type { CareerPath } from '../../data/careers';
import { cn } from '../../lib/utils';

interface SkillGraphProps {
  career: CareerPath;
  /** skills the learner has already marked known */
  knownSkills?: string[];
  onToggleKnown?: (skill: string) => void;
}

/**
 * SKILL DEPENDENCY GRAPH — click any skill to see its prerequisites, what it
 * unlocks, and what comes next. Also doubles as the "already known" adaptive
 * toggle: mark skills you own and the roadmap treats them as done.
 */
export function SkillGraph({ career, knownSkills = [], onToggleKnown }: SkillGraphProps) {
  const nodes = career.skillGraph;
  const [selected, setSelected] = useState<string>(nodes[0]?.name ?? '');

  if (nodes.length === 0) return null;

  const current = nodes.find((n) => n.name === selected) ?? nodes[0];
  const next = nodes.filter((n) => n.prerequisites.includes(current.name));
  const known = new Set(knownSkills);

  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Skill dependency graph
          </motion.p>
          <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">What unlocks what.</h3>
          <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
            Every skill has a prerequisite. Click a node to inspect it — and mark anything you already know to fast-forward the path.
          </p>

          <div className="mt-10">
            {nodes.map((node, i) => {
              const isSelected = node.name === current.name;
              const isKnown = known.has(node.name);
              return (
                <div key={node.name}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(node.name);
                      onToggleKnown?.(node.name);
                    }}
                    className={cn(
                      'group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300',
                      isSelected ? 'border-violet-300/50 bg-violet-500/[0.12]' : 'border-white/[0.07] bg-white/[0.03] hover:border-violet-300/25',
                      isKnown && 'border-emerald-300/30',
                    )}
                  >
                    <span
                      className={cn(
                        'inline-grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[10px] font-black',
                        isKnown
                          ? 'border-emerald-300/50 bg-emerald-400/15 text-emerald-300'
                          : isSelected
                            ? 'border-violet-300/60 bg-violet-500 text-white'
                            : 'border-white/[0.1] bg-white/[0.04] text-zinc-500',
                      )}
                    >
                      {isKnown ? <Check className="h-3.5 w-3.5" /> : String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={cn('text-sm font-bold tracking-tight', isSelected ? 'text-white' : 'text-zinc-300')}>{node.name}</span>
                    <span className="ml-auto text-zinc-600 transition group-hover:text-violet-300">
                      <ChevronRight className={cn('h-4 w-4 transition-transform', isSelected && 'rotate-90 text-violet-300')} />
                    </span>
                  </button>
                  {i < nodes.length - 1 && (
                    <div className="flex justify-center py-1" aria-hidden>
                      <ArrowDown className="h-3.5 w-3.5 text-zinc-700" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <motion.div
            key={current.name}
            className="sticky top-24 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-fuchsia-300">
              <Info className="h-3.5 w-3.5" /> Skill detail
            </div>
            <div className="mt-2">
              <span
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-black text-white',
                  known.has(current.name) && 'bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-300/40',
                )}
                style={{ background: known.has(current.name) ? undefined : `${career.color}26` }}
              >
                {current.name}
                {known.has(current.name) && <Check className="h-3.5 w-3.5" />}
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <Section label="Prerequisites">
                {current.prerequisites.length > 0 ? (
                  <StatusPills items={current.prerequisites} known={known} color={career.color} />
                ) : (
                  <p className="text-sm text-zinc-500">No prerequisites — a genuine starting point.</p>
                )}
              </Section>
              <Section label="You are here">
                <p className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-zinc-300">{current.name}</p>
              </Section>
              <Section label="Unlocks next">
                {next.length > 0 ? <StatusPills items={next.map((n) => n.name)} known={known} color={career.color} /> : <p className="text-sm text-zinc-500">Capstone skill — the path converges here.</p>}
              </Section>
            </div>

            {onToggleKnown && (
              <button
                type="button"
                onClick={() => onToggleKnown(current.name)}
                className="mt-7 w-full rounded-xl border border-violet-400/40 py-2.5 text-sm font-bold text-violet-200 transition hover:bg-violet-500/10"
              >
                {known.has(current.name) ? 'Mark as not known' : `Mark "${current.name}" as already known`}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function StatusPills({ items, known, color }: { items: string[]; known: Set<string>; color: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <span
          key={s}
          className={cn(
            'rounded-lg border px-2.5 py-1 text-xs font-semibold',
            known.has(s) ? 'border-emerald-300/40 bg-emerald-400/10 text-emerald-200' : 'text-zinc-300',
          )}
          style={known.has(s) ? undefined : { borderColor: `${color}44`, background: `${color}12` }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}