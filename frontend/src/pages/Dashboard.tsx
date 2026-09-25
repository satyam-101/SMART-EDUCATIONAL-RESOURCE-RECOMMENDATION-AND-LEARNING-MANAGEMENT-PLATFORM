import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { SparklesIcon, BookOpenIcon, ChevronRightIcon } from '../components/icons';

export function Dashboard() {
  const { user } = useAuth();
  const [dashData, setDashData] = useState<{
    user: any;
    progress: any[];
    recentAttempts: any[];
  } | null>(null);

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [dash, cList] = await Promise.all([
          api.getDashboard().catch(() => null),
          api.getCourses().catch(() => []),
        ]);
        if (dash) {
          setDashData(dash);
        }
        setCourses(cList || []);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const name = user?.name || dashData?.user?.name || 'Learner';
  const first = name.split(' ')[0];
  const progressList = dashData?.progress || [];
  const recentAttempts = dashData?.recentAttempts || [];

  return (
    <div className="mx-auto max-w-6xl py-2 sm:py-4">
      {/* Welcome Banner */}
      <header className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/60 px-6 py-8 shadow-card backdrop-blur-sm sm:px-8">
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/20 px-3 py-1 text-xs font-semibold text-violet-300 border border-violet-500/30">
              <SparklesIcon className="h-3.5 w-3.5" /> AI Learning LMS
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-100">
              Welcome back, {first}! 👋
            </h1>
            <p className="mt-1.5 text-sm text-zinc-400">
              Goal: {user?.learningGoal || dashData?.user?.learningGoal || 'Master Full Stack Development'} • Level:{' '}
              {user?.skillLevel || dashData?.user?.skillLevel || 'Beginner'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/onboarding">
              <Button variant="outline" className="border-zinc-700 bg-zinc-900 text-zinc-200">
                Update Preferences
              </Button>
            </Link>
            <Link to="/recommendations">
              <Button className="bg-violet-600 hover:bg-violet-500 text-white">
                <SparklesIcon className="h-4 w-4" /> AI Recommendations
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Topics Completed', value: progressList.filter((p) => p.completed).length, tint: 'text-emerald-400' },
          { label: 'Available Courses', value: courses.length, tint: 'text-violet-400' },
          { label: 'Quiz Attempts', value: recentAttempts.length, tint: 'text-amber-400' },
          { label: 'Skill Level', value: user?.skillLevel || 'Beginner', tint: 'text-sky-400' },
        ].map(({ label, value, tint }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-5 shadow-card transition duration-300 hover:border-violet-400/30"
          >
            <p className={`text-2xl font-extrabold ${tint}`}>{value}</p>
            <p className="mt-1 text-xs font-medium text-zinc-400">{label}</p>
          </div>
        ))}
      </section>

      {/* Dashboard Main Grid */}
      <section className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Course Catalogue & Progress */}
        <div className="lg:col-span-2 space-y-8">
          {/* Courses List */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-zinc-100">Fixed Course Catalogue</h2>
              <Link to="/explore" className="text-sm font-semibold text-violet-400 hover:text-violet-300">
                Explore All →
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-5 shadow-card transition duration-300 hover:border-violet-500/40 hover:bg-zinc-900/90"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition group-hover:scale-105">
                        <BookOpenIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-100 group-hover:text-violet-300 transition">
                          {course.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{course.description}</p>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-zinc-500 group-hover:text-white transition" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Recent Quiz Attempts & Quick Links */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-100">Recent Quiz Attempts</h2>
            <div className="mt-4 space-y-3">
              {recentAttempts.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center text-xs text-zinc-500">
                  No quiz attempts yet. Start a topic quiz to see results here.
                </div>
              ) : (
                recentAttempts.map((att) => (
                  <div key={att.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-card">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-200">
                        {att.quiz?.title || att.quiz?.topic?.title || 'Quiz'}
                      </span>
                      <span className="rounded-full bg-violet-600/20 px-2.5 py-0.5 text-xs font-bold text-violet-300">
                        {att.percentage}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                      <span>Score: {att.score}/{att.totalQuestions}</span>
                      <span>Attempt #{att.attemptNumber}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-950/20 p-5">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <SparklesIcon className="h-4 w-4 text-violet-400" /> AI Recommendation Flow
            </h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Complete onboarding to get personalized course picks, then take topic quizzes to get adaptive performance recommendations.
            </p>
            <div className="mt-4">
              <Link to="/onboarding">
                <Button size="sm" className="w-full bg-violet-600 text-white hover:bg-violet-500">
                  Go to Onboarding
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
