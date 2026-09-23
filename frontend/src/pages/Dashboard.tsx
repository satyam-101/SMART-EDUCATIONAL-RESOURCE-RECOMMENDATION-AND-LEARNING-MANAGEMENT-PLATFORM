import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { CalendarIcon, ChartIcon, ChevronRightIcon, FolderIcon, PlayIcon, PlusIcon, TargetIcon, TrophyIcon } from '../components/icons';
import { mockCourses, mockPlan, mockWeeklyActivity } from '../data';

export function Dashboard() {
  const { user } = useAuth();
  const name = user?.name ?? 'there';
  const first = name.split(' ')[0];
  const courses = mockCourses.slice(0, 3);
  const maxMinutes = Math.max(...mockWeeklyActivity.map((item) => item.minutes));

  return (
    <div className="mx-auto max-w-6xl py-2 sm:py-4">
      <header className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/60 px-5 py-6 shadow-card backdrop-blur-sm sm:px-7 sm:py-7">
        <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-violet-400">Welcome back</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-100">{first} 👋</h1>
          <p className="mt-1 text-sm text-zinc-400">Keep the momentum going — you are {user?.xp ?? 0} XP from your weekly goal.</p>
        </div>
        <Button className="shadow-md">
          <PlusIcon className="h-4 w-4" /> New project
        </Button>
        </div>
      </header>

      <section className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Current streak', value: `${user?.streak ?? 0} days`, Icon: TargetIcon, tint: 'text-orange-400' },
          { label: 'Total XP', value: (user?.xp ?? 0).toLocaleString(), Icon: TrophyIcon, tint: 'text-amber-400' },
          { label: 'Projects done', value: '12', Icon: FolderIcon, tint: 'text-emerald-400' },
          { label: 'Hours learned', value: '42h', Icon: ChartIcon, tint: 'text-sky-400' },
        ].map(({ label, value, Icon, tint }) => (
          <div key={label} className="group rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-4 shadow-card transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-zinc-900/80">
            <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] transition group-hover:scale-105', tint)}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-zinc-100">{value}</p>
            <p className="mt-1 text-xs font-medium text-zinc-400">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-[-0.02em] text-zinc-100">Continue learning</h2>
            <a href="/explore" className="inline-flex items-center gap-1 text-sm font-semibold text-violet-400 transition hover:text-violet-300">
              <span>See all</span>
              <ChevronRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-4 space-y-3">
            {courses.map((course) => (
              <a key={course.id} href={`/courses/${course.id}`} className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-4 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/35 hover:bg-zinc-900/80">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition group-hover:scale-105">
                  <PlayIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-zinc-100">{course.title}</p>
                  <p className="truncate text-sm text-zinc-400">{course.subtitle}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                    <span className="rounded-full bg-zinc-800 px-2 py-0.5">{course.category}</span>
                    <span>{course.level}</span>
                    <span>{course.rating.toFixed(1)} ★</span>
                  </div>
                </div>
                <div className="hidden text-right text-xs text-zinc-500 sm:block">
                  <p className="font-bold text-zinc-300">{Math.round((course.lessonsCount / 13) * 100)}%</p>
                  <p>{course.duration}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-[-0.02em] text-zinc-100">Weekly activity</h2>
          <div className="mt-4 rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-4 shadow-card">
            <div className="flex h-32 items-end justify-between gap-1">
              {mockWeeklyActivity.map((item) => (
                <div key={item.day} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-md bg-violet-500 transition-all duration-500" style={{ height: `${Math.max(8, (item.minutes / maxMinutes) * 100)}%` }} />
                  <span className="text-[10px] text-zinc-500">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="mt-6 text-lg font-bold tracking-[-0.02em] text-zinc-100">Up next</h2>
          <div className="mt-4 space-y-1 rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-3 shadow-card">
            {mockPlan.slice(0, 4).map((task) => (
              <div key={task.id} className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-white/[0.05]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300"><CalendarIcon className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-zinc-200">{task.title}</p>
                  <p className="text-xs text-zinc-500">{task.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
