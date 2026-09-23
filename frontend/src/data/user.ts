import { type User, type ActivityPoint } from '../types';

export const mockUser: User = {
  id: 'u1',
  name: 'Aarav Sharma',
  email: 'aarav@zuno.ai',
  goal: 'Become a Full Stack Developer',
  skillLevel: 'Intermediate',
  interests: ['Web Dev', 'AI', 'TypeScript'],
  initials: 'AS',
  streak: 14,
  xp: 2840,
  rank: 'Rising Dev',
  joinedAt: 'Mar 2026',
};

const iso = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const todayIso = iso(0);

export const mockActivityPoints: ActivityPoint[] = [
  { day: 'Mon', xp: 120 },
  { day: 'Tue', xp: 210 },
  { day: 'Wed', xp: 90 },
  { day: 'Thu', xp: 260 },
  { day: 'Fri', xp: 180 },
  { day: 'Sat', xp: 320 },
  { day: 'Sun', xp: 40 },
];

export const mockNotifications = [
  { id: 'n1', title: '14-day streak!', body: 'You learned 14 days in a row. Momentum is everything.', time: '2h ago', kind: 'streak' as const, read: false },
  { id: 'n2', title: 'Quiz Whiz earned', body: 'You scored 100% on React Foundations Check.', time: '1d ago', kind: 'achievement' as const, read: false },
  { id: 'n3', title: 'Backend course 68%', body: 'You are two modules away from finishing.', time: '2d ago', kind: 'course' as const, read: true },
  { id: 'n4', title: 'Session reminder', body: 'Your 25-minute practice block starts at 7:30 PM.', time: '3d ago', kind: 'reminder' as const, read: true },
];