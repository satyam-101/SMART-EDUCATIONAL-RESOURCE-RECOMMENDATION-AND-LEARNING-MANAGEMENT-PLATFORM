import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { type ApiTopic } from '../types';
import { PlayIcon, ChevronLeftIcon, CheckIcon } from '../components/icons';
import { Button } from '../components/ui/Button';

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState<ApiTopic | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTopic() {
      if (!topicId) return;
      try {
        const data = await api.getTopic(topicId);
        setTopic(data);
        if (data.resources && data.resources.length > 0) {
          setActiveVideo(data.resources[0].videoUrl);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch topic details');
      } finally {
        setLoading(false);
      }
    }
    fetchTopic();
  }, [topicId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
        <p className="text-sm text-zinc-400">Loading topic videos and resources...</p>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-red-400">{error || 'Topic not found'}</p>
        <Link to="/explore" className="mt-4 inline-block text-sm text-violet-400 hover:underline">
          Back to Courses
        </Link>
      </div>
    );
  }

  const resources = topic.resources || [];
  const quiz = topic.quiz;

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to={`/courses/${topic.courseId}`}
          className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-violet-300 transition"
        >
          <ChevronLeftIcon className="h-4 w-4" /> Back to Course
        </Link>
        <span className="rounded-full bg-violet-600/20 px-3 py-1 text-xs font-semibold text-violet-300 border border-violet-500/30">
          Topic #{topic.order}
        </span>
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-bold text-zinc-100">{topic.title}</h1>
      </div>

      {/* Video Player Section */}
      <div className="mt-6 aspect-video w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        {activeVideo ? (
          <iframe
            src={getEmbedUrl(activeVideo)}
            title={topic.title}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-zinc-900 text-zinc-400">
            <PlayIcon className="h-10 w-10 text-violet-500" />
            <p className="text-sm">No video resource available for this topic</p>
          </div>
        )}
      </div>

      {/* Video Playlist / Multiple Resources */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-zinc-100">Video Resources ({resources.length})</h2>
        <div className="mt-4 space-y-3">
          {resources.map((res, index) => {
            const isActive = activeVideo === res.videoUrl;
            return (
              <div
                key={res.id}
                onClick={() => setActiveVideo(res.videoUrl)}
                className={`flex items-center justify-between cursor-pointer rounded-2xl border p-4 transition ${
                  isActive
                    ? 'border-violet-500 bg-violet-600/15 text-violet-200'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    isActive ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{res.title}</p>
                    {res.description && <p className="text-xs text-zinc-400 mt-0.5">{res.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-violet-400">
                  <PlayIcon className="h-4 w-4" /> {isActive ? 'Now Playing' : 'Watch'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Quiz Action */}
      <div className="mt-10 rounded-3xl border border-violet-500/30 bg-violet-950/20 p-6 text-center">
        <h3 className="text-lg font-bold text-zinc-100">Ready to test your understanding?</h3>
        <p className="mt-1 text-sm text-zinc-400">Take the topic quiz to earn XP and receive AI performance guidance.</p>
        
        <div className="mt-5 flex justify-center">
          {quiz ? (
            <Link to={`/quiz/${quiz.id}`}>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg">
                <CheckIcon className="h-4 w-4" /> Start Quiz
              </Button>
            </Link>
          ) : (
            <span className="text-sm text-zinc-500">No quiz attached to this topic yet.</span>
          )}
        </div>
      </div>
    </div>
  );
}
