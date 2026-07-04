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
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

function getStored(key: string): string | null {
  return localStorage.getItem(key);
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
  token: getStored('atlasai_token'),
  refreshToken: getStored('atlasai_refresh_token'),
  user: getStoredUser(),
  isAuthenticated: getStored('atlasai_token') !== null && getStoredUser() !== null,

  login: (accessToken: string, refreshToken: string, user: User) => {
    localStorage.setItem('atlasai_token', accessToken);
    localStorage.setItem('atlasai_refresh_token', refreshToken);
    localStorage.setItem('atlasai_user', JSON.stringify(user));
    set({ token: accessToken, refreshToken, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('atlasai_token');
    localStorage.removeItem('atlasai_refresh_token');
    localStorage.removeItem('atlasai_user');
    set({ token: null, refreshToken: null, user: null, isAuthenticated: false });
  },

  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('atlasai_token', accessToken);
    localStorage.setItem('atlasai_refresh_token', refreshToken);
    set({ token: accessToken, refreshToken });
  },
}));
