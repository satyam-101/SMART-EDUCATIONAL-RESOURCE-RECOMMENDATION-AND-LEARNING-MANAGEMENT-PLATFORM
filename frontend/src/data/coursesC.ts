import { type Course } from '../types';
import { videoLesson, lesson } from './courseBuilder';

export const coursesC: Course[] = [
  {
    id: 'c5',
    title: 'UI/UX Design Fundamentals',
    subtitle: 'Design interfaces people love — color, hierarchy, typography and flow',
    category: 'Design',
    level: 'Beginner',
    description: 'Learn the visual and interaction principles behind modern product design, applied in Figma.',
    about:
      'A designer-first curriculum. You will build design intuition around layout, color systems, typography and motion, then apply everything to polished Figma deliverables and handoff.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    duration: '12h 45m',
    lessonsCount: 11,
    students: 15670,
    rating: 4.8,
    reviews: 2090,
    instructor: { id: 'i5', name: 'Mina Fischer', role: 'Design Lead, Figma', initials: 'MF' },
    modules: [
      {
        id: 'm1',
        title: 'Design Foundations',
        lessons: [
          videoLesson('Visual hierarchy in 10 minutes', '10:05', true),
          videoLesson('Color theory for UI', '13:30'),
          videoLesson('Typography systems', '12:45'),
        ],
      },
      {
        id: 'm2',
        title: 'Layout & Components',
        lessons: [
          videoLesson('Grids, spacing and rhythm', '14:20'),
          videoLesson('Design tokens and components', '15:15'),
        ],
      },
      {
        id: 'm3',
        title: 'Interaction & Delivery',
        lessons: [
          videoLesson('Micro-interactions that matter', '11:40'),
          videoLesson('Prototyping and handoff', '13:05'),
          lesson('Mobile app redesign', '2h', 'project'),
        ],
      },
    ],
    tags: ['Figma', 'UI', 'UX', 'Design Systems'],
    enrollmentStatus: 'open',
  },
  {
    id: 'c6',
    title: 'Machine Learning Foundations',
    subtitle: 'The math and intuition behind modern ML — no black boxes',
    category: 'AI & ML',
    level: 'Intermediate',
    description: 'Understand supervised learning, regularization, bias-variance and evaluation like an engineer.',
    about:
      'This course strips away the hype and rebuilds machine learning from its mathematical foundations. Expect derivations, intuition and clean code for every core algorithm.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2000&auto=format&fit=crop',
    gradient: 'from-cyan-500 via-sky-500 to-blue-600',
    duration: '20h',
    lessonsCount: 14,
    students: 10420,
    rating: 4.8,
    reviews: 1560,
    instructor: { id: 'i6', name: 'Jin Park', role: 'Research Scientist, DeepMind', initials: 'JP' },
    modules: [
      {
        id: 'm1',
        title: 'The Learning Problem',
        lessons: [
          videoLesson('What does "learning" mean?', '09:25', true),
          videoLesson('Features, labels and objectives', '13:15'),
        ],
      },
      {
        id: 'm2',
        title: 'Supervised Learning',
        lessons: [
          videoLesson('Gradient descent, step by step', '17:40'),
          videoLesson('Overfitting and regularization', '15:30'),
          videoLesson('Bias-variance tradeoff', '12:50'),
        ],
      },
      {
        id: 'm3',
        title: 'Evaluation & Practice',
        lessons: [
          videoLesson('Cross-validation strategies', '14:10'),
          videoLesson('Metrics beyond accuracy', '16:05'),
          lesson('ML foundations quiz', '12min', 'quiz'),
        ],
      },
      {
        id: 'm4',
        title: 'Beyond Basics',
        lessons: [
          videoLesson('Ensembles and boosting', '18:20'),
          videoLesson('Feature engineering', '13:35'),
        ],
      },
    ],
    tags: ['ML', 'Statistics', 'Python', 'Math'],
    enrollmentStatus: 'recommended',
  },
  {
    id: 'c7',
    title: 'TypeScript Masterclass',
    subtitle: 'Erase entire classes of bugs with types that actually earn their keep',
    category: 'Web Development',
    level: 'Intermediate',
    description: 'Generics, type gymnastics, discriminated unions and architecting apps with strict TypeScript.',
    about:
      'Go well beyond "TypeScript for JavaScript devs". Learn to model your domain precisely, design APIs that are impossible to misuse, and leverage the type system as a living documentation layer.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1974&auto=format&fit=crop',
    gradient: 'from-indigo-500 via-blue-500 to-cyan-400',
    duration: '15h 20m',
    lessonsCount: 12,
    students: 8800,
    rating: 4.9,
    reviews: 1420,
    instructor: { id: 'i7', name: 'Lucas Martin', role: 'TS Maintainer, Microsoft', initials: 'LM' },
    modules: [
      {
        id: 'm1',
        title: 'Beyond the Basics',
        lessons: [
          videoLesson('Strict mode and what it buys you', '10:40', true),
          videoLesson('Literal types and unions', '12:25'),
        ],
      },
      {
        id: 'm2',
        title: 'Generics & Utility Types',
        lessons: [
          videoLesson('Generics, from function to framework', '16:30'),
          videoLesson('Utility types and satisfies', '14:15'),
          videoLesson('Conditional types in practice', '17:05'),
        ],
      },
      {
        id: 'm3',
        title: 'Architecting with Types',
        lessons: [
          videoLesson('Discriminated unions for state machines', '15:40'),
          videoLesson('Type-safe API clients', '13:55'),
          lesson('TypeScript quiz', '10min', 'quiz'),
        ],
      },
    ],
    tags: ['TypeScript', 'React', 'Architecture'],
    enrollmentStatus: 'open',
  },
  {
    id: 'c8',
    title: 'Backend Engineering with Node.js',
    subtitle: 'Design reliable services with Express, Redis, queues and observability',
    category: 'Backend',
    level: 'Intermediate',
    description: 'From a hello-world server to a production service with caching, rate limiting and tests.',
    about:
      'This course treats backend engineering as an engineering discipline — not just "writing routes". You will design for failure, performance and observability while building a real service.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2069&auto=format&fit=crop',
    gradient: 'from-emerald-500 via-green-500 to-teal-600',
    duration: '24h 40m',
    lessonsCount: 16,
    students: 7650,
    rating: 4.7,
    reviews: 1120,
    instructor: { id: 'i8', name: 'Amara Diallo', role: 'Backend Lead, Supabase', initials: 'AD' },
    modules: [
      {
        id: 'm1',
        title: 'Async Engineering',
        lessons: [
          videoLesson('The event loop, demystified', '14:30', true),
          videoLesson('Streams and backpressure', '13:15', true),
        ],
      },
      {
        id: 'm2',
        title: 'Designing Services',
        lessons: [
          videoLesson('Building REST APIs the painful way (then fixing it)', '16:40'),
          videoLesson('Rate limiting and security headers', '12:30'),
          videoLesson('Caching with Redis', '15:20'),
        ],
      },
      {
        id: 'm3',
        title: 'Resilience & Observability',
        lessons: [
          videoLesson('Structured logging', '11:10'),
          videoLesson('Error handling and retries', '13:40'),
          videoLesson('Intro to tracing', '12:25'),
          lesson('API service project', '3h', 'project'),
        ],
      },
    ],
    tags: ['Node.js', 'Express', 'Redis', 'DevOps'],
    enrollmentStatus: 'enrolled',
    progress: 68,
  },
];