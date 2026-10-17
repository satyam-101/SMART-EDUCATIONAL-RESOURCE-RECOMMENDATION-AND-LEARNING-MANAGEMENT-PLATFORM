import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { type CourseRecommendation } from '../types';
import { SparklesIcon, ChevronRightIcon, BookOpenIcon, RefreshCwIcon } from '../components/icons';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { useToast } from '../context/ToastContext';

export function Recommendations() {
  const toast = useToast();
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecs = useCallback(async (isRefresh = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getRecommendations();
      const recs = data.recommendations || [];
      setRecommendations(recs);
      if (isRefresh) {
        toast.success('Recommendations refreshed with AI!');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to generate recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchRecs();
  }, [fetchRecs]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 sm:mb-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30 shadow-lg">
          <SparklesIcon className="h-7 w-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
          AI Course Recommendations
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
          Personalized curriculum matching your stated learning goals, skill level, and technology interests.
        </p>

        <div className="mt-4 flex justify-center gap-3">
          <Button
            size="sm"
            variant="outline"
            disabled={loading}
            onClick={() => fetchRecs(true)}
            className="border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:text-white"
          >
            <RefreshCwIcon className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-violet-400' : ''}`} />
            <span>Regenerate Picks</span>
          </Button>
          <Link to="/onboarding">
            <Button size="sm" variant="outline" className="border-zinc-700 bg-zinc-900 text-zinc-300">
              Update Goal
            </Button>
          </Link>
        </div>
      </div>

      {/* Loading state with skeletons */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-7 w-3/4 rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <div className="pt-4 border-t border-zinc-800 flex justify-between">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-8 w-32 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mx-auto max-w-md rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300">
          <p className="font-semibold">{error}</p>
          <Button
            onClick={() => fetchRecs(false)}
            className="mt-4 bg-red-600 hover:bg-red-500 text-white shadow-sm"
          >
            <RefreshCwIcon className="h-3.5 w-3.5" /> Try Again
          </Button>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {recommendations.map((rec) => (
            <div
              key={rec.courseId}
              className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-card transition duration-200 hover:border-violet-500/50 hover:bg-zinc-900"
            >
              <div>
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-600/15 px-3 py-1 text-xs font-semibold text-violet-300">
                  <SparklesIcon className="h-3.5 w-3.5" /> AI Recommended
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-100">{rec.title || rec.courseTitle}</h2>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">{rec.description}</p>
                <div className="mt-4 rounded-2xl border border-violet-900/40 bg-violet-950/20 p-4 text-xs text-violet-200">
                  <p className="font-semibold text-violet-300">Why this fits your goals:</p>
                  <p className="mt-1 leading-relaxed">{rec.reason}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <BookOpenIcon className="h-3.5 w-3.5 text-violet-400" /> Syllabus Included
                </span>
                <Link to={`/courses/${rec.courseId}`}>
                  <Button size="sm" className="shadow-sm">
                    View Course Details <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
            <BookOpenIcon className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-zinc-200">No Direct Matches Found</h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Currently we don't have a course strictly targeting this exact query, but you can explore our full catalogue or refine your goal.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/onboarding">
              <Button size="sm" variant="outline">
                Refine Goal
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">
                Explore Full Catalogue →
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link to="/explore" className="text-xs sm:text-sm text-zinc-400 hover:text-violet-400 transition">
          Or explore all available courses in the catalogue →
        </Link>
      </div>
    </div>
  );
}
