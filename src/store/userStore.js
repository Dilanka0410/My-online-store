import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      welcomeMessage: '',
      login: (user) =>
        set({
          user: {
            fullName: user.fullName || user.name || 'Guest',
            email: user.email || '',
          },
          welcomeMessage: `Welcome, ${user.fullName || user.name || 'Guest'}!`,
        }),
      setUser: (user) =>
        set({
          user: {
            fullName: user.fullName || user.name || 'Guest',
            email: user.email || '',
          },
          welcomeMessage: user.fullName ? `Welcome, ${user.fullName}!` : '',
        }),
      clearUser: () => set({ user: null, welcomeMessage: '' }),
      logout: () => set({ user: null, welcomeMessage: '' }),
    }),
    {
      name: 'mini-store-user',
    }
  )
);

export default useUserStore;
