import { create } from 'zustand';
import { User } from '../utils/types';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (id: number, updates: Partial<Pick<User, 'name' | 'email'>>) => void;
  removeUser: (id: number) => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user })),
  updateUser: (id, updates) =>
    set((state) => {
      if (state.user?.id === id) {
        return { ...state, user: { ...state.user, ...updates } };
      }
      return state;
    }),
  removeUser: () => set(() => ({ user: null }))
}));

export default useStore;
