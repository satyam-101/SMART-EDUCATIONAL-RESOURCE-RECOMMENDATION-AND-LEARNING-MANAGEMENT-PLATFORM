import { createContext, useContext, useEffect, useState } from 'react';
import { api, getToken, removeToken } from '../api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { type User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: { name: string; email: string; password: string }) => Promise<User>;
  saveOnboarding: (data: { learningGoal: string; skillLevel: string; interests: string }) => Promise<User>;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | null>('zuno.user', null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const dash = await api.getDashboard();
          if (dash && dash.user) {
            setUser(dash.user);
          }
        } catch (err) {
          console.warn('Session expired or server unavailable', err);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const res = await api.login(email, password);
    setUser(res.user);
    return res.user;
  };

  const register = async (userData: { name: string; email: string; password: string }): Promise<User> => {
    const res = await api.register(userData);
    setUser(res.user);
    return res.user;
  };

  const saveOnboarding = async (data: { learningGoal: string; skillLevel: string; interests: string }): Promise<User> => {
    const res = await api.updateOnboarding(data);
    const updatedUser = { ...user, ...res.user };
    setUser(updatedUser);
    return updatedUser;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const updateUser = (patch: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user && !!getToken(),
        login,
        register,
        saveOnboarding,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};