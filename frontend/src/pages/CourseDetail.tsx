import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { type ApiCourse } from '../types';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { PlayIcon, ChevronRightIcon, BookOpenIcon, RefreshCwIcon } from '../components/icons';

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<ApiCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCourse(id);
      setCourse(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch course details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-white/[0.08] bg-zinc-900/60 p-8 space-y-4">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-10 w-2/3 rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-10 w-44 rounded-xl" />
        </div>
        <div className="mt-8 space-y-4">
          <Skeleton className="h-6 w-48 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="mx-auto max-w-md py-16 text-center px-4">
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
          <p className="font-semibold">{error || 'Course not found'}</p>
          <div className="mt-5 flex justify-center gap-3">
            <Button size="sm" variant="outline" onClick={fetchCourse} className="border-red-500/40 text-red-200">
              <RefreshCwIcon className="h-3.5 w-3.5" /> Retry
            </Button>
            <Link to="/explore">
              <Button size="sm">Back to Explore</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const topics = course.topics || [];
  const firstTopic = topics[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header Banner */}
      <div className="overflow-hidden rounded-3xl bg-violet-600 p-6 sm:p-10 text-white shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
          <span>Official Course</span> <span className="text-white/40">•</span> <span>{topics.length} Topics</span>
        </div>
        <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">{course.title}</h1>
        <p className="mt-2 max-w-2xl text-xs sm:text-sm text-white/85 leading-relaxed">{course.description}</p>
        
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {firstTopic && (
            <Link to={`/topics/${firstTopic.id}`}>
              <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100 shadow-md">
                <PlayIcon className="h-4 w-4" /> Start First Topic
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Topics Syllabus List */}
      <div className="mt-8 sm:mt-10">
        <h2 className="text-xl font-bold text-zinc-100">Course Syllabus & Topics</h2>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">Select any topic below to view video resources and practice quizzes.</p>

        {topics.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center text-sm text-zinc-400">
            No topics currently listed for this course.
          </div>
        ) : (
          <div className="mt-6 space-y-3 sm:space-y-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 shadow-card transition duration-200 hover:border-violet-500/40 hover:bg-zinc-900/90"
              >
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-300 border border-violet-500/30">
                    {topic.order}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-100">{topic.title}</h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                      <span>Order #{topic.order}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <BookOpenIcon className="h-3.5 w-3.5 text-violet-400" /> Topic Details
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <Link
                    to={`/topics/${topic.id}`}
                    className="inline-flex items-center gap-1 rounded-xl bg-violet-600/20 border border-violet-500/30 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-violet-300 hover:bg-violet-600 hover:text-white transition shadow-sm"
                  >
                    <PlayIcon className="h-3.5 w-3.5" /> Start Topic <ChevronRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}