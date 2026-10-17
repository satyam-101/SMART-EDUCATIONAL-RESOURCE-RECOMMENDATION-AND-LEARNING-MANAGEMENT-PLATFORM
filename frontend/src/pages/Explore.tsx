import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { SearchIcon, BookOpenIcon, ChevronRightIcon, RefreshCwIcon } from '../components/icons';
import { Reveal } from '../components/motion/Reveal';
import { motion } from 'framer-motion';
import { api } from '../api';
import { type ApiCourse } from '../types';
import { Link } from 'react-router-dom';

export function Explore() {
  const { user } = useAuth();
  const [savedCourseIds, setSavedCourseIds] = useLocalStorage<string[]>('zuno:savedCourses', []);
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCourses();
      setCourses(data || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load courses from the backend.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const filtered = courses.filter((course) => {
    return (
      !query.trim() ||
      `${course.title} ${course.description}`.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
      <Reveal className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/[0.08] bg-zinc-900/60 p-5 sm:p-7 shadow-card backdrop-blur-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Catalogue</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">Explore Courses</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">Discover curated topics and learning modules, {user?.name || 'Learner'}.</p>
        </div>
        <div className="relative w-full max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, technologies..."
            className="pl-9 text-xs sm:text-sm"
          />
        </div>
      </Reveal>

      {/* Error state */}
      {error && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
          <p>{error}</p>
          <Button
            size="sm"
            variant="outline"
            onClick={loadCourses}
            className="border-red-500/40 text-red-200 hover:bg-red-500/20"
          >
            <RefreshCwIcon className="h-3.5 w-3.5" /> Retry
          </Button>
        </div>
      )}

      {/* Loading state with skeletons */}
      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/[0.08] bg-zinc-900/60 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <div className="pt-4 border-t border-zinc-800 flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-8 w-28 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {filtered.map((course) => {
            const isSaved = savedCourseIds.includes(course.id);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-zinc-900/60 p-6 shadow-card transition duration-200 hover:border-violet-500/40 hover:bg-zinc-900/80"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/15 px-3 py-1 text-xs font-semibold text-violet-300">
                      <BookOpenIcon className="h-3.5 w-3.5" /> Course
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setSavedCourseIds((current) =>
                          current.includes(course.id)
                            ? current.filter((id) => id !== course.id)
                            : [...current, course.id]
                        )
                      }
                      className="text-xs font-medium text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      {isSaved ? '★ Saved' : '☆ Save'}
                    </button>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-zinc-100">{course.title}</h2>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{course.description}</p>
                  
                  {course.topics && course.topics.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Topics included ({course.topics.length}):</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {course.topics.map((t) => (
                          <span key={t.id} className="rounded-lg bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-300">
                            {t.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{course.topics?.length || 0} Modules</span>
                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-flex items-center gap-1 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition shadow-sm"
                  >
                    View Details <ChevronRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-10 text-center">
          <BookOpenIcon className="mx-auto h-10 w-10 text-zinc-600 mb-3" />
          <h3 className="text-base font-bold text-zinc-200">No courses match your search</h3>
          <p className="mt-1 text-xs text-zinc-400">Try searching for different keywords or clear your query.</p>
          {query && (
            <Button size="sm" variant="outline" onClick={() => setQuery('')} className="mt-4">
              Clear Search Query
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
