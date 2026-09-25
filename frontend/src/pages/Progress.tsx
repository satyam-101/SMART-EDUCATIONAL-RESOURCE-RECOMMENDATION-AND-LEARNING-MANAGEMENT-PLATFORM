import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { type CourseProgressData } from '../types';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/motion/Reveal';

export function Progress() {
  const [courseProgress, setCourseProgress] = useState<CourseProgressData[]>([]);
  const [topicProgress, setTopicProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      try {
        const [cProgress, tProgress] = await Promise.all([
          api.getCourseProgress(),
          api.getProgress(),
        ]);
        setCourseProgress(cProgress || []);
        setTopicProgress(tProgress || []);
      } catch (err) {
        console.error('Failed to load progress from backend:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, []);

  const totalCompletedTopics = topicProgress.filter((p) => p.completed).length;

  return (
    <div className="mx-auto max-w-3xl py-2 sm:py-4">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Learning Analytics</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-zinc-100">Course Progress</h1>
        <p className="mt-1 text-sm text-zinc-400">Track your completed topics and course mastery across the catalogue.</p>
      </Reveal>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center shadow-card">
          <p className="text-3xl font-extrabold text-violet-400">{totalCompletedTopics}</p>
          <p className="mt-1 text-xs font-medium text-zinc-400">Completed Topics</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center shadow-card">
          <p className="text-3xl font-extrabold text-emerald-400">{courseProgress.length}</p>
          <p className="mt-1 text-xs font-medium text-zinc-400">Active Courses</p>
        </div>
      </div>

      {/* Course-wise Progress Bars */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-zinc-100">Course Breakdown</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            {courseProgress.map((cp) => (
              <div key={cp.courseId} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-card">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-zinc-100">{cp.courseTitle}</span>
                  <span className="text-xs font-semibold text-violet-300">
                    {cp.completedTopics} / {cp.totalTopics} topics ({cp.percentage}%)
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500"
                    style={{ width: `${cp.percentage}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">
                    {Array.from({ length: 10 }).map((_, i) =>
                      i < Math.round((cp.percentage / 100) * 10) ? '█' : '░'
                    ).join('')} {cp.percentage}%
                  </span>
                  <Link
                    to={`/courses/${cp.courseId}`}
                    className="text-xs font-semibold text-violet-400 hover:text-violet-300"
                  >
                    View Course →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
