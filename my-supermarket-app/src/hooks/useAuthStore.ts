import { create } from 'zustand';
import type { User } from 'firebase/auth';

// Avoid importing services/auth at module load to keep Jest from loading Firebase ESM in tests.
// Define role type locally to prevent runtime imports.
type UserRole = 'Admin' | 'Staff';

type AuthState = {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  error?: string;
  // actions
  initAuthListener: () => void;
  setRole: (role: UserRole | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,
  error: undefined,

  initAuthListener: () => {
    // Dynamically import auth services to avoid loading Firebase at module eval time (helps Jest).
    (async () => {
      try {
        const {
          onAuthStateChangedListener,
          getUserRole,
          getCurrentUser,
        } = await import('../services/auth');

        // Optionally set initial current user quickly (onAuthStateChanged will still fire)
        const current = getCurrentUser();
        if (current) {
          try {
            const role = await getUserRole(current);
            set({ user: current, role: role ?? null, loading: false, error: undefined });
          } catch {
            set({ user: current, role: null, loading: false, error: undefined });
          }
        } else {
          set({ user: null, role: null, loading: false, error: undefined });
        }

        onAuthStateChangedListener(async (fbUser) => {
          try {
            if (fbUser) {
              const role = await getUserRole(fbUser);
              set({ user: fbUser, role: role ?? null, loading: false, error: undefined });
            } else {
              set({ user: null, role: null, loading: false, error: undefined });
            }
          } catch (e) {
            const message = e instanceof Error ? e.message : 'Auth listener error';
            set({ user: fbUser ?? null, role: null, loading: false, error: message });
          }
        });
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Auth init error';
        set({ error: message, loading: false });
      }
    })();
  },

  setRole: (role) => set({ role }),

  clear: () => set({ user: null, role: null, loading: false, error: undefined }),
}));