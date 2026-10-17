import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { type CourseProgressData } from '../types';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { Reveal } from '../components/motion/Reveal';
import { RefreshCwIcon, BookOpenIcon } from '../components/icons';

export function Progress() {
  const [courseProgress, setCourseProgress] = useState<CourseProgressData[]>([]);
  const [topicProgress, setTopicProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProgress = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [cProgress, tProgress] = await Promise.all([
        api.getCourseProgress(),
        api.getProgress(),
      ]);
      setCourseProgress(cProgress || []);
      setTopicProgress(tProgress || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load progress data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const totalCompletedTopics = topicProgress.filter((p) => p.completed).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-4 sm:py-6">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Learning Analytics</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">Course Progress</h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Track your completed topics, quiz performances, and syllabus mastery across the curriculum.
        </p>
      </Reveal>

      {/* Error state */}
      {error && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs sm:text-sm text-red-300">
          <p>{error}</p>
          <Button size="sm" variant="outline" onClick={loadProgress} className="border-red-500/40 text-red-200">
            <RefreshCwIcon className="h-3.5 w-3.5" /> Retry
          </Button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
        {loading ? (
          <>
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </>
        ) : (
          <>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 text-center shadow-card">
              <p className="text-2xl sm:text-3xl font-extrabold text-violet-400">{totalCompletedTopics}</p>
              <p className="mt-1 text-xs font-medium text-zinc-400">Completed Topics</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 text-center shadow-card">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{courseProgress.length}</p>
              <p className="mt-1 text-xs font-medium text-zinc-400">Enrolled Courses</p>
            </div>
          </>
        )}
      </div>

      {/* Course-wise Progress Bars */}
      <div className="mt-8">
        <h2 className="text-base sm:text-lg font-bold text-zinc-100">Course Breakdown</h2>

        {loading ? (
          <div className="mt-4 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/3 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
                <Skeleton className="h-3 w-full rounded-full" />
              </div>
            ))}
          </div>
        ) : courseProgress.length === 0 ? (
          <div className="mt-4 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 text-center text-zinc-400">
            <BookOpenIcon className="mx-auto h-8 w-8 text-zinc-600 mb-2" />
            <p className="text-sm font-semibold text-zinc-300">No course progress recorded yet</p>
            <p className="text-xs text-zinc-500 mt-1">Start watching topic lessons and completing quizzes to see your metrics.</p>
            <Link to="/explore" className="mt-4 inline-block">
              <Button size="sm">Explore Courses</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {courseProgress.map((cp) => (
              <div
                key={cp.courseId}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 shadow-card transition duration-200 hover:border-violet-500/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                  <span className="font-bold text-zinc-100">{cp.courseTitle}</span>
                  <span className="text-xs font-semibold text-violet-300">
                    {cp.completedTopics} / {cp.totalTopics} topics ({cp.percentage}%)
                  </span>
                </div>

                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, cp.percentage)}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-mono text-[11px]">
                    {Array.from({ length: 10 })
                      .map((_, i) => (i < Math.round((cp.percentage / 100) * 10) ? '█' : '░'))
                      .join('')}{' '}
                    {cp.percentage}%
                  </span>
                  <Link
                    to={`/courses/${cp.courseId}`}
                    className="font-semibold text-violet-400 hover:text-violet-300 transition"
                  >
                    View Course →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Link to="/dashboard">
          <Button variant="outline" className="border-zinc-700 bg-zinc-900 text-zinc-200">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
