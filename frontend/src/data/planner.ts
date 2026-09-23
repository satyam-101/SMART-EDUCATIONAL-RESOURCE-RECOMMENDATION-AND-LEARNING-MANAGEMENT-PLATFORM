import { type PlanTask } from '../types';

const iso = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const mockPlan: PlanTask[] = [
  { id: 'p1', title: 'useEffect — the mental model', type: 'course', date: iso(0), start: '19:00', duration: '18m', status: 'todo', courseId: 'c1' },
  { id: 'p2', title: 'NumPy vectorized practice', type: 'practice', date: iso(0), start: '19:30', duration: '25m', status: 'todo', courseId: 'c2' },
  { id: 'p3', title: 'React Foundations Check', type: 'quiz', date: iso(1), start: '18:00', duration: '10m', status: 'todo', courseId: 'c1' },
  { id: 'p4', title: 'Complexity & Sorting review', type: 'review', date: iso(1), start: '18:30', duration: '20m', status: 'todo' },
  { id: 'p5', title: 'Context vs props drilling', type: 'course', date: iso(2), start: '19:00', duration: '14m', status: 'todo', courseId: 'c1' },
  { id: 'p6', title: 'Clean real datasets', type: 'course', date: iso(2), start: '19:30', duration: '16m', status: 'todo', courseId: 'c2' },
  { id: 'p7', title: 'DSA two-pointer drills', type: 'practice', date: iso(3), start: '17:30', duration: '30m', status: 'todo' },
  { id: 'p8', title: 'What is React, really?', type: 'course', date: iso(-1), start: '19:00', duration: '9m', status: 'done', courseId: 'c1' },
  { id: 'p9', title: 'Variables in Python', type: 'course', date: iso(-1), start: '19:20', duration: '13m', status: 'done', courseId: 'c2' },
  { id: 'p10', title: 'JSX and the component tree', type: 'course', date: iso(-2), start: '18:40', duration: '12m', status: 'done', courseId: 'c1' },
  { id: 'p11', title: 'Props and state flow', type: 'course', date: iso(-2), start: '19:00', duration: '14m', status: 'done', courseId: 'c1' },
];