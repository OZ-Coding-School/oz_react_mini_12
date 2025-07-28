import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,                  // 현재 로그인한 사용자 정보
      isLoggedIn: false,           // 로그인 여부

      login: (userData) =>
        set({ user: userData, isLoggedIn: true }),

      logout: () =>
        set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 키 이름
    }
  )
);

export default useAuthStore;