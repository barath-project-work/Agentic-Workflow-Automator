import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  demoMode: boolean;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setDemoMode: (demoMode: boolean) => void;
}

function getStoredDemoMode(): boolean {
  const stored = localStorage.getItem('atlasai_demo_mode');
  if (stored === null) return true; // Default to demo mode
  return stored === 'true';
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'light',
  demoMode: getStoredDemoMode(),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme: 'light' | 'dark') => set({ theme }),

  setDemoMode: (demoMode: boolean) => {
    localStorage.setItem('atlasai_demo_mode', String(demoMode));
    set({ demoMode });
  },
}));
