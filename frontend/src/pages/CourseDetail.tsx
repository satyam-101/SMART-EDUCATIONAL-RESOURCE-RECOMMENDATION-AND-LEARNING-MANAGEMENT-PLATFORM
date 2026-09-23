import { useParams, Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { StarIcon, UsersIcon, ClockIcon, PlayIcon, CheckIcon, BookmarkIcon, ChevronDownIcon } from '../components/icons';
import { mockCourses } from '../data';

export function CourseDetail() {
  const { id } = useParams();
  const course = mockCourses.find((c) => c.id === id) ?? mockCourses[0];
  const [savedIds, setSavedIds] = useLocalStorage<string[]>('zuno:saved', []);
  const [open, setOpen] = useLocalStorage<string[]>(`zuno:open:${course.id}`, []);
  const saved = savedIds.includes(course.id);
  const i = course.instructor;

  const toggleSave = () => setSavedIds(saved ? savedIds.filter((x) => x !== course.id) : [...savedIds, course.id]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="on-accent overflow-hidden rounded-3xl bg-violet-600 p-10 text-white">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/70">
          <span>{course.category}</span> <span className="text-white/40">•</span> <span>{course.level}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold">{course.title}</h1>
        <p className="mt-2 max-w-2xl text-white/85">{course.subtitle}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-1"><StarIcon className="h-4 w-4 text-amber-300" /> {course.rating.toFixed(1)} ({course.reviews.toLocaleString()} reviews)</span>
          <span className="flex items-center gap-1"><UsersIcon className="h-4 w-4" /> {course.students.toLocaleString()} students</span>
          <span className="flex items-center gap-1"><ClockIcon className="h-4 w-4" /> {course.duration}</span>
          <span className="flex items-center gap-1"><PlayIcon className="h-4 w-4" /> {course.lessonsCount} lessons</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100"><PlayIcon className="h-4 w-4" /> Enroll now</Button>
          <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" onClick={toggleSave}>
            <BookmarkIcon className={cn('h-4 w-4', saved && 'fill-white')} /> {saved ? 'Saved' : 'Save'}
          </Button>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-sm font-bold">{i.initials}</div>
          <div>
            <p className="text-sm font-semibold">{i.name}</p>
            <p className="text-xs text-white/70">{i.role}</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-zinc-100">About this course</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{course.about}</p>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-zinc-100">Syllabus</h2>
        <div className="mt-4 space-y-3">
          {course.modules.map((m, mi) => {
            const isOpen = open.includes(m.id);
            return (
              <div key={m.id} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
                <button
                  onClick={() => setOpen(isOpen ? open.filter((x) => x !== m.id) : [...open, m.id])}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-300">{mi + 1}</span>
                    <span className="font-medium text-zinc-100">{m.title}</span>
                  </span>
                  <ChevronDownIcon className={cn('h-5 w-5 text-zinc-500 transition', isOpen && 'rotate-180')} />
                </button>
                {isOpen && (
                  <ul className="space-y-1 px-5 pb-4">
                    {m.lessons.map((l) => (
                      <li key={l.id} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-zinc-800/60">
                        {l.completed ? (
                          <CheckIcon className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <PlayIcon className="h-4 w-4 text-zinc-500" />
                        )}
                        <span className="flex-1 text-zinc-300">{l.title}</span>
                        <span className="text-xs text-zinc-500">{l.duration}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link to={`/courses/${course.id}/learn`}>
          <Button size="lg"><PlayIcon className="h-4 w-4" /> Start learning</Button>
        </Link>
      </div>
    </div>
  );
}