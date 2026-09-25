import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { SparklesIcon } from '../components/icons';

export function Onboarding() {
  const { saveOnboarding, user } = useAuth();
  const nav = useNavigate();
  const [learningGoal, setLearningGoal] = useState(user?.learningGoal || 'Become a full stack developer');
  const [skillLevel, setSkillLevel] = useState(user?.skillLevel || 'Beginner');
  const initialInterests = Array.isArray(user?.interests) ? user.interests.join(', ') : (user?.interests || 'JavaScript, React, Node.js');
  const [interests, setInterests] = useState(initialInterests);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await saveOnboarding({ learningGoal, skillLevel, interests });
      nav('/recommendations');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save onboarding details');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl px-6 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
          <SparklesIcon className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-100">Welcome to ZUNO AI</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Tell us about your goals so our AI can personalize your learning path
        </p>
      </div>

      {error && (
        <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-card">
        <Input
          label="What is your main Learning Goal?"
          required
          value={learningGoal}
          onChange={(e) => setLearningGoal(e.target.value)}
          placeholder="e.g. Become a full stack developer"
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Skill Level</label>
          <div className="grid grid-cols-3 gap-3">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSkillLevel(level)}
                className={`rounded-xl border py-3 text-sm font-semibold transition ${
                  skillLevel === level
                    ? 'border-violet-500 bg-violet-600/20 text-violet-200'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Interests & Technologies"
          required
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="e.g. JavaScript, React, Node.js"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Saving preferences...' : 'Generate AI Recommendations →'}
        </Button>
      </form>
    </div>
  );
}
