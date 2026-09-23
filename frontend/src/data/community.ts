import { type CommunityPost, type CommunityMember } from '../types';

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'cm1',
    author: 'Priya Nair',
    initials: 'PN',
    time: '2h ago',
    content:
      'Just finished the Hooks module in React Mastery — the useEffect mental model finally clicked for me. Dragging the "dependency vs re-run" analogy into every effect now. Ask me anything about the course!',
    likes: 48,
    comments: 12,
    tags: ['React', 'Wins'],
    liked: false,
  },
  {
    id: 'cm2',
    author: 'Tomás Silva',
    initials: 'TS',
    time: '5h ago',
    content:
      'Pro tip for the DSA course: before attempting sliding window problems, write out the window invariant in plain English. It turns the whole approach from memorization into reasoning.',
    likes: 96,
    comments: 23,
    tags: ['DSA', 'Tips'],
    liked: true,
  },
  {
    id: 'cm3',
    author: 'Maya Kapoor',
    initials: 'MK',
    time: '8h ago',
    content:
      'Shipped my first full-stack app to a real URL today. DB → API → UI → CI/CD, the entire loop. Hang in there, everyone — the "Full-Stack Engineering" course pays off.',
    likes: 134,
    comments: 31,
    tags: ['Full-Stack', 'Wins'],
    liked: true,
  },
  {
    id: 'cm4',
    author: 'Omar Haddad',
    initials: 'OH',
    time: '1d ago',
    content:
      'Question for the ML folks: how do you decide between regularization strength tuning vs feature selection when a model is overfitting? Existing dataset is ~12k rows.',
    likes: 27,
    comments: 44,
    tags: ['ML', 'Ask'],
    liked: false,
  },
  {
    id: 'cm5',
    author: 'Sofia Mendez',
    initials: 'SM',
    time: '1d ago',
    content:
      'Built a small habit: before opening any socials in the morning I do one 10-minute ZUNO lesson. 3 weeks in, that is 21 lessons — a full module I would have skipped otherwise.',
    likes: 212,
    comments: 36,
    tags: ['Habits', 'Wins'],
    liked: false,
  },
];

export const mockCommunityMembers: CommunityMember[] = [
  { id: 'u1', name: 'Aarav Sharma', initials: 'AS', xp: 2840, streak: 14 },
  { id: 'u2', name: 'Priya Nair', initials: 'PN', xp: 5120, streak: 21 },
  { id: 'u3', name: 'Omar Haddad', initials: 'OH', xp: 4450, streak: 9 },
  { id: 'u4', name: 'Maya Kapoor', initials: 'MK', xp: 3900, streak: 16 },
  { id: 'u5', name: 'Sofia Mendez', initials: 'SM', xp: 3310, streak: 11 },
];