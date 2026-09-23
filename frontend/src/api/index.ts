import type { AuthResponse, User } from '../types';

const mockUser: User = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@zuno.dev',
  goal: 'Build strong learning habits and AI-assisted skills.',
  skillLevel: 'Intermediate',
  interests: ['AI', 'Productivity', 'Programming'],
  initials: 'DU',
  streak: 12,
  xp: 2450,
  rank: 'Rising Learner',
  joinedAt: '2025-01-12',
};

export const api = {
  async login(email: string, _password: string): Promise<AuthResponse> {
    return {
      token: 'demo-token',
      user: {
        ...mockUser,
        email,
        name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
      },
    };
  },

  async register(userData: { name: string; email: string; password: string }): Promise<AuthResponse> {
    return {
      token: 'demo-token',
      user: {
        ...mockUser,
        name: userData.name,
        email: userData.email,
        initials: userData.name
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase() ?? '')
          .join('') || 'DU',
      },
    };
  },
};

export default api;
