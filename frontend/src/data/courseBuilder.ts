import { type Lesson } from '../types';

const VIDEO_POOL = [
  'ZqGIUfNpn_M',
  'f4B3MVO8hB0',
  'gfDIVO91I5c',
  'nmOlHzWkPMk',
  'RXzBxXxsWqE',
  'XC8bQlNNSbQ',
];

let vidCursor = 0;
const nextVideo = () => `https://www.youtube.com/embed/${VIDEO_POOL[vidCursor++ % VIDEO_POOL.length]}`;

export const videoLesson = (title: string, duration: string, completed = false): Lesson => ({
  id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title,
  duration,
  type: 'video',
  videoUrl: nextVideo(),
  completed,
});

export const lesson = (title: string, duration: string, type: Lesson['type'], completed = false): Lesson => ({
  id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title,
  duration,
  type,
  completed,
});