import { create } from "zustand";

export const useLoginStore = create((set, get) => ({
  isLogIn: false,
  user: null,
  likes: [],

  login: (userData) => {
    set(() => ({
      user: userData,
      isLogIn: true,
      likes: userData.likes ?? [],
    }));
  },

  logout: () =>
    set(() => ({
      user: null,
      isLogIn: false,
      likes: [],
    })),

  //   초기화
  setLikes: (likes) => set(() => ({ likes: likes ?? [] })),

  //   하나 추가
  addLike: (movie) => {
    const { movie_id, title, poster_path } = movie;
    set((state) => ({
      likes: [...state.likes, { movie_id, title, poster_path }],
    }));
  },

  //   하나 제거
  removeLike: (id) => {
    set((state) => ({
      likes: [state.likes.filter((el) => el.id !== id)],
    }));
  },
}));
