import { type WeeklyActivity, type Skill, type Achievement } from '../types';

export const mockWeeklyActivity: WeeklyActivity[] = [
  { day: 'Mon', minutes: 42 },
  { day: 'Tue', minutes: 75 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 90 },
  { day: 'Fri', minutes: 60 },
  { day: 'Sat', minutes: 120 },
  { day: 'Sun', minutes: 15 },
];

export const mockSkills: Skill[] = [
  { name: 'JavaScript', level: 82 },
  { name: 'React', level: 68 },
  { name: 'Python', level: 45 },
  { name: 'Algorithms', level: 52 },
  { name: 'TypeScript', level: 38 },
];

export const mockAchievements: Achievement[] = [
  { id: 'a1', title: 'First Steps', description: 'Complete your first lesson', icon: 'footprints', xp: 50, earned: true, date: 'Mar 2' },
  { id: 'a2', title: '7-Day Streak', description: 'Learn 7 days in a row', icon: 'flame', xp: 100, earned: true, date: 'Mar 12' },
  { id: 'a3', title: 'Quiz Whiz', description: 'Score 90%+ on any quiz', icon: 'brain', xp: 150, earned: true, date: 'Mar 18' },
  { id: 'a4', title: '14-Day Streak', description: 'Learn 14 days in a row', icon: 'zap', xp: 200, earned: true, date: 'Mar 25' },
  { id: 'a5', title: 'Project Builder', description: 'Complete a hands-on project', icon: 'hammer', xp: 250, earned: false },
  { id: 'a6', title: 'Night Owl', description: 'Learn after 10 PM, 5 times', icon: 'moon', xp: 120, earned: false },
  { id: 'a7', title: 'Helping Hand', description: 'Answer 5 questions in Community', icon: 'heart', xp: 180, earned: false },
  { id: 'a8', title: 'Century Club', description: 'Reach 10,000 total XP', icon: 'trophy', xp: 500, earned: false },
];