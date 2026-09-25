import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { type CourseRecommendation } from '../types';
import { SparklesIcon, ChevronRightIcon, BookOpenIcon } from '../components/icons';
import { Button } from '../components/ui/Button';

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchRecs() {
      try {
        const data = await api.getRecommendations();
        setRecommendations(data.recommendations || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recommendations');
      } finally {
        setLoading(false);
      }
    }

    fetchRecs();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
          <SparklesIcon className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-100">AI Course Recommendations</h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-lg mx-auto">
          Based on your learning goals, skill level, and interests, our AI recommends the following courses:
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
          <p className="text-sm text-zinc-400">Analyzing your profile with AI...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {recommendations.map((rec) => (
            <div
              key={rec.courseId}
              className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-card transition duration-300 hover:border-violet-500/50 hover:bg-zinc-900"
            >
              <div>
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-600/15 px-3 py-1 text-xs font-semibold text-violet-300">
                  <SparklesIcon className="h-3.5 w-3.5" /> AI Pick
                </div>
                <h2 className="text-xl font-bold text-zinc-100">{rec.title || rec.courseTitle}</h2>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{rec.description}</p>
                <div className="mt-4 rounded-2xl border border-violet-900/40 bg-violet-950/20 p-4 text-xs text-violet-200">
                  <p className="font-semibold text-violet-300">Why recommended:</p>
                  <p className="mt-1">{rec.reason}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <BookOpenIcon className="h-4 w-4 text-violet-400" /> Fixed Catalogue
                </span>
                <Link to={`/courses/${rec.courseId}`}>
                  <Button size="sm">
                    View Course Details <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link to="/explore" className="text-sm text-zinc-400 hover:text-violet-400">
          Or explore all available courses →
        </Link>
      </div>
    </div>
  );
}
