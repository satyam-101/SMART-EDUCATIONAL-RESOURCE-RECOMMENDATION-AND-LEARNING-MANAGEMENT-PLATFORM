import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { SparklesIcon, BookOpenIcon, ChevronRightIcon, RefreshCwIcon } from '../components/icons';

export function Dashboard() {
  const { user } = useAuth();
  const toast = useToast();
  const [dashData, setDashData] = useState<{
    user: any;
    progress: any[];
    recentAttempts: any[];
  } | null>(null);

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const [dash, cList] = await Promise.all([
        api.getDashboard().catch((e) => {
          console.warn('Dashboard fetch error:', e);
          return null;
        }),
        api.getCourses().catch((e) => {
          console.warn('Courses fetch error:', e);
          return [];
        }),
      ]);

      if (dash) {
        setDashData(dash);
      }
      setCourses(cList || []);

      if (!dash && (!cList || cList.length === 0)) {
        setError('Unable to load full dashboard data. Please check connection and try again.');
      } else if (isRefresh) {
        toast.success('Dashboard refreshed successfully');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load dashboard. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [toast]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const name = user?.name || dashData?.user?.name || 'Learner';
  const first = name.split(' ')[0];
  const progressList = dashData?.progress || [];
  const recentAttempts = dashData?.recentAttempts || [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
      {/* Welcome Banner */}
      <header className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/60 p-6 sm:p-8 shadow-card backdrop-blur-sm">
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/20 px-3 py-1 text-xs font-semibold text-violet-300 border border-violet-500/30">
              <SparklesIcon className="h-3.5 w-3.5" /> AI Learning LMS
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
              Welcome back, {first}! 👋
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
              Goal:{' '}
              <span className="text-zinc-200 font-medium">
                {user?.learningGoal || dashData?.user?.learningGoal || 'Personalized Full Stack Pathway'}
              </span>{' '}
              • Level:{' '}
              <span className="text-zinc-200 font-medium">
                {user?.skillLevel || dashData?.user?.skillLevel || 'Beginner'}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadDashboard(true)}
              disabled={refreshing || loading}
              className="border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:text-white"
              title="Refresh dashboard data"
            >
              <RefreshCwIcon className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-violet-400' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Link to="/onboarding">
              <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 text-zinc-200">
                Preferences
              </Button>
            </Link>
            <Link to="/recommendations">
              <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white shadow-md">
                <SparklesIcon className="h-3.5 w-3.5" /> AI Recommendations
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Recoverable Error Banner */}
      {error && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          <p>{error}</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => loadDashboard()}
            className="border-red-500/40 text-red-200 hover:bg-red-500/20"
          >
            Retry Loading
          </Button>
        </div>
      )}

      {/* Stats Cards */}
      <section className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-5">
              <Skeleton className="h-8 w-16 mb-2 rounded-lg" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          ))
        ) : (
          [
            { label: 'Topics Completed', value: progressList.filter((p) => p.completed).length, tint: 'text-emerald-400' },
            { label: 'Available Courses', value: courses.length, tint: 'text-violet-400' },
            { label: 'Quiz Attempts', value: recentAttempts.length, tint: 'text-amber-400' },
            { label: 'Skill Level', value: user?.skillLevel || 'Beginner', tint: 'text-sky-400' },
          ].map(({ label, value, tint }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-4 sm:p-5 shadow-card transition duration-200 hover:border-violet-400/30"
            >
              <p className={`text-xl sm:text-2xl font-extrabold ${tint}`}>{value}</p>
              <p className="mt-1 text-xs font-medium text-zinc-400">{label}</p>
            </div>
          ))
        )}
      </section>

      {/* Dashboard Main Grid */}
      <section className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Course Catalogue */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-zinc-100">Course Catalogue</h2>
              <Link to="/explore" className="text-xs sm:text-sm font-semibold text-violet-400 hover:text-violet-300 transition">
                Explore All →
              </Link>
            </div>

            {loading ? (
              <div className="mt-4 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-4">
                    <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-1/3 rounded" />
                      <Skeleton className="h-3 w-3/4 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center text-sm text-zinc-400">
                <p>No courses found in the catalogue.</p>
                <Button size="sm" onClick={() => loadDashboard()} className="mt-3">
                  Reload Courses
                </Button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {courses.slice(0, 5).map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-4 sm:p-5 shadow-card transition duration-200 hover:border-violet-500/40 hover:bg-zinc-900/90"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition group-hover:scale-105">
                        <BookOpenIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-violet-300 transition truncate">
                          {course.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{course.description}</p>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 shrink-0 text-zinc-500 group-hover:text-white transition ml-2" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Recent Quiz Attempts & Quick Links */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-100">Recent Quiz Attempts</h2>
            <div className="mt-4 space-y-3">
              {loading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
                    <Skeleton className="h-4 w-1/2 rounded" />
                    <Skeleton className="h-3 w-1/3 rounded" />
                  </div>
                ))
              ) : recentAttempts.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-center text-xs text-zinc-400">
                  <p>No quiz attempts yet.</p>
                  <p className="mt-1 text-zinc-500">Pick any course topic to test your knowledge.</p>
                </div>
              ) : (
                recentAttempts.slice(0, 4).map((att) => (
                  <div key={att.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-card">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-zinc-200 truncate">
                        {att.quiz?.title || att.quiz?.topic?.title || 'Topic Quiz'}
                      </span>
                      <span className="rounded-full bg-violet-600/20 px-2.5 py-0.5 text-xs font-bold text-violet-300 shrink-0">
                        {att.percentage}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
                      <span>Score: {att.score}/{att.totalQuestions}</span>
                      <span>Attempt #{att.attemptNumber}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-950/20 p-5">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <SparklesIcon className="h-4 w-4 text-violet-400" /> AI Adaptive Flow
            </h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Complete onboarding to get personalized course picks, then take topic quizzes to get adaptive performance recommendations.
            </p>
            <div className="mt-4">
              <Link to="/recommendations">
                <Button size="sm" className="w-full bg-violet-600 text-white hover:bg-violet-500">
                  View Recommendations →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
