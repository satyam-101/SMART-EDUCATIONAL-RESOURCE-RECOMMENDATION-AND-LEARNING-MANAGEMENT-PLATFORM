import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { type ApiCourse } from '../types';
import { Button } from '../components/ui/Button';
import { PlayIcon, ChevronRightIcon, BookOpenIcon } from '../components/icons';

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<ApiCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCourse() {
      if (!id) return;
      try {
        const data = await api.getCourse(id);
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
        <p className="text-sm text-zinc-400">Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-red-400">{error || 'Course not found'}</p>
        <Link to="/explore" className="mt-4 inline-block text-sm text-violet-400 hover:underline">
          Back to Explore Courses
        </Link>
      </div>
    );
  }

  const topics = course.topics || [];
  const firstTopic = topics[0];

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* Header Banner */}
      <div className="on-accent overflow-hidden rounded-3xl bg-violet-600 p-10 text-white shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
          <span>Official Course</span> <span className="text-white/40">•</span> <span>{topics.length} Topics</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold">{course.title}</h1>
        <p className="mt-2 max-w-2xl text-white/85 leading-relaxed">{course.description}</p>
        
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {firstTopic ? (
            <Link to={`/topics/${firstTopic.id}`}>
              <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100">
                <PlayIcon className="h-4 w-4" /> Start First Topic
              </Button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* Topics Syllabus List */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-zinc-100">Course Syllabus & Topics</h2>
        <p className="mt-1 text-sm text-zinc-400">Click any topic below to view videos and quizzes.</p>

        <div className="mt-6 space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-card transition hover:border-violet-500/40 hover:bg-zinc-900/90"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-300 border border-violet-500/30">
                  {topic.order}
                </span>
                <div>
                  <h3 className="text-base font-bold text-zinc-100">{topic.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
                    <span>Topic Order: #{topic.order}</span>
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
                  className="inline-flex items-center gap-1 rounded-xl bg-violet-600/20 border border-violet-500/30 px-4 py-2 text-xs font-semibold text-violet-300 hover:bg-violet-600 hover:text-white transition"
                >
                  <PlayIcon className="h-3.5 w-3.5" /> Start Topic <ChevronRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}