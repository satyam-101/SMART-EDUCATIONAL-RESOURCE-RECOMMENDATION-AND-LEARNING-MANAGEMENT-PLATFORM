import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { mockQuizzes } from '../data';
import { CheckIcon, ClockIcon } from '../components/icons';

type Question = { id: string; text: string; options: string[]; correctAnswer: number; explanation: string };
type Quiz = { id: string; courseId: string; title: string; description: string; timeLimit: number; questions: Question[] };

export function QuizPage() {
  const { id } = useParams();
  const quiz = mockQuizzes.find((q) => q.id === id) as Quiz | undefined;
  const [cur, setCur] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  if (!quiz) return <div className="px-6 py-16 text-center text-zinc-400">Quiz not found</div>;

  const q = quiz.questions[cur];
  const isLast = cur === quiz.questions.length - 1;
  const correctCount = answers.filter((answer, index) => answer === quiz.questions[index]?.correctAnswer).length;

  const pick = (index: number) => {
    setPicked(index);
    const next = [...answers];
    next[cur] = index;
    setAnswers(next);
  };

  const next = () => {
    setCur((current) => current + 1);
    setPicked(null);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-violet-400">Quiz</p>
          <h1 className="mt-1 text-xl font-bold text-zinc-100">{quiz.title}</h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300">
          <ClockIcon className="h-4 w-4 text-violet-400" /> {quiz.timeLimit} min
        </div>
      </div>

      <div className="mt-5 flex gap-1.5">
        {quiz.questions.map((_, index) => (
          <div key={index} className={cn('h-1.5 flex-1 rounded-full', index <= cur ? 'bg-violet-500' : 'bg-zinc-800')} />
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
        <p className="text-sm text-zinc-400">Question {cur + 1} of {quiz.questions.length}</p>
        <h2 className="mt-2 text-lg font-semibold text-zinc-100">{q.text}</h2>
        <div className="mt-5 space-y-3">
          {q.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => pick(index)}
              className={cn(
                'w-full rounded-xl border px-4 py-3 text-left text-sm transition',
                picked === index
                  ? 'border-violet-500 bg-violet-600/10 text-violet-200'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
              )}
            >
              <span className="mr-2 font-semibold text-zinc-500">{String.fromCharCode(65 + index)}.</span>
              {opt}
            </button>
          ))}
        </div>
        {picked !== null && q.explanation && (
          <p className="mt-4 rounded-xl border border-emerald-800/40 bg-emerald-900/20 px-4 py-3 text-sm text-emerald-200">
            <CheckIcon className="mr-1.5 inline h-4 w-4" />
            {q.explanation}
          </p>
        )}

        <div className="mt-6 flex justify-end">
          {!isLast ? (
            <button
              disabled={picked === null}
              onClick={next}
              className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <Link
              to={`/quiz/${quiz.id}/result`}
              state={{ correct: correctCount, total: quiz.questions.length }}
              className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Finish
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}