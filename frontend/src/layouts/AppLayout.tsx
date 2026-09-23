import { type ReactNode } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useUI } from '../hooks/useUI';
import { useAuth } from '../hooks/useAuth';
import { Logo } from '../components/ui/Logo';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { cn, initialsOf } from '../lib/utils';
import {
  HomeIcon,
  CompassIcon,
  CoursesIcon,
  TutorIcon,
  PlannerIcon,
  QuizIcon,
  ProgressIcon,
  PracticeIcon,
  ProjectsIcon,
  CommunityIcon,
  ProfileIcon,
  SettingsIcon,
  MenuIcon,
  LogOutIcon,
} from '../components/icons';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', Icon: HomeIcon },
  { to: '/explore', label: 'Explore', Icon: CompassIcon },
  { to: '/courses', label: 'Courses', Icon: CoursesIcon },
  { to: '/ai-tutor', label: 'AI Tutor', Icon: TutorIcon },
  { to: '/planner', label: 'Study Planner', Icon: PlannerIcon },
  { to: '/quiz', label: 'Quizzes', Icon: QuizIcon },
  { to: '/progress', label: 'Progress', Icon: ProgressIcon },
  { to: '/practice', label: 'Practice', Icon: PracticeIcon },
  { to: '/projects', label: 'Projects', Icon: ProjectsIcon },
  { to: '/community', label: 'Community', Icon: CommunityIcon },
  { to: '/profile', label: 'Profile', Icon: ProfileIcon },
  { to: '/settings', label: 'Settings', Icon: SettingsIcon },
];

export function AppLayout({ children }: { children?: ReactNode }) {
  const { sidebarOpen, setSidebarOpen } = useUI();
  const { user, logout } = useAuth();

  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-zuno-950 text-zinc-100">
      {sidebarOpen && <button className="backdrop-scrim fixed inset-0 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}
      <aside className={cn('fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-white/[0.08] bg-zinc-950/90 shadow-2xl shadow-black/30 backdrop-blur-xl transition-transform duration-300 lg:w-72 lg:translate-x-0', sidebarOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex items-center gap-3 px-5 py-6">
          <Link to="/" aria-label="ZUNO home" className="flex items-center gap-3 text-zinc-100 transition hover:text-violet-200">
            <Logo className="h-8 w-8" />
            <div className="flex-1"><span className="block text-lg font-extrabold tracking-[-0.04em] text-white">ZUNO</span><span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">Learning space</span></div>
          </Link>
          <ThemeToggle />
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600">Workspace</p>
          {NAV.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/15'
                    : 'text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-100'
                )
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/[0.08] p-4">
          {user ? (
            <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-white/[0.06]">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white">
                {initialsOf(user.name)}
              </span>
              <span className="flex-1 overflow-hidden">
                <span className="block truncate text-sm font-medium">{user.name}</span>
                <span className="block truncate text-xs text-zinc-500">{user.email}</span>
              </span>
              <LogOutIcon className="h-4 w-4 text-zinc-500" />
            </button>
          ) : (
            <div className="text-xs text-zinc-500">Signed out</div>
          )}
        </div>
      </aside>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-zinc-900/90 shadow-xl backdrop-blur lg:hidden"
        aria-label="Menu"
        aria-expanded={sidebarOpen}
      >
        <MenuIcon className="h-5 w-5" />
      </button>
      <main className="min-w-0 flex-1 lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children ?? <Outlet />}</div>
      </main>
    </div>
  );
}
