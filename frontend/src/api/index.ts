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

export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (netErr: any) {
    // Network failure, offline, or CORS failure
    throw new ApiError(
      'Unable to connect to the server. Please check your internet connection or verify the server is running.',
      0
    );
  }

  let data: any = {};
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    // Session expired or invalid token
    if (response.status === 401 && !endpoint.includes('/api/auth/')) {
      removeToken();
      const authMsg = data.message || data.error || 'Your session has expired. Please sign in again.';
      throw new ApiError(authMsg, 401, data);
    }

    // Validation / user-facing errors
    const errorMsg =
      data.message ||
      data.error ||
      (Array.isArray(data.errors) ? data.errors.join(', ') : null) ||
      (response.status === 404
        ? 'The requested resource was not found.'
        : response.status >= 500
        ? 'A server error occurred. Please try again later.'
        : `Request failed with status ${response.status}`);

    throw new ApiError(errorMsg, response.status, data);
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

  // 10. Profile
  async getProfile(): Promise<{ user: User }> {
    return request<{ user: User }>('/api/profile');
  },

  // 11. AI Tutor
  async askAiTutor(data: {
    question: string;
    topic?: string;
    history?: Array<{ role: string; content: string }>;
  }): Promise<{ answer: string }> {
    return request<{ answer: string }>('/api/ai-tutor', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export default api;
