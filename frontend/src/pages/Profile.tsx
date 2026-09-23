import { useAuth } from '../hooks/useAuth';

export function Profile() {
  const { user } = useAuth();

  if (!user) return <div className="px-6 py-16 text-center text-zinc-400">Please sign in to view your profile.</div>;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
            {user.initials || user.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">{user.name}</h1>
            <p className="text-sm text-zinc-400">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">XP</p>
            <p className="mt-2 text-2xl font-bold text-zinc-100">{user.xp}</p>
          </div>
          <div className="rounded-2xl bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Streak</p>
            <p className="mt-2 text-2xl font-bold text-zinc-100">{user.streak} days</p>
          </div>
          <div className="rounded-2xl bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Rank</p>
            <p className="mt-2 text-2xl font-bold text-zinc-100">{user.rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
