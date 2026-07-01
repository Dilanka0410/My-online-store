import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  welcomeMessage: '',
  login: (user) =>
    set({
      user: {
        fullName: user.fullName || user.name || 'Guest',
        email: user.email || '',
      },
      welcomeMessage: `Welcome back, ${user.fullName || user.name || 'Guest'}!`,
    }),
  setUser: (user) =>
    set({
      user: {
        fullName: user.fullName || user.name || 'Guest',
        email: user.email || '',
      },
      welcomeMessage: user.fullName ? `Welcome back, ${user.fullName}!` : '',
    }),
  clearUser: () => set({ user: null, welcomeMessage: '' }),
  logout: () => set({ user: null, welcomeMessage: '' }),
}));

export default useUserStore;
