import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';

export function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      const u = await login(email.trim(), password);
      toast.success(`Welcome back, ${u.name || 'Learner'}!`);
      if (!u?.learningGoal) {
        nav('/onboarding');
      } else {
        nav('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 sm:px-0">
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">Welcome back</h1>
        <p className="mt-2 text-sm text-zinc-400">Sign in to continue your learning journey</p>
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

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          placeholder="you@example.com"
          disabled={loading}
        />
        <Input
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError('');
          }}
          placeholder="••••••••"
          disabled={loading}
        />
        <Button
          type="submit"
          className="w-full mt-2"
          loading={loading}
          loadingText="Signing in..."
        >
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-violet-400 hover:text-violet-300 transition underline-offset-4 hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}