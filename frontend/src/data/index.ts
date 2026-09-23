import { type Course, type Quiz } from '../types';
import { coursesA } from './coursesA';
import { coursesB } from './coursesB';
import { coursesC } from './coursesC';
import { quizzesA } from './quizzesA';
import { quizzesB } from './quizzesB';

export { mockUser, todayIso, mockActivityPoints, mockNotifications } from './user';
export { mockWeeklyActivity, mockSkills, mockAchievements } from './analytics';
export { mockPlan } from './planner';
export { mockPracticeSessions } from './practice';
export { mockProjects } from './projects';
export { mockCommunityPosts, mockCommunityMembers } from './community';
export { mockAIPrompts, mockAIReplies, initialChatMessages } from './ai';

export const mockCourses: Course[] = [...coursesA, ...coursesB, ...coursesC];
export const mockQuizzes: Quiz[] = [...quizzesA, ...quizzesB];