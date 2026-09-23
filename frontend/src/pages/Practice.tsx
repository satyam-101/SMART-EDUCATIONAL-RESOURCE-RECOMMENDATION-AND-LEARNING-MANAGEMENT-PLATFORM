import { mockPracticeSessions } from '../data';

export function Practice() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-violet-400">Practice lab</p>
          <h1 className="mt-1 text-3xl font-bold text-zinc-100">Sharpen your skills</h1>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {mockPracticeSessions.map((session) => (
          <div key={session.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-violet-600/15 px-2 py-1 text-xs font-medium text-violet-300">
                {session.category}
              </span>
              <span className="text-xs text-zinc-500">{session.time}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-zinc-100">{session.title}</h2>
            <p className="mt-1 text-sm text-zinc-400">{session.topic}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
              <span>{session.difficulty}</span>
              <span>{session.bestScore}/{session.total} best</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-[70%] rounded-full bg-violet-500" />
            </div>
            <button className="mt-5 w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
              Start session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
