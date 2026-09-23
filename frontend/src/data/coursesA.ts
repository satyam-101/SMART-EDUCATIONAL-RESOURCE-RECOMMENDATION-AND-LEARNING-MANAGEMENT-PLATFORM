import { type Course } from '../types';
import { videoLesson, lesson } from './courseBuilder';

export const coursesA: Course[] = [
  {
    id: 'c1',
    title: 'React Mastery',
    subtitle: 'Build production-grade interfaces with Hooks, Context and modern patterns',
    category: 'Web Development',
    level: 'Intermediate',
    description: 'Go from components to architecture. Master the mental models that power great React apps.',
    about:
      'This course is a deep, project-driven journey through React. You will build from first principles — understanding why the library works the way it does — then layer on Hooks, Context, routing, data fetching and performance before assembling a complete production application.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop',
    gradient: 'from-violet-600 via-fuchsia-600 to-indigo-600',
    duration: '18h 30m',
    lessonsCount: 13,
    students: 12840,
    rating: 4.9,
    reviews: 2210,
    instructor: { id: 'i1', name: 'Sarah Chen', role: 'Staff Engineer, Vercel', initials: 'SC' },
    modules: [
      {
        id: 'm1',
        title: 'React Foundations',
        lessons: [
          videoLesson('What is React, really?', '08:12', true),
          videoLesson('JSX and the component tree', '11:40', true),
          videoLesson('Props, state and unidirectional data flow', '14:05', true),
          lesson('First component challenge', '25min', 'project', true),
        ],
      },
      {
        id: 'm2',
        title: 'Hooks Deep Dive',
        lessons: [
          videoLesson('useState and useReducer', '16:30', true),
          videoLesson('useEffect — the mental model', '18:20'),
          videoLesson('useMemo, useCallback and when to reach for them', '15:45'),
          lesson('Hook quiz', '10min', 'quiz'),
        ],
      },
      {
        id: 'm3',
        title: 'Architecture & Data',
        lessons: [
          videoLesson('Context vs props drilling', '13:10'),
          videoLesson('Data fetching strategies', '17:05'),
          videoLesson('Fetch → cache → UI state flow', '12:55'),
        ],
      },
      {
        id: 'm4',
        title: 'Performance & Shipping',
        lessons: [
          videoLesson('Code splitting and the module graph', '10:30'),
          videoLesson('Profiling with React DevTools', '09:15'),
        ],
      },
    ],
    tags: ['React', 'Hooks', 'TypeScript', 'Frontend'],
    featured: true,
    enrollmentStatus: 'enrolled',
    progress: 45,
  },
  {
    id: 'c2',
    title: 'Python for AI & Machine Learning',
    subtitle: 'From Python basics to training your first neural network',
    category: 'AI & ML',
    level: 'Beginner',
    description: 'Learn Python while building real machine learning projects with NumPy, Pandas and scikit-learn.',
    about:
      'A beginner-friendly on-ramp into AI. You will learn Python fundamentals the way data scientists actually use them, then steadily climb into data wrangling, model training and evaluation with hands-on notebooks throughout.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    duration: '22h',
    lessonsCount: 15,
    students: 23110,
    rating: 4.8,
    reviews: 4100,
    instructor: { id: 'i2', name: 'Rahul Mehta', role: 'ML Engineer, OpenAI', initials: 'RM' },
    modules: [
      {
        id: 'm1',
        title: 'Python Fundamentals',
        lessons: [
          videoLesson('Environment setup and your first script', '07:30', true),
          videoLesson('Data types, lists and dictionaries', '12:20', true),
          videoLesson('Control flow and comprehensions', '13:45'),
        ],
      },
      {
        id: 'm2',
        title: 'Data Wrangling',
        lessons: [
          videoLesson('NumPy — vectorized thinking', '16:10'),
          videoLesson('Pandas DataFrames at speed', '18:30'),
          videoLesson('Cleaning real datasets', '15:25'),
        ],
      },
      {
        id: 'm3',
        title: 'Machine Learning Basics',
        lessons: [
          videoLesson('Train / test splits done right', '11:50'),
          videoLesson('Linear regression from scratch', '19:10'),
          lesson('NumPy quiz', '10min', 'quiz'),
        ],
      },
      {
        id: 'm4',
        title: 'Your First Model',
        lessons: [
          videoLesson('Logistic regression with scikit-learn', '14:35'),
          videoLesson('Evaluating with confusion matrices', '10:20'),
          lesson('Spam classifier project', '90min', 'project'),
        ],
      },
    ],
    tags: ['Python', 'NumPy', 'ML', 'AI'],
    featured: true,
    enrollmentStatus: 'recommended',
  },
];