import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';
import { PlayIcon, CheckIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/icons';
import { mockCourses } from '../data';

export function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const { user } = useAuth();
  const course = mockCourses.find((c) => c.id === courseId) ?? mockCourses[0];
  const lessons = course.modules.flatMap((m) => m.lessons);
  const idx = Math.max(0, lessons.findIndex((l) => l.id === lessonId));
  const lesson = lessons[idx];
  const first = (user?.name ?? "Learner").split(" ")[0];

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="flex items-center justify-between">
        <Link to={`/courses/${course.id}`} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-violet-300">
          <ChevronLeftIcon className="h-4 w-4" /> {course.title}
        </Link>
        <div className="flex items-center gap-1 text-sm text-zinc-400"><ClockIcon className="h-4 w-4" /> {lesson.duration}</div>
      </div>

      <div className="mt-6 aspect-video w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-zinc-900">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-white">
            <PlayIcon className="h-7 w-7" />
          </div>
          <p className="text-sm text-zinc-400">Lesson {idx + 1} of {lessons.length} — {lesson.title}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_240px]">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">{lesson.title}</h1>
          <p className="mt-3 leading-7 text-zinc-400">
            In this lesson, {first}, we break the topic into small pieces: the idea, a worked example,
            and a quick self-check. Watch the video above, then read the summary below.
          </p>
          <div className="mt-5 rounded-2xl border border-violet-900/40 bg-violet-950/20 p-4 text-sm text-violet-200">
            <p className="font-semibold text-violet-300">Tip</p>
            <p className="mt-1">Active recall beats re-reading. After the video, close it and explain the idea out loud.</p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            {idx > 0 ? (
              <Link to={`/courses/${course.id}/lesson/${lessons[idx - 1].id}`} className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300"><ChevronLeftIcon className="h-4 w-4" /> Prev</Link>
            ) : <span />}
            {idx < lessons.length - 1 ? (
              <Link to={`/courses/${course.id}/lesson/${lessons[idx + 1].id}`} className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300">Next <ChevronRightIcon className="h-4 w-4" /></Link>
            ) : (
              <Link to={`/quiz/${course.id}`} className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"><CheckIcon className="h-4 w-4" /> Finish course</Link>
            )}
          </div>
        </div>

        <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Lessons</p>
          <div className="mt-3 space-y-1">
            {lessons.map((l, i) => (
              <Link key={l.id} to={`/courses/${course.id}/lesson/${l.id}`} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm", i === idx ? "bg-violet-600/15 text-violet-200" : "text-zinc-400 hover:bg-zinc-800")}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-[10px]">{i + 1}</span>
                <span className="flex-1 truncate">{l.title}</span>
                {l.completed && <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
