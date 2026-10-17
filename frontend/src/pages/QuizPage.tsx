import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { type ApiQuiz } from '../types';
import { cn } from '../lib/utils';
import { ClockIcon, ChevronLeftIcon, CheckIcon, RefreshCwIcon } from '../components/icons';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { useToast } from '../context/ToastContext';

export function QuizPage() {
  const { id: quizId } = useParams<{ id: string }>();
  const nav = useNavigate();
  const toast = useToast();
  const [quiz, setQuiz] = useState<ApiQuiz | null>(null);
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuiz = useCallback(async () => {
    if (!quizId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.getQuiz(quizId);
      setQuiz(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load quiz questions.');
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleSubmit = async () => {
    if (!quizId || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await api.submitQuiz(quizId, answers);
      toast.success(`Quiz completed! Score: ${res.score}/${res.totalQuestions} (${res.percentage}%)`);
      nav(`/quiz-result/${res.attemptId}`, { state: { result: res } });
    } catch (err: any) {
      setError(
        err?.message || 'Failed to submit quiz. Your selected answers have been saved. Please retry.'
      );
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-6 w-32 rounded" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-2 w-full rounded-full mb-8" />
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-7 w-4/5 rounded-xl" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <div className="mx-auto max-w-md py-16 text-center px-4">
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
          <p className="font-semibold">{error}</p>
          <div className="mt-5 flex justify-center gap-3">
            <Button size="sm" variant="outline" onClick={fetchQuiz} className="border-red-500/40 text-red-200">
              <RefreshCwIcon className="h-3.5 w-3.5" /> Retry
            </Button>
            <Button size="sm" onClick={() => nav(-1)}>
              ← Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center px-4">
        <p className="text-zinc-400">No questions available in this quiz.</p>
        <button
          onClick={() => nav(-1)}
          className="mt-4 text-sm text-violet-400 hover:underline cursor-pointer"
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
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((cur + 1) / questions.length) * 100);

  const pickOption = (letter: string) => {
    if (submitting) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: letter,
    }));
    if (error) setError(null);
  };

  const handleNext = () => {
    if (cur < questions.length - 1) {
      setCur((c) => c + 1);
    }
  };

  const options = [
    { letter: 'A', text: currentQ.optionA },
    { letter: 'B', text: currentQ.optionB },
    { letter: 'C', text: currentQ.optionC },
    { letter: 'D', text: currentQ.optionD },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button
            onClick={() => nav(-1)}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 mb-1 transition cursor-pointer"
          >
            <ChevronLeftIcon className="h-3.5 w-3.5" /> Exit Quiz
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-zinc-100">{quiz.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300">
            <ClockIcon className="h-3.5 w-3.5 text-violet-400" />
            <span>Answered: {answeredCount}/{questions.length}</span>
          </div>
        </div>
      </div>

      {/* Progress bar with percentage */}
      <div className="mt-5 space-y-1.5">
        <div className="flex justify-between text-xs text-zinc-400 font-medium">
          <span>Question {cur + 1} of {questions.length}</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div className="flex gap-1.5">
          {questions.map((q, index) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = index === cur;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCur(index)}
                disabled={submitting}
                className={cn(
                  'h-2 flex-1 rounded-full transition-all cursor-pointer',
                  isCurrent
                    ? 'bg-violet-500 ring-2 ring-violet-400/40'
                    : isAnswered
                    ? 'bg-violet-700/80'
                    : 'bg-zinc-800 hover:bg-zinc-700'
                )}
                title={`Question ${index + 1}${isAnswered ? ' (answered)' : ''}`}
              />
            );
          })}
        </div>
      </div>

      {/* Submission Failure / Error Alert (Preserves Answers!) */}
      {error && (
        <div
          role="alert"
          className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
        >
          <p className="flex-1">{error}</p>
          <Button
            size="sm"
            onClick={handleSubmit}
            loading={submitting}
            loadingText="Retrying..."
            className="bg-red-600 hover:bg-red-500 text-white shrink-0"
          >
            Retry Submit
          </Button>
        </div>
      )}

      {/* Question Card */}
      <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 shadow-card">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
          <span className="font-semibold uppercase tracking-wider text-violet-400">
            Question #{cur + 1}
          </span>
          {pickedOption && (
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <CheckIcon className="h-3.5 w-3.5" /> Option {pickedOption} selected
            </span>
          )}
        </div>

        <h2 className="text-base sm:text-lg font-semibold text-zinc-100 leading-relaxed">
          {currentQ.questionText}
        </h2>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {options.map(({ letter, text }) => {
            const isSelected = pickedOption === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => pickOption(letter)}
                disabled={submitting}
                className={cn(
                  'w-full rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition duration-150 flex items-center gap-3.5 cursor-pointer',
                  isSelected
                    ? 'border-violet-500 bg-violet-600/20 text-violet-200 shadow-sm ring-1 ring-violet-500/50'
                    : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/80'
                )}
              >
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition',
                    isSelected ? 'bg-violet-600 text-white shadow-sm' : 'bg-zinc-800 text-zinc-400'
                  )}
                >
                  {letter}
                </span>
                <span className="flex-1 text-xs sm:text-sm leading-relaxed">{text}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation & Submission Controls */}
        <div className="mt-8 pt-5 border-t border-zinc-800/80 flex justify-between items-center">
          <button
            type="button"
            disabled={cur === 0 || submitting}
            onClick={() => setCur((c) => c - 1)}
            className="text-xs font-semibold text-zinc-400 hover:text-white disabled:opacity-30 transition cursor-pointer"
          >
            ← Previous Question
          </button>

          {!isLast ? (
            <Button
              type="button"
              disabled={submitting}
              onClick={handleNext}
              className="bg-violet-600 hover:bg-violet-500 text-white shadow-sm"
            >
              Next Question →
            </Button>
          ) : (
            <Button
              type="button"
              disabled={submitting || Object.keys(answers).length === 0}
              onClick={handleSubmit}
              loading={submitting}
              loadingText="Evaluating Quiz..."
              className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
            >
              <CheckIcon className="h-4 w-4" /> Submit Quiz ✓
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}