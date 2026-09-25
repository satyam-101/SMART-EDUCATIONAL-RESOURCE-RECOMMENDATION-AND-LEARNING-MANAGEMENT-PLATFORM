import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Input } from '../components/ui/Input';
import { SearchIcon, BookOpenIcon, ChevronRightIcon } from '../components/icons';
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

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await api.getCourses();
        setCourses(data);
      } catch (err) {
        console.error('Failed to load courses from backend:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const filtered = courses.filter((course) => {
    return (
      !query.trim() ||
      `${course.title} ${course.description}`.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="mx-auto max-w-6xl py-2 sm:py-4">
      <Reveal className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/[0.08] bg-zinc-900/60 px-5 py-6 shadow-card backdrop-blur-sm sm:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Catalogue</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-zinc-100">Explore Courses</h1>
          <p className="mt-1 text-sm text-zinc-400">Discover what to learn next, {user?.name || 'Learner'}.</p>
        </div>
        <div className="relative w-full max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, programming languages..."
            className="pl-9"
          />
        </div>
      </Reveal>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
          <p className="text-sm text-zinc-400">Loading course catalogue...</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filtered.map((course) => {
            const isSaved = savedCourseIds.includes(course.id);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-zinc-900/60 p-6 shadow-card transition duration-300 hover:border-violet-500/40 hover:bg-zinc-900/80"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/15 px-3 py-1 text-xs font-semibold text-violet-300">
                      <BookOpenIcon className="h-3.5 w-3.5" /> Course
                    </span>
                    <button
                      onClick={() =>
                        setSavedCourseIds((current) =>
                          current.includes(course.id)
                            ? current.filter((id) => id !== course.id)
                            : [...current, course.id]
                        )
                      }
                      className="text-xs font-medium text-zinc-400 hover:text-white"
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
                    className="inline-flex items-center gap-1 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition"
                  >
                    View Details <ChevronRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-zinc-500">No courses match your search.</p>
      )}
    </div>
  );
}
