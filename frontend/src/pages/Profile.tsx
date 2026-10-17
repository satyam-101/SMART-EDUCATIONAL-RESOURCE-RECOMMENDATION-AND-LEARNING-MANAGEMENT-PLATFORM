import { useEffect, useState, useCallback } from 'react';
import { api } from '../api';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { LogOutIcon, SparklesIcon, CalendarIcon, RefreshCwIcon } from '../components/icons';
import { type User } from '../types';
import { Link } from 'react-router-dom';

export function Profile() {
  const { user: authUser, logout } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState<User | null>(authUser);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getProfile();
      if (res && res.user) {
        setProfile(res.user);
      }
    } catch (err) {
      console.warn('Failed to fetch profile from /api/profile, using cached context:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = () => {
    toast.info('You have been signed out.');
    logout();
  };

  const user = profile || authUser;

  if (loading && !user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-2xl shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-1/3 rounded" />
              <Skeleton className="h-4 w-1/4 rounded" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center text-zinc-400">
        <p>Please sign in to view your profile.</p>
        <Link to="/login" className="mt-4 inline-block">
          <Button size="sm">Sign In</Button>
        </Link>
      </div>
    );
  }

  const formattedJoinedDate = (user as any).createdAt
    ? new Date((user as any).createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : user.joinedAt || '2026';

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 shadow-card backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-violet-600 text-lg sm:text-xl font-extrabold text-white shadow-lg border border-violet-400/30 shrink-0">
              {user.initials || user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-100">{user.name}</h1>
                <span className="rounded-full bg-violet-600/20 px-2.5 py-0.5 text-xs font-semibold text-violet-300 border border-violet-500/30">
                  Learner Profile
                </span>
              </div>
              <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchProfile}
              className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white"
              title="Sync latest profile info"
            >
              <RefreshCwIcon className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-violet-400' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOutIcon className="h-3.5 w-3.5" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Profile Attributes */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 shadow-card">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
              <SparklesIcon className="h-3.5 w-3.5" /> Learning Goal
            </div>
            <p className="mt-2 text-sm font-semibold text-zinc-200">
              {user.learningGoal || user.goal || 'Not specified yet'}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 shadow-card">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
              Skill Level
            </div>
            <p className="mt-2 text-sm font-semibold text-zinc-200">
              {user.skillLevel || 'Beginner'}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 shadow-card">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interests & Focus
            </div>
            <p className="mt-2 text-sm font-semibold text-zinc-200">
              {Array.isArray(user.interests)
                ? user.interests.join(', ')
                : user.interests || 'General Technologies'}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-6 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5 text-violet-400" /> Member since {formattedJoinedDate}
          </span>
          <Link
            to="/onboarding"
            className="text-violet-400 hover:text-violet-300 transition font-medium flex items-center gap-1"
          >
            Update Learning Preferences →
          </Link>
        </div>
      </div>
    </div>
  );
}
