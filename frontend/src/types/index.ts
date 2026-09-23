// ─── Auth & Users ───────────────────────────────────────────────
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface User {
  id: string;
  name: string;
  email: string;
  goal: string;
  skillLevel: SkillLevel;
  interests: string[];
  initials: string;
  streak: number;
  xp: number;
  rank: string;
  joinedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ─── Courses ────────────────────────────────────────────────────
export type LessonType = 'video' | 'reading' | 'quiz' | 'project';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
  videoUrl?: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: SkillLevel;
  description: string;
  about: string;
  thumbnailUrl: string;
  gradient: string;
  duration: string;
  lessonsCount: number;
  students: number;
  rating: number;
  reviews: number;
  instructor: Instructor;
  modules: Module[];
  tags: string[];
  featured?: boolean;
  enrollmentStatus: 'enrolled' | 'recommended' | 'open';
  progress?: number;
}

// ─── Quizzes ────────────────────────────────────────────────────
export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  lessonId: string;
  title: string;
  description: string;
  timeLimit: number; // minutes
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  total: number;
  date: string;
  timeTaken: string;
  answers: number[];
  recommendation?: string;
}

// ─── Progress & Analytics ───────────────────────────────────────
export interface Progress {
  userId: string;
  courseId: string;
  completedTopics: string[];
  lastAccessed: string;
}

export interface WeeklyActivity {
  day: string;
  minutes: number;
}

export interface ActivityPoint {
  day: string;
  xp: number;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Stat {
  label: string;
  value: string;
  delta: string;
  icon: string;
  tone: 'violet' | 'emerald' | 'amber' | 'sky' | 'fuchsia' | 'rose';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  earned: boolean;
  date?: string;
}

// ─── Planner ────────────────────────────────────────────────────
export type PlanType = 'course' | 'quiz' | 'practice' | 'project' | 'review';

export interface PlanTask {
  id: string;
  title: string;
  type: PlanType;
  date: string; // YYYY-MM-DD
  start: string;
  duration: string;
  status: 'todo' | 'done';
  courseId?: string;
}

export interface PlanDay {
  date: string;
  label: string;
  dayNum: number;
  isToday: boolean;
}

// ─── Practice ───────────────────────────────────────────────────
export interface PracticeQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface PracticeSession {
  id: string;
  title: string;
  topic: string;
  category: string;
  difficulty: SkillLevel;
  time: string;
  xp: number;
  total: number;
  bestScore: number;
  questions: PracticeQuestion[];
}

// ─── Projects ───────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: SkillLevel;
  skills: string[];
  xp: number;
  duration: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  color: string;
}

// ─── Community ──────────────────────────────────────────────────
export interface CommunityPost {
  id: string;
  author: string;
  initials: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  liked: boolean;
}

export interface CommunityMember {
  id: string;
  name: string;
  initials: string;
  xp: number;
  streak: number;
}

// ─── AI Tutor ───────────────────────────────────────────────────
export type ChatRole = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  time: string;
}

// ─── Notifications ──────────────────────────────────────────────
export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: 'achievement' | 'course' | 'reminder' | 'streak';
  read: boolean;
}