import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useTilt } from '../../hooks/useTilt';
import { BookmarkIcon, ChevronRightIcon, ClockIcon, StarIcon, UsersIcon } from '../icons';
import { type Course } from '../../types';

interface CourseCardProps {
  course: Course;
  saved: boolean;
  onToggleSaved: () => void;
}

export function CourseCard({ course, saved, onToggleSaved }: CourseCardProps) {
  const tilt = useTilt(3.5);

  return (
    <article
      data-cursor-label="OPEN"
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/65 shadow-card transition-[border-color,box-shadow,background-color] duration-300 hover:border-violet-400/45 hover:bg-zinc-900/90 hover:shadow-lg"
      {...tilt}
    >
      <span className="pointer-events-none absolute -right-3 -top-3 z-10 h-10 w-10 rounded-xl border border-violet-300/50 opacity-0 transition duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-100" />
      <Link to={`/courses/${course.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-300">
        <div className="relative h-36 overflow-hidden bg-violet-600/30">
          <img src={course.thumbnailUrl} alt="" loading="lazy" className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-110 group-hover:opacity-95" />
          <div className="absolute inset-0 bg-zinc-950/50" />
          <span className="absolute bottom-3 left-4 rounded-full border border-white/[0.14] bg-zinc-950/55 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">{course.level}</span>
        </div>
        <div className="p-4 transition-transform duration-300 group-hover:translate-x-1">
          <div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-violet-300">{course.category}</span><span className="inline-flex items-center gap-1 text-xs text-amber-300"><StarIcon className="h-3.5 w-3.5 fill-current" /> {course.rating.toFixed(1)}</span></div>
          <h3 className="mt-2 font-bold text-zinc-100 transition group-hover:text-violet-200">{course.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-400">{course.subtitle}</p>
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full w-[64%] rounded-full bg-violet-500 transition-all duration-500 group-hover:w-[78%]" /></div>
          <div className="mt-3 flex items-center justify-between text-xs text-zinc-500"><span className="flex items-center gap-1"><UsersIcon className="h-3.5 w-3.5" /> {(course.students / 1000).toFixed(1)}k</span><span className="flex items-center gap-1"><ClockIcon className="h-3.5 w-3.5" /> {course.duration}</span><span className="flex items-center gap-0.5 font-bold text-zinc-300">View <ChevronRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></div>
        </div>
      </Link>
      <button type="button" onClick={onToggleSaved} className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-lg border border-white/[0.12] bg-zinc-950/60 text-zinc-300 backdrop-blur transition hover:scale-105 hover:border-violet-300/50 hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300" aria-label={saved ? 'Remove from saved courses' : 'Save course'}>
        <BookmarkIcon className={cn('h-4 w-4', saved && 'fill-violet-400 text-violet-300')} />
      </button>
    </article>
  );
}
