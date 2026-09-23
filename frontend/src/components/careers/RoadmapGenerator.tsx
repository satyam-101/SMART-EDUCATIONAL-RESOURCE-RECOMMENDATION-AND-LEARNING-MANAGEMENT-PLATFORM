import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarRange, Clock, Plus, RotateCcw, Wand } from 'lucide-react';
import type { CareerPath } from '../../data/careers';
import type { CareerProgressApi } from '../../hooks/useCareerProgress';

interface RoadmapGeneratorProps {
  career: CareerPath;
  progress: CareerProgressApi;
}

function weeksOf(est: string): number {
  const n = parseFloat(est.replace(/[^\d.]/g, ''));
  if (!Number.isFinite(n) || n <= 0) return 2;
  return Math.max(1, Math.round(n));
}

interface PlannedRow {
  phaseId: string;
  title: string;
  weeks: number;
  startWeek: number;
  endWeek: number;
}

/**
 * AI ROADMAP GENERATOR — "I want to become X in N months @ W hours/week."
 * Recomposes the static phases into a dated weekly schedule with a total
 * study-hour estimate and per-phase pacing. Data stays truthful to the path.
 */
export function RoadmapGenerator({ career, progress }: RoadmapGeneratorProps) {
  const [months, setMonths] = useState<number>(career.estimatedMonths);
  const [hours, setHours] = useState<number>(8);
  const [planned, setPlanned] = useState<PlannedRow[] | null>(null);

  const plan = useMemo<PlannedRow[]>(() => {
    const totalWeeks = Math.max(4, Math.round(months * 4.33));
    const baseWeeks = career.phases.map((p) => weeksOf(p.estimatedTime));
    const baseTotal = baseWeeks.reduce((a, b) => a + b, 0);
    const scale = baseTotal > 0 ? totalWeeks / baseTotal : 1;
    const rows: PlannedRow[] = [];
    let cursor = 1;
    career.phases.forEach((p, i) => {
      const w = Math.max(1, Math.round(baseWeeks[i] * scale));
      rows.push({ phaseId: p.id, title: p.title, weeks: w, startWeek: cursor, endWeek: Math.min(totalWeeks, cursor + w - 1) });
      cursor += w;
    });
    return rows;
  }, [career, months]);

  function generate() {
    setPlanned(plan);
  }

  const totalStudyHours = Math.round((hours) * ((months * 4.33)));
  const knownInFirstPhase = career.phases[0]?.skills.filter((s) => progress.state.knownSkills.includes(s)).length ?? 0;

  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <motion.p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              AI roadmap generator
            </motion.p>
            <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">Set your pace, get a plan.</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
              Tell ZUNO when you want to arrive and how much time you have each week. The generator recomposes this path into a dated schedule — phases don't change, pacing does.
            </p>

            <div className="mt-7 space-y-5 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
              <Field label="Target duration">
                <stepper.Months value={months} onChange={setMonths} max={24} />
              </Field>
              <Field label="Weekly commitment">
                <Hours value={hours} onChange={setHours} />
              </Field>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <Stat label="Total plan" value={`~${months} months`} />
                <Stat label="Study volume" value={`~${totalStudyHours}h`} icon={<Clock className="h-3 w-3" />} />
              </div>

              <button
                type="button"
                onClick={generate}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-500"
              >
                <Wand className="h-4 w-4" /> Generate my plan
              </button>

              {knownInFirstPhase > 0 && (
                <p className="rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-3.5 py-2.5 text-xs leading-5 text-emerald-200">
                  You already marked {knownInFirstPhase} skill{knownInFirstPhase > 1 ? 's' : ''} in the opening phase as known. Take the opening assessment — a high score unlocks the next phase early.
                </p>
              )}
            </div>
          </div>

          <div>
            {!planned ? (
              <div className="grid h-full min-h-[24rem] place-items-center rounded-3xl border border-dashed border-white/[0.1] p-8 text-center">
                <div>
                  <CalendarRange className="mx-auto h-8 w-8 text-violet-300" strokeWidth={1.5} />
                  <p className="mt-4 text-lg font-black text-white/90">Your weekly schedule appears here.</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">Pick a duration and weekly hours, then generate. Start from phase one — or skip ahead if you already know the prerequisites.</p>
                </div>
              </div>
            ) : (
              <motion.div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-white">{career.title} · {months} months</p>
                  <button type="button" onClick={() => setPlanned(null)} className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-500 hover:text-zinc-200">
                    <RotateCcw className="h-3 w-3" /> Adjust
                  </button>
                </div>
                <p className="mt-1 text-xs text-zinc-500">
                  {hours}h weekly × {Math.round(months * 4.33)} weeks ≈ {totalStudyHours}h of focused learning.
                </p>

                <div className="mt-5 max-h-[28rem] space-y-2 overflow-y-auto pr-1">
                  {planned.map((row, i) => {
                    const phase = career.phases.find((p) => p.id === row.phaseId);
                    const isReachable = i === 0 || planned.slice(0, i).every((r) => progress.state.completedPhases.includes(r.phaseId));
                    const done = progress.state.completedPhases.includes(row.phaseId);
                    return (
                      <div key={row.phaseId} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5">
                        <span className="w-16 shrink-0 text-[10px] font-black uppercase tracking-wide text-zinc-500">
                          Wk {row.startWeek}–{row.endWeek}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-white">{row.title}</p>
                          <p className="truncate text-[11px] text-zinc-500">{phase?.subtitle}</p>
                        </div>
                        <span
                          className={
                            'inline-grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[9px] font-black ' +
                            (done ? 'border-emerald-300/50 bg-emerald-400/15 text-emerald-300' : isReachable ? 'border-violet-300/40 text-violet-200' : 'border-white/[0.08] text-zinc-600')
                          }
                        >
                          {done ? '✓' : isReachable ? String(i + 1).padStart(2, '0') : '·'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <LogHours progress={progress} />
      </div>
    </section>
  );
}

const stepper = {
  Months({ value, onChange, max }: { value: number; onChange: (v: number) => void; max: number }) {
    return (
      <div className="flex items-center gap-2">
        <StepperBtn aria="minus months" onClick={() => onChange(Math.max(1, value - 1))}>
          –
        </StepperBtn>
        <span className="w-16 text-center text-sm font-black text-white">{value}m</span>
        <StepperBtn aria="plus months" onClick={() => onChange(Math.min(max, value + 1))}>
          +
        </StepperBtn>
        <input type="range" min={1} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="ml-2 flex-1 accent-violet-500" />
      </div>
    );
  },
};

function Hours({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <StepperBtn aria="minus hours" onClick={() => onChange(Math.max(2, value - 2))}>
        –
      </StepperBtn>
      <span className="w-16 text-center text-sm font-black text-white">{value}h/wk</span>
      <StepperBtn aria="plus hours" onClick={() => onChange(Math.min(25, value + 2))}>
        +
      </StepperBtn>
      <input type="range" min={2} max={25} step={2} value={value} onChange={(e) => onChange(Number(e.target.value))} className="ml-2 flex-1 accent-violet-500" />
    </div>
  );
}

function StepperBtn({ aria, onClick, children }: { aria: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={aria}
      onClick={onClick}
      className="inline-grid h-8 w-8 place-items-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-lg font-black text-zinc-300 transition hover:bg-white/[0.09] hover:text-white"
    >
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
      <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
        {icon} {label}
      </p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}

function LogHours({ progress }: { progress: CareerProgressApi }) {
  const [n, setN] = useState<number>(1);
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4">
      <p className="text-xs font-bold text-zinc-300">Logged study time: <span className="text-white">{progress.state.hours}h</span> · {progress.state.streak} day streak</p>
      <div className="ml-auto flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((v) => (
          <button key={v} type="button" onClick={() => setN(v)} className={`h-7 w-7 rounded-lg border text-xs font-black transition ${n === v ? 'border-violet-300/60 bg-violet-500/20 text-white' : 'border-white/[0.1] text-zinc-500 hover:text-zinc-200'}`}>
            {v}
          </button>
        ))}
        <button
          type="button"
          onClick={() => progress.addHours(n)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-violet-500"
        >
          <Plus className="h-3.5 w-3.5" /> {n}h
        </button>
      </div>
    </div>
  );
}