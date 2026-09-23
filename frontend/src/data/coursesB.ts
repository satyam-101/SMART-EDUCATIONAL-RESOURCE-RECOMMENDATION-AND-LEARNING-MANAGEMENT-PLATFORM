import { type Course } from '../types';
import { videoLesson, lesson } from './courseBuilder';

export const coursesB: Course[] = [
  {
    id: 'c3',
    title: 'Data Structures & Algorithms',
    subtitle: 'The interview-proof path to thinking in complexity',
    category: 'Computer Science',
    level: 'Advanced',
    description: 'Master arrays, trees, graphs, dynamic programming and the patterns behind every big-tech interview.',
    about:
      'A rigorous, pattern-first curriculum covering the data structures and algorithm techniques you need to reason about scale. Every concept is paired with annotated solutions and complexity analysis.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop',
    gradient: 'from-blue-600 via-indigo-600 to-violet-600',
    duration: '26h 15m',
    lessonsCount: 17,
    students: 18450,
    rating: 4.9,
    reviews: 3340,
    instructor: { id: 'i3', name: 'David Okonkwo', role: 'Ex-Google SDE', initials: 'DO' },
    modules: [
      {
        id: 'm1',
        title: 'Complexity & Sorting',
        lessons: [
          videoLesson('Big-O — measuring the unmeasurable', '09:40', true),
          videoLesson('Sorting under the hood', '14:20'),
          videoLesson('Binary search mastery', '12:05'),
        ],
      },
      {
        id: 'm2',
        title: 'Core Data Structures',
        lessons: [
          videoLesson('Arrays, strings and two pointers', '17:30'),
          videoLesson('Hash maps and sliding windows', '15:50'),
          videoLesson('Heaps, stacks, queues', '16:15'),
        ],
      },
      {
        id: 'm3',
        title: 'Trees & Graphs',
        lessons: [
          videoLesson('Binary trees and traversals', '18:45'),
          videoLesson('BSTs and balanced trees', '16:40'),
          videoLesson('Graph traversal — BFS and DFS', '21:10'),
        ],
      },
      {
        id: 'm4',
        title: 'Advanced Patterns',
        lessons: [
          videoLesson('Dynamic programming patterns', '24:30'),
          videoLesson('Greedy vs DP', '13:55'),
          lesson('DSA patterns quiz', '15min', 'quiz'),
        ],
      },
    ],
    tags: ['DSA', 'Algorithms', 'Interviews', 'Python'],
    enrollmentStatus: 'open',
  },
  {
    id: 'c4',
    title: 'Full-Stack Engineering',
    subtitle: 'Ship complete products from database to deployed endpoint',
    category: 'Web Development',
    level: 'Advanced',
    description: 'Architect and ship full applications with PostgreSQL, Express, React, Docker and CI/CD.',
    about:
      'A production-minded course for engineers who want to own the entire stack. You will wire up a real application end to end, then iterate on reliability, testing and deployment.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
    gradient: 'from-fuchsia-600 via-purple-600 to-violet-600',
    duration: '30h',
    lessonsCount: 19,
    students: 9240,
    rating: 4.7,
    reviews: 1880,
    instructor: { id: 'i4', name: 'Elena Rodriguez', role: 'Principal Engineer, Stripe', initials: 'ER' },
    modules: [
      {
        id: 'm1',
        title: 'System Foundations',
        lessons: [
          videoLesson('HTTP, APIs and RESTful design', '15:20', true),
          videoLesson('Schema design with PostgreSQL', '18:10', true),
          videoLesson('Authentication essentials', '19:35'),
        ],
      },
      {
        id: 'm2',
        title: 'Backend Engineering',
        lessons: [
          videoLesson('Express middleware patterns', '14:45'),
          videoLesson('Validation and error handling', '13:20'),
          videoLesson('Background jobs and queues', '16:55'),
        ],
      },
      {
        id: 'm3',
        title: 'Frontend Integration',
        lessons: [
          videoLesson('API clients and types', '12:10'),
          videoLesson('Optimistic UI updates', '11:35'),
        ],
      },
      {
        id: 'm4',
        title: 'Ship It',
        lessons: [
          videoLesson('Dockerizing the stack', '17:50'),
          videoLesson('CI/CD pipelines', '14:30'),
          lesson('E-commerce platform build', '4h', 'project'),
        ],
      },
    ],
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    enrollmentStatus: 'enrolled',
    progress: 12,
  },
];