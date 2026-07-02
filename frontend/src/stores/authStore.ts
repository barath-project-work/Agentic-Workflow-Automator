import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ROLE_USER' | 'ROLE_MANAGER' | 'ROLE_ADMIN';
  jobTitle?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isDemo: boolean;
  login: (token: string, user: User, isDemo?: boolean) => void;
  logout: () => void;
}

function getStoredToken(): string | null {
  return localStorage.getItem('atlasai_token');
}

function getStoredUser(): User | null {
  const stored = localStorage.getItem('atlasai_user');
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    localStorage.removeItem('atlasai_user');
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getStoredToken(),
  user: getStoredUser(),
  isAuthenticated: getStoredToken() !== null && getStoredUser() !== null,
  isDemo: localStorage.getItem('atlasai_demo') === 'true',

  login: (token: string, user: User, isDemo = false) => {
    localStorage.setItem('atlasai_token', token);
    localStorage.setItem('atlasai_user', JSON.stringify(user));
    if (isDemo) {
      localStorage.setItem('atlasai_demo', 'true');
    }
    set({ token, user, isAuthenticated: true, isDemo });
  },

  logout: () => {
    localStorage.removeItem('atlasai_token');
    localStorage.removeItem('atlasai_user');
    localStorage.removeItem('atlasai_demo');
    set({ token: null, user: null, isAuthenticated: false, isDemo: false });
  },
}));
