import { Link, Outlet } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-zinc-50">ZUNO</span>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <Outlet />
        </div>
        <p className="mt-6 text-center text-sm text-zinc-500">
          <Link to="/" className="text-violet-400 hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
