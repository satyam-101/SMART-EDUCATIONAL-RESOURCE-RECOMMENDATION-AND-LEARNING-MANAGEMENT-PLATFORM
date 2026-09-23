import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn, initialsOf } from '../lib/utils';
import { Input } from '../components/ui/Input';
import { SearchIcon } from '../components/icons';
import { mockCourses } from '../data';
import { CourseCard } from '../components/courses/CourseCard';
import { Reveal } from '../components/motion/Reveal';
import { AnimatePresence, motion } from 'framer-motion';

export function Explore() {
  const { user } = useAuth();
  const [savedCourseIds, setSavedCourseIds] = useLocalStorage<string[]>('zuno:savedCourses', []);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockCourses.map((course) => course.category)))];
  const filtered = mockCourses.filter((course) => {
    const matchesCategory = category === 'All' || course.category === category;
    const matchesQuery =
      !query.trim() ||
      `${course.title} ${course.subtitle} ${course.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-6xl py-2 sm:py-4">
      <Reveal className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/[0.08] bg-zinc-900/60 px-5 py-6 shadow-card backdrop-blur-sm sm:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Find your next skill</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-zinc-100">Explore courses</h1>
          <p className="mt-1 text-sm text-zinc-400">Discover what to learn next, {initialsOf(user?.name ?? 'there')}.</p>
        </div>
        <div className="relative w-full max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search skills, topics, tools…" className="pl-9" />
        </div>
      </Reveal>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={cn(
              'relative overflow-hidden rounded-full border border-white/[0.08] px-3.5 py-1.5 text-sm font-semibold transition',
              category === item ? 'text-white' : 'bg-zinc-900/60 text-zinc-300 hover:bg-white/[0.08]'
            )}
          >
            {category === item && <motion.span layoutId="course-filter" className="absolute inset-0 -z-10 rounded-full bg-violet-600" transition={{ type: 'spring', stiffness: 300, damping: 28 }} />}
            <span className="relative">{item}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
        {filtered.map((course, index) => {
          const saved = savedCourseIds.includes(course.id);
          return (
            <motion.div key={course.id} layout initial={{ opacity: 0, y: 24 + index * 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.16 } }} transition={{ type: 'spring', stiffness: 260, damping: 24, delay: index * 0.045 }}>
              <CourseCard course={course} saved={saved} onToggleSaved={() => setSavedCourseIds((current) => current.includes(course.id) ? current.filter((id) => id !== course.id) : [...current, course.id])} />
            </motion.div>
          );
        })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && <p className="mt-10 text-center text-sm text-zinc-500">No courses match your search.</p>}
    </div>
  );
}
