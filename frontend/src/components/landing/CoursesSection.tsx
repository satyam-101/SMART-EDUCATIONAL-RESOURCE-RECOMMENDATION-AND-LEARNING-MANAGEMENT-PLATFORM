import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { mockCourses } from '../../data';
import { CourseCard } from '../courses/CourseCard';
import { Reveal } from '../motion/Reveal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { cn } from '../../lib/utils';
import { duration, ease } from '../../config/motionConfig';

/**
 * COURSES — "Courses that build real skills".
 * Filtering is a soft swap, not a reload: the layout glides, old cards
 * collapse toward the centre, new cards settle in from a slight overshoot.
 * Cards themselves are the signature tilt + travelling-square interaction.
 */
export function CoursesSection() {
  const [active, setActive] = useState('All');
  const [saved, setSaved] = useLocalStorage<string[]>('zuno:savedCourses', []);

  const categories = ['All', ...Array.from(new Set(mockCourses.map((c) => c.category)))];
  const courses = mockCourses.filter((c) => active === 'All' || c.category === active).slice(0, 6);

  const toggleSave = (id: string) => setSaved(saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id]);

  return (
    <section id="courses" className="relative py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="section-label">Curated by ZUNO AI</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-zinc-100 sm:text-4xl">
                Courses that build real skills
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
                Structured paths from beginner to advanced — each one explains the{' '}
                <em className="not-italic text-violet-300">why</em>, not just the how.
              </p>
            </div>
            <Link
              to="/explore"
              className="group inline-flex items-center gap-1.5 rounded-xl border border-white/[0.09] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-violet-400/45 hover:text-white"
            >
              Explore all
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActive(item)}
              className={cn(
                'relative rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-300',
                active === item ? 'text-[#fff]' : 'text-zinc-400 hover:text-zinc-200',
              )}
            >
              {active === item && (
                <motion.span
                  layoutId="landing-filter"
                  className="absolute inset-0 rounded-full bg-violet-600"
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                />
              )}
              <span className="relative">{item}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 40 + i * 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.93, filter: 'blur(4px)' }}
                transition={{ duration: duration.emphasis, ease: ease.out, layout: { duration: 0.55, ease: ease.out } }}
                style={{ willChange: 'transform, opacity' }}
              >
                <CourseCard course={course} saved={saved.includes(course.id)} onToggleSaved={() => toggleSave(course.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-12 flex items-center justify-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          <span className="h-px w-8 bg-violet-400/60" />
          <span className={cn('inline-flex items-center gap-1.5', active !== 'All' && 'text-violet-300')}>
            {courses.length} courses in {active}
          </span>
          <span className="h-px w-8 bg-violet-400/60" />
        </p>
      </div>
    </section>
  );
}