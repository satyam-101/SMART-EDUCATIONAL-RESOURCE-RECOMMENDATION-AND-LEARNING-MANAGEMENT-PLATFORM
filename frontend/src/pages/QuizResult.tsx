import { useLocation, Link } from "react-router-dom";
import { TrophyIcon, CheckIcon, ClockIcon } from "../components/icons";

export function QuizResult() {
  const { state } = useLocation() as { state?: { correct?: number; total?: number } };
  const correct = state?.correct ?? 0;
  const total = state?.total ?? 40;
  const pct = Math.round((correct / total) * 100);
  const pass = pct >= 70;

  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-600">
        <TrophyIcon className="h-9 w-9 text-white" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-zinc-100">{pass ? "Quiz complete!" : "Keep practicing"}</h1>
      <p className="mt-2 text-sm text-zinc-400">{pass ? "Nice work, you are nailing this topic." : "You are close, review the topic and try again."}</p>

      <div className="mx-auto mt-9 flex max-w-xs items-center justify-center gap-1.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={i < Math.round((pct / 100) * 10) ? "h-2 w-7 rounded-full bg-violet-500" : "h-2 w-7 rounded-full bg-zinc-800"} />
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
        <p className="text-5xl font-black text-zinc-100">{pct}<span className="text-2xl text-zinc-500">%</span></p>
        <p className="mt-1 text-sm text-zinc-400">{correct} of {total} correct</p>
        {pass && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-medium text-emerald-300">
            <CheckIcon className="h-3.5 w-3.5" /> +120 XP earned
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Link to="/progress" className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">View progress</Link>
        <Link to="/explore" className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:border-zinc-500">More courses</Link>
      </div>
      <p className="mt-8 flex items-center justify-center gap-1 text-xs text-zinc-600"><ClockIcon className="h-3.5 w-3.5" /> Results saved automatically to your progress</p>
    </div>
  );
}