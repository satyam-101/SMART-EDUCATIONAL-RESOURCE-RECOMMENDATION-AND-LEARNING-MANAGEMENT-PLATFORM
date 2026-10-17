import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';

export function Register() {
  const { register } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await register({ name: name.trim(), email: email.trim(), password });
      toast.success('Account created successfully! Set up your learning preferences.');
      nav('/onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 sm:px-0">
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">Create your account</h1>
        <p className="mt-2 text-sm text-zinc-400">Start learning smarter with ZUNO AI</p>
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
          label="Full name"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError('');
          }}
          placeholder="Ada Lovelace"
          disabled={loading}
        />
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
          minLength={6}
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError('');
          }}
          placeholder="At least 6 characters"
          hint="Must be at least 6 characters"
          disabled={loading}
        />
        <Button
          type="submit"
          className="w-full mt-2"
          loading={loading}
          loadingText="Creating account..."
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-violet-400 hover:text-violet-300 transition underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}