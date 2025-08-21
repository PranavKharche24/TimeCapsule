import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserSettings } from '@/types/api';

interface AuthStore {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  settings: UserSettings | null;

  // Authentication actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  
  // Loading and error states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // User profile actions
  updateUser: (updates: Partial<User>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;

  // Session management
  refreshToken: () => Promise<void>;
  isTokenValid: () => boolean;
  getAuthHeader: () => string | null;

  // Utility actions
  hasPermission: (permission: string) => boolean;
  isEmailVerified: () => boolean;
  
  // Reset
  reset: () => void;
}

const initialState = {
  user: null as User | null,
  token: null as string | null,
  isAuthenticated: false,
  loading: false,
  error: null as string | null,
  settings: null as UserSettings | null,
};

const defaultSettings: UserSettings = {
  emailNotifications: true,
  reminderNotifications: true,
  publicProfile: false,
  communityContributions: true,
  theme: 'system',
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Basic setters
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        }),

      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token && !!get().user,
        }),

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          loading: false,
          error: null,
          settings: user.settings || defaultSettings,
        }),

      logout: () => {
        // Clear all auth data
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null,
          settings: null,
        });

        // Clear other related storage
        localStorage.removeItem('capsuleDraft');
        localStorage.removeItem('timecapsule-theme');
        
        // Clear any cached data
        if (typeof window !== 'undefined') {
          // Clear any cached API responses
          window.location.reload();
        }
      },

      setLoading: (loading) =>
        set({ loading }),

      setError: (error) =>
        set({ error, loading: false }),

      clearError: () =>
        set({ error: null }),

      // Profile updates
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
          error: null,
        })),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: state.settings ? { ...state.settings, ...newSettings } : newSettings as UserSettings,
          error: null,
        })),

      // Session management
      refreshToken: async () => {
        const { token } = get();
        if (!token) return;

        try {
          set({ loading: true });

          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to refresh token');
          }

          const data = await response.json();
          
          set({
            token: data.token,
            loading: false,
            error: null,
          });
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().logout();
        }
      },

      isTokenValid: () => {
        const { token } = get();
        if (!token) return false;

        try {
          // Decode JWT to check expiration
          const payload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Date.now() / 1000;
          
          return payload.exp > currentTime;
        } catch {
          return false;
        }
      },

      getAuthHeader: () => {
        const { token } = get();
        return token ? `Bearer ${token}` : null;
      },

      // Utility functions
      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;

        // Basic permission checks
        switch (permission) {
          case 'create_capsule':
            return true; // All authenticated users can create capsules
          case 'create_public_capsule':
            return user.settings?.communityContributions !== false;
          case 'delete_capsule':
            return true; // Users can delete their own capsules
          case 'admin':
            return user.role === 'admin'; // If role system is implemented
          default:
            return false;
        }
      },

      isEmailVerified: () => {
        const { user } = get();
        return user?.emailVerified === true;
      },

      reset: () =>
        set(initialState),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        settings: state.settings,
      }),
    }
  )
);

// Auto-refresh token when it's about to expire
if (typeof window !== 'undefined') {
  setInterval(() => {
    const { token, isAuthenticated, refreshToken } = useAuthStore.getState();
    
    if (isAuthenticated && token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        const timeUntilExpiry = payload.exp - currentTime;
        
        // Refresh if token expires in less than 5 minutes
        if (timeUntilExpiry < 300) {
          refreshToken();
        }
      } catch (error) {
        console.error('Error checking token expiry:', error);
      }
    }
  }, 60000); // Check every minute
}

// Request interceptor to automatically add auth header
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  
  window.fetch = function(...args) {
    const [url, options = {}] = args;
    
    // Only add auth header to API requests
    if (typeof url === 'string' && url.startsWith('/api')) {
      const { getAuthHeader } = useAuthStore.getState();
      const authHeader = getAuthHeader();
      
      if (authHeader) {
        options.headers = {
          ...options.headers,
          'Authorization': authHeader,
        };
      }
    }
    
    return originalFetch(url, options);
  };
}

export default useAuthStore;
