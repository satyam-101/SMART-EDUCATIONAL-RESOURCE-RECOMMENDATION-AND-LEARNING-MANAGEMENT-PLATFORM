import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { type ApiQuiz } from '../types';
import { cn } from '../lib/utils';
import { ClockIcon } from '../components/icons';
import { Button } from '../components/ui/Button';

export function QuizPage() {
  const { id: quizId } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [quiz, setQuiz] = useState<ApiQuiz | null>(null);
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchQuiz() {
      if (!quizId) return;
      try {
        const data = await api.getQuiz(quizId);
        setQuiz(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch quiz');
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
        <p className="text-sm text-zinc-400">Loading quiz questions...</p>
      </div>
    );
  }

  if (error || !quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-red-400">{error || 'Quiz not found or has no questions.'}</p>
        <button
          onClick={() => nav(-1)}
          className="mt-4 text-sm text-violet-400 hover:underline"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const questions = quiz.questions;
  const currentQ = questions[cur];
  const isLast = cur === questions.length - 1;
  const pickedOption = answers[currentQ.id];

  const pickOption = (letter: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: letter,
    }));
  };

  const handleNext = () => {
    if (cur < questions.length - 1) {
      setCur((c) => c + 1);
    }
  };

  const handleSubmit = async () => {
    if (!quizId) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await api.submitQuiz(quizId, answers);
      nav(`/quiz-result/${res.attemptId}`, { state: { result: res } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quiz');
      setSubmitting(false);
    }
  };

  const options = [
    { letter: 'A', text: currentQ.optionA },
    { letter: 'B', text: currentQ.optionB },
    { letter: 'C', text: currentQ.optionC },
    { letter: 'D', text: currentQ.optionD },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-violet-400">Topic Quiz</p>
          <h1 className="mt-1 text-xl font-bold text-zinc-100">{quiz.title}</h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300">
          <ClockIcon className="h-4 w-4 text-violet-400" /> Auto Evaluated
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5 flex gap-1.5">
        {questions.map((_, index) => (
          <div
            key={index}
            className={cn('h-1.5 flex-1 rounded-full transition-colors', index <= cur ? 'bg-violet-500' : 'bg-zinc-800')}
          />
        ))}
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {/* Question Card */}
      <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-card">
        <p className="text-sm text-zinc-400">
          Question {cur + 1} of {questions.length}
        </p>
        <h2 className="mt-2 text-lg font-semibold text-zinc-100 leading-relaxed">{currentQ.questionText}</h2>

        <div className="mt-6 space-y-3">
          {options.map(({ letter, text }) => {
            const isSelected = pickedOption === letter;
            return (
              <button
                key={letter}
                onClick={() => pickOption(letter)}
                className={cn(
                  'w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition flex items-center gap-3',
                  isSelected
                    ? 'border-violet-500 bg-violet-600/20 text-violet-200'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                )}
              >
                <span className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                  isSelected ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-400'
                )}>
                  {letter}
                </span>
                <span className="flex-1">{text}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            disabled={cur === 0}
            onClick={() => setCur((c) => c - 1)}
            className="text-xs font-semibold text-zinc-400 hover:text-white disabled:opacity-30"
          >
            ← Previous
          </button>

          {!isLast ? (
            <button
              disabled={!pickedOption}
              onClick={handleNext}
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-40 transition"
            >
              Next Question →
            </button>
          ) : (
            <Button
              disabled={!pickedOption || submitting}
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              {submitting ? 'Evaluating Quiz...' : 'Submit Quiz ✓'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}