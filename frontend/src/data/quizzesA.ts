import { type Quiz } from '../types';

export const quizzesA: Quiz[] = [
  {
    id: 'q1',
    courseId: 'c1',
    lessonId: 'what-is-react-really',
    title: 'React Foundations Check',
    description: 'Six questions covering the component model, JSX and data flow.',
    timeLimit: 8,
    questions: [
      {
        id: 'q1-1',
        text: 'What does the virtual DOM help React achieve?',
        options: [
          'Write slower rendering code',
          'Render like vanilla DOM writes',
          'Minimize direct DOM mutation costs',
          'Replace the browser DOM entirely',
        ],
        correctAnswer: 0,
        explanation:
          'React keeps a lightweight virtual representation and diffs it to issue minimal, batched real-DOM updates.',
      },
      {
        id: 'q1-2',
        text: 'Which of the following is a way to pass data from parent to child?',
        options: ['State', 'Props', 'Refs', 'Events'],
        correctAnswer: 1,
        explanation: 'Props flow one-way down from parent to child components.',
      },
      {
        id: 'q1-3',
        text: 'In React, what is the recommended way to derive data from state?',
        options: [
          'Compute it during render',
          'Store it in the DOM',
          'Duplicate it in refs',
          'Mutate the state object',
        ],
        correctAnswer: 0,
        explanation: 'Computation during render keeps a single source of truth and stays predictable.',
      },
      {
        id: 'q1-4',
        text: 'Which hook is used to replace useState for complex state transitions?',
        options: ['useEffect', 'useMemo', 'useReducer', 'useLayoutEffect'],
        correctAnswer: 2,
        explanation: 'useReducer centralizes the transition logic when a component has complex state shapes.',
      },
      {
        id: 'q1-5',
        text: 'Keys in a list are important because they...',
        options: [
          'Improve bundle size',
          'Help React track elements across re-renders',
          'Are required for useMemo',
          'Enable server-side rendering',
        ],
        correctAnswer: 1,
        explanation: 'Stable keys let React reconcile lists correctly across re-renders.',
      },
      {
        id: 'q1-6',
        text: 'StrictMode in development is used to...',
        options: [
          'Minify your bundle',
          'Enforce prop types',
          'Surface impure render functions',
          'Disable memoization',
        ],
        correctAnswer: 2,
        explanation: 'StrictMode double-invokes renders to help you spot impure or unsafe side effects.',
      },
    ],
  },
  {
    id: 'q2',
    courseId: 'c2',
    lessonId: 'numpy-vectorized-thinking',
    title: 'Python & NumPy Essentials',
    description: 'Check your Python data skills before moving to models.',
    timeLimit: 10,
    questions: [
      {
        id: 'q2-1',
        text: 'In NumPy, what does vectorization primarily buy you?',
        options: [
          'Cleaner syntax only',
          'C-level performance with Python-level ergonomics',
          'Automatic GPU usage',
          'Smaller memory footprint guarantees',
        ],
        correctAnswer: 1,
        explanation: 'Vectorized operations push loops down to compiled C, combining speed with readability.',
      },
      {
        id: 'q2-2',
        text: 'Which pandas command groups rows and applies an aggregate?',
        options: ['df.map()', 'df.pivot()', 'df.groupby()', 'df.merge()'],
        correctAnswer: 0,
        explanation:
          'df.groupby() splits data into groups so you can apply aggregation functions (groupby is at index 0 here).',
      },
      {
        id: 'q2-3',
        text: 'A shape (3, 4) array broadcast against a shape (4,) array is valid because...',
        options: [
          'Broadcasting always works',
          'The dimensions share a trailing match',
          'NumPy adds dummy rows',
          'It triggers a silent reshape',
        ],
        correctAnswer: 1,
        explanation: 'During broadcasting, dimensions are aligned from the trailing edge — (4,) aligns with (4).',
      },
      {
        id: 'q2-4',
        text: 'What does np.linspace(0, 1, 5) produce?',
        options: [
          'Five evenly spaced numbers from 0 to 1',
          'Five random numbers between 0 and 1',
          'An array of 0s then 1s',
          'A single value of 0.5 repeated',
        ],
        correctAnswer: 0,
        explanation: 'linspace generates n evenly spaced values inclusive of both endpoints.',
      },
    ],
  },
  {
    id: 'q3',
    courseId: 'c4',
    lessonId: 'authentication-essentials',
    title: 'Backend & Security Check',
    description: 'A quick pulse-check on auth and backend fundamentals.',
    timeLimit: 8,
    questions: [
      {
        id: 'q3-1',
        text: 'JWT tokens are best stored in...',
        options: [
          'localStorage',
          'An httpOnly cookie',
          'A global variable',
          'The URL query string',
        ],
        correctAnswer: 1,
        explanation: 'An httpOnly cookie is not readable by JavaScript, reducing XSS token exfiltration.',
      },
      {
        id: 'q3-2',
        text: 'When should you hash a stored password?',
        options: [
          'Only before sending it to the client',
          'Never — encryption is enough',
          'On write, with a per-user salt',
          'Only for admin accounts',
        ],
        correctAnswer: 2,
        explanation: 'One-way hashing with a unique salt protects passwords even if the database leaks.',
      },
      {
        id: 'q3-3',
        text: 'CORS is primarily a...',
        options: [
          'Server performance concern',
          'Browser-based security control',
          'Database replication setting',
          'Cache invalidation strategy',
        ],
        correctAnswer: 1,
        explanation: 'CORS is enforced by browsers to decide which cross-origin requests a page may issue.',
      },
    ],
  },
];