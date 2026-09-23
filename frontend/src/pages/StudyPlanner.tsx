import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { CheckIcon, ClockIcon, PlusIcon } from '../components/icons';
import { mockPlan } from '../data';

const typeColor: Record<string, string> = {
  course: 'bg-violet-500/15 text-violet-200',
  practice: 'bg-emerald-500/15 text-emerald-200',
  quiz: 'bg-amber-500/15 text-amber-200',
  review: 'bg-sky-500/15 text-sky-200',
  project: 'bg-fuchsia-500/15 text-fuchsia-200',
};

export function StudyPlanner() {
  const [done, setDone] = useLocalStorage<string[]>('zuno:done', []);
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);

  const days = Array.from(new Set(mockPlan.map((task) => task.date))).sort();

  const toggle = (id: string) => {
    setDone((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const add = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTitle('');
  };

  const pending = mockPlan.filter((task) => !done.includes(task.id));

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Study Planner</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {pending.length} task{pending.length === 1 ? '' : 's'} left this week — you got this.
          </p>
        </div>
        <Button onClick={() => setShow((value) => !value)}>
          <PlusIcon className="h-4 w-4" /> Add
        </Button>
      </div>

      {show && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            add();
            setShow(false);
          }}
          className="mt-5 flex gap-3"
        >
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="New task, e.g. Finish React Hooks module"
            className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-violet-500"
          />
          <Button type="submit">Add task</Button>
        </form>
      )}

      <div className="mt-6 space-y-8">
        {days.map((day) => {
          const tasks = mockPlan.filter((task) => task.date === day);
          return (
            <div key={day}>
              <h2 className="text-sm font-semibold text-zinc-300">
                {new Date(day).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </h2>
              <div className="mt-3 space-y-2">
                {tasks.map((task) => {
                  const isDone = done.includes(task.id);
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggle(task.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-left transition hover:border-zinc-700',
                        isDone && 'opacity-60'
                      )}
                    >
                      <span className={cn('flex h-5 w-5 items-center justify-center rounded-full border transition', isDone ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-zinc-600')}>
                        {isDone && <CheckIcon className="h-3 w-3" />}
                      </span>
                      <span className={cn('flex-1 text-sm', isDone ? 'text-zinc-500 line-through' : 'text-zinc-200')}>
                        {task.title}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <ClockIcon className="h-3 w-3" />
                        {task.duration}
                      </span>
                      <span className={cn('rounded-full px-2 py-0.5 text-[11px]', typeColor[task.type])}>{task.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}