import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { api } from '../api';
import { type PerformanceRecommendation } from '../types';
import { TrophyIcon, SparklesIcon } from '../components/icons';

export function QuizResult() {
  const { attemptId: paramAttemptId } = useParams<{ attemptId: string }>();
  const location = useLocation();
  const stateResult = location.state?.result;
  const attemptId = paramAttemptId || stateResult?.attemptId;

  const [perf, setPerf] = useState<PerformanceRecommendation | null>(stateResult ? {
    score: stateResult.score,
    totalQuestions: stateResult.totalQuestions,
    percentage: stateResult.percentage,
    recommendation: { action: 'PRACTICE', message: 'Analyzing performance...' }
  } : null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPerformance() {
      if (!attemptId) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.getPerformance(attemptId);
        setPerf(data);
      } catch (err) {
        console.error('Failed to fetch AI performance feedback', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPerformance();
  }, [attemptId]);

  const score = perf?.score ?? stateResult?.score ?? 0;
  const total = perf?.totalQuestions ?? stateResult?.totalQuestions ?? 1;
  const pct = perf?.percentage ?? stateResult?.percentage ?? Math.round((score / total) * 100);
  const action = perf?.recommendation?.action || 'PRACTICE';
  const aiMessage = perf?.recommendation?.message || 'Keep learning and practicing!';

  const actionColors: Record<string, { bg: string; text: string; border: string; label: string }> = {
    REVIEW: {
      bg: 'bg-amber-950/30',
      text: 'text-amber-300',
      border: 'border-amber-500/30',
      label: 'Review Recommended'
    },
    PRACTICE: {
      bg: 'bg-sky-950/30',
      text: 'text-sky-300',
      border: 'border-sky-500/30',
      label: 'Practice Recommended'
    },
    RETAKE: {
      bg: 'bg-purple-950/30',
      text: 'text-purple-300',
      border: 'border-purple-500/30',
      label: 'Retake Recommended'
    },
    NEXT_TOPIC: {
      bg: 'bg-emerald-950/30',
      text: 'text-emerald-300',
      border: 'border-emerald-500/30',
      label: 'Next Topic Recommended'
    },
  };

  const actionStyle = actionColors[action] || actionColors.PRACTICE;

  return (
    <div className="mx-auto max-w-xl px-6 py-12 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-600 shadow-xl">
        <TrophyIcon className="h-10 w-10 text-white" />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-zinc-100">
        {pct >= 70 ? 'Quiz Completed Successfully!' : 'Quiz Complete'}
      </h1>

      {/* Score Box */}
      <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-card">
        <p className="text-5xl font-black text-zinc-100">
          {pct}<span className="text-2xl text-zinc-500">%</span>
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          Score: {score} of {total} correct answers
        </p>
      </div>

      {/* AI Recommendation Card */}
      {loading ? (
        <div className="mt-6 flex items-center justify-center gap-2 py-6 text-sm text-zinc-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
          Fetching AI Learning Recommendation...
        </div>
      ) : (
        <div className={`mt-6 rounded-3xl border ${actionStyle.border} ${actionStyle.bg} p-6 text-left shadow-card`}>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-300">
            <SparklesIcon className="h-4 w-4" /> AI Learning Recommendation
          </div>
          <div className="mt-3">
            <span className={`inline-block rounded-lg px-3 py-1 text-xs font-bold uppercase ${actionStyle.text} bg-zinc-900/80 border ${actionStyle.border}`}>
              Action: {action}
            </span>
            <p className="mt-3 text-sm text-zinc-200 leading-relaxed font-medium">
              {aiMessage}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/progress"
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition"
        >
          View Progress Dashboard
        </Link>
        <Link
          to="/explore"
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:border-zinc-500 transition"
        >
          All Courses
        </Link>
      </div>
    </div>
  );
}