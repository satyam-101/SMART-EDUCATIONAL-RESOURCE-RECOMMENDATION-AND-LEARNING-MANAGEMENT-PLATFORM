import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { LogOutIcon } from '../components/icons';

export function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <div className="px-6 py-16 text-center text-zinc-400">Please sign in to view your profile.</div>;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white shadow-lg">
              {user.initials || user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-100">{user.name}</h1>
              <p className="text-sm text-zinc-400">{user.email}</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={logout}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOutIcon className="h-4 w-4" /> Sign Out
          </Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Learning Goal</p>
            <p className="mt-2 text-sm font-semibold text-zinc-200">{user.learningGoal || 'Not specified'}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Skill Level</p>
            <p className="mt-2 text-sm font-semibold text-zinc-200">{user.skillLevel || 'Beginner'}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Interests</p>
            <p className="mt-2 text-sm font-semibold text-zinc-200">
              {Array.isArray(user.interests) ? user.interests.join(', ') : user.interests || 'General'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
