import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import { SparklesIcon } from '../components/icons';

export function Onboarding() {
  const { saveOnboarding, user } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const [learningGoal, setLearningGoal] = useState(user?.learningGoal || '');
  const [skillLevel, setSkillLevel] = useState(user?.skillLevel || 'Beginner');
  const initialInterests = Array.isArray(user?.interests)
    ? user.interests.join(', ')
    : user?.interests || '';
  const [interests, setInterests] = useState(initialInterests);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    if (!learningGoal.trim()) {
      setError('Please specify your learning goal.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await saveOnboarding({
        learningGoal: learningGoal.trim(),
        skillLevel,
        interests: interests.trim(),
      });
      toast.success('Learning profile saved! Discovering your personalized courses.');
      nav('/recommendations');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save onboarding details. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-600/20 text-violet-400 shadow-lg">
          <SparklesIcon className="h-7 w-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
          Personalize Your Learning
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Help our AI tailor curriculum, quizzes, and course recommendations to your experience.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-300"
        >
          <span className="shrink-0 font-bold">✕</span>
          <p className="flex-1 leading-snug">{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 shadow-card">
        <Input
          label="What is your primary learning goal?"
          required
          value={learningGoal}
          onChange={(e) => {
            setLearningGoal(e.target.value);
            if (error) setError('');
          }}
          placeholder="e.g. Master Full Stack Development or DSA in Java"
          disabled={loading}
          hint="Be specific to get the best semantic course matching"
        />

        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-400">Current Skill Level</label>
          <div role="radiogroup" aria-label="Skill level" className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { level: 'Beginner', desc: 'Starting fresh' },
              { level: 'Intermediate', desc: 'Know basics' },
              { level: 'Advanced', desc: 'Industry ready' },
            ].map(({ level, desc }) => (
              <button
                key={level}
                type="button"
                role="radio"
                aria-checked={skillLevel === level}
                onClick={() => setSkillLevel(level)}
                disabled={loading}
                className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition cursor-pointer ${
                  skillLevel === level
                    ? 'border-violet-500 bg-violet-600/20 text-violet-200 shadow-sm'
                    : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <span className="text-xs sm:text-sm font-bold">{level}</span>
                <span className="text-[10px] text-zinc-500 mt-0.5 hidden sm:block">{desc}</span>
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Interests & Technologies"
          required
          value={interests}
          onChange={(e) => {
            setInterests(e.target.value);
            if (error) setError('');
          }}
          placeholder="e.g. JavaScript, React, Python, Data Structures"
          disabled={loading}
          hint="Separate topics with commas"
        />

        <Button
          type="submit"
          className="w-full mt-2"
          loading={loading}
          loadingText="Saving preferences..."
        >
          <SparklesIcon className="h-4 w-4" /> Save & Generate AI Recommendations
        </Button>
      </form>
    </div>
  );
}
