import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { AnimatedNumber } from '../components/motion/AnimatedNumber';
import { Reveal } from '../components/motion/Reveal';

const bars = [
  { label: "React Foundations", pct: 84 },
  { label: "TypeScript Essentials", pct: 62 },
  { label: "Data Structures", pct: 45 },
  { label: "Node & APIs", pct: 38 },
  { label: "UI Patterns", pct: 71 },
];

export function Progress() {
  return (
    <div className="mx-auto max-w-3xl py-2 sm:py-4">
      <Reveal>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Your learning signal</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-zinc-100">Your progress</h1>
      <p className="mt-1 text-sm text-zinc-500">Track streaks, XP and completion across every course.</p>
      </Reveal>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="surface-card p-4 text-center">
          <p className="text-2xl font-extrabold text-zinc-100"><AnimatedNumber value={14} /></p>
          <p className="text-xs text-zinc-500">Day streak</p>
        </div>
        <div className="surface-card p-4 text-center">
          <p className="text-2xl font-extrabold text-violet-400"><AnimatedNumber value={2840} /></p>
          <p className="text-xs text-zinc-500">Total XP</p>
        </div>
        <div className="surface-card p-4 text-center">
          <p className="text-2xl font-extrabold text-emerald-400"><AnimatedNumber value={58} suffix="%" /></p>
          <p className="text-xs text-zinc-500">Courses done</p>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-zinc-300">{b.label}</span>
              <span className="text-zinc-500">{b.pct}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full rounded-full bg-violet-500" style={{ width: b.pct + "%" }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/dashboard"><Button>Back to dashboard</Button></Link>
      </div>
    </div>
  );
}
