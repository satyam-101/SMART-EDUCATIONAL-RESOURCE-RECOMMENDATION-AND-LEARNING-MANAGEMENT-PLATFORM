import { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { api } from '../api';
import { type PerformanceRecommendation } from '../types';
import { TrophyIcon, SparklesIcon, RefreshCwIcon, ChevronRightIcon } from '../components/icons';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';

export function QuizResult() {
  const { attemptId: paramAttemptId } = useParams<{ attemptId: string }>();
  const location = useLocation();
  const stateResult = location.state?.result;
  const attemptId = paramAttemptId || stateResult?.attemptId;

  const [perf, setPerf] = useState<PerformanceRecommendation | null>(
    stateResult
      ? {
          score: stateResult.score,
          totalQuestions: stateResult.totalQuestions,
          percentage: stateResult.percentage,
          recommendation: { action: 'PRACTICE', message: 'Analyzing performance...' },
        }
      : null
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerformance = useCallback(async () => {
    if (!attemptId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await api.getPerformance(attemptId);
      setPerf(data);
    } catch (err: any) {
      setError(err?.message || 'Could not load AI performance recommendation.');
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  useEffect(() => {
    fetchPerformance();
  }, [fetchPerformance]);

  const score = perf?.score ?? stateResult?.score ?? 0;
  const total = perf?.totalQuestions ?? stateResult?.totalQuestions ?? 1;
  const pct = perf?.percentage ?? stateResult?.percentage ?? Math.round((score / total) * 100);
  const action = perf?.recommendation?.action || 'PRACTICE';
  const aiMessage = perf?.recommendation?.message || 'Keep practicing to master this concept!';

  const actionColors: Record<string, { bg: string; text: string; border: string; label: string }> = {
    REVIEW: {
      bg: 'bg-amber-950/30',
      text: 'text-amber-300',
      border: 'border-amber-500/30',
      label: 'Review Concepts',
    },
    PRACTICE: {
      bg: 'bg-sky-950/30',
      text: 'text-sky-300',
      border: 'border-sky-500/30',
      label: 'Practice Questions',
    },
    RETAKE: {
      bg: 'bg-purple-950/30',
      text: 'text-purple-300',
      border: 'border-purple-500/30',
      label: 'Retake Quiz',
    },
    NEXT_TOPIC: {
      bg: 'bg-emerald-950/30',
      text: 'text-emerald-300',
      border: 'border-emerald-500/30',
      label: 'Advance to Next Topic',
    },
  };

  const actionStyle = actionColors[action] || actionColors.PRACTICE;

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-12 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-600 shadow-xl border border-violet-400/30">
        <TrophyIcon className="h-10 w-10 text-white" />
      </div>

      <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold text-zinc-100">
        {pct >= 80 ? 'Mastery Achieved! 🎉' : pct >= 50 ? 'Good Effort! Keep Going 💪' : 'Quiz Completed'}
      </h1>
      <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
        Here is your performance breakdown and personalized AI next step.
      </p>

      {/* Score Box */}
      <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 shadow-card">
        <p className="text-5xl sm:text-6xl font-black text-zinc-100 tracking-tight">
          {pct}
          <span className="text-2xl sm:text-3xl font-bold text-violet-400">%</span>
        </p>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400">
          Correct: <span className="font-bold text-zinc-200">{score}</span> of{' '}
          <span className="font-bold text-zinc-200">{total}</span> questions
        </p>
      </div>

      {/* AI Recommendation Card */}
      {loading ? (
        <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 text-left space-y-3 shadow-card">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
            <span className="text-xs font-semibold text-zinc-400">Generating AI Learning Guidance...</span>
          </div>
          <Skeleton className="h-6 w-36 rounded-lg" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      ) : error ? (
        <div className="mt-6 rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-left text-xs sm:text-sm text-red-300">
          <p>{error}</p>
          <Button size="sm" variant="outline" onClick={fetchPerformance} className="mt-3 border-red-500/40 text-red-200">
            <RefreshCwIcon className="h-3.5 w-3.5" /> Retry Recommendation
          </Button>
        </div>
      ) : (
        <div className={`mt-6 rounded-3xl border ${actionStyle.border} ${actionStyle.bg} p-6 text-left shadow-card`}>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-300">
            <SparklesIcon className="h-4 w-4" /> AI Next-Step Guidance
          </div>
          <div className="mt-3">
            <span className={`inline-block rounded-lg px-3 py-1 text-xs font-bold uppercase ${actionStyle.text} bg-zinc-900/80 border ${actionStyle.border}`}>
              Recommended Action: {actionStyle.label}
            </span>
            <p className="mt-3 text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
              {aiMessage}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/progress">
          <Button className="bg-violet-600 hover:bg-violet-500 text-white shadow-md">
            View Learning Progress <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="outline" className="border-zinc-700 bg-zinc-900 text-zinc-200">
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}