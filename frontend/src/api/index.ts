import type {
  AuthResponse,
  User,
  ApiCourse,
  ApiTopic,
  ApiQuiz,
  CourseRecommendation,
  QuizSubmitResponse,
  PerformanceRecommendation,
  CourseProgressData,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getToken = (): string | null => {
  return localStorage.getItem('zuno.token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('zuno.token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('zuno.token');
};

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data as T;
}

export const api = {
  // 1. Auth
  async register(userData: { name: string; email: string; password: string }): Promise<AuthResponse> {
    const res = await request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (res.token) {
      setToken(res.token);
    }
    return res;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      setToken(res.token);
    }
    return res;
  },

  // 2. Onboarding
  async updateOnboarding(data: {
    learningGoal: string;
    skillLevel: string;
    interests: string;
  }): Promise<{ message: string; user: User }> {
    return request<{ message: string; user: User }>('/api/onboarding', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // 3. Courses
  async getCourses(): Promise<ApiCourse[]> {
    return request<ApiCourse[]>('/api/courses');
  },

  async getCourse(courseId: string): Promise<ApiCourse> {
    return request<ApiCourse>(`/api/courses/${courseId}`);
  },

  // 4. AI Recommendations
  async getRecommendations(): Promise<{ recommendations: CourseRecommendation[] }> {
    return request<{ recommendations: CourseRecommendation[] }>('/api/recommendations', {
      method: 'POST',
    });
  },

  // 5. Topic
  async getTopic(topicId: string): Promise<ApiTopic> {
    return request<ApiTopic>(`/api/topics/${topicId}`);
  },

  // 6. Quiz
  async getQuiz(quizId: string): Promise<ApiQuiz> {
    return request<ApiQuiz>(`/api/quizzes/${quizId}`);
  },

  async submitQuiz(
    quizId: string,
    answers: Record<string, string | number>
  ): Promise<QuizSubmitResponse> {
    return request<QuizSubmitResponse>(`/api/quizzes/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  },

  async getQuizAttempts(quizId: string): Promise<{ quizId: string; attempts: any[] }> {
    return request<{ quizId: string; attempts: any[] }>(`/api/quizzes/${quizId}/attempts`);
  },

  // 7. Performance AI Recommendation
  async getPerformance(attemptId: string): Promise<PerformanceRecommendation> {
    return request<PerformanceRecommendation>(`/api/performance/${attemptId}`);
  },

  // 8. Progress
  async getProgress(): Promise<any[]> {
    return request<any[]>('/api/progress');
  },

  async getCourseProgress(): Promise<CourseProgressData[]> {
    return request<CourseProgressData[]>('/api/progress/courses');
  },

  // 9. Dashboard
  async getDashboard(): Promise<{
    user: User;
    progress: any[];
    recentAttempts: any[];
  }> {
    return request<{ user: User; progress: any[]; recentAttempts: any[] }>('/api/dashboard');
  },
};

export default api;
