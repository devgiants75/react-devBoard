import { create } from 'zustand';
import { User } from '../utils/types';

// 전체 회원 상태 정의
interface UserState {
  users: User[];
  addUser: (user: User) => void; // 회원 추가
  updateUser: (id: number, name: string, email: string) => void;
  deleteUser: (id: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user]
    })),
  updateUser: (id, name, email) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, name, email } : user
      )
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id)
    }))
}));
