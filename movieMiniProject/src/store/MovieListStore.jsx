import { create } from "zustand";

export const useMovieListStore = create((set) => ({
  popularMovieList: [],
  topRatedMovieList: [],
  nowPlayingMovieList: [],
  upcomingMovieList: [],
  isLoading: false,

  getPopularMovieList: async (page) => {
    try {
      set({ isLoading: true });
      const { VITE_API_TOKEN } = import.meta.env;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${VITE_API_TOKEN}`,
        },
      };
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
        options
      );
      const data = await res.json();
      if (res.ok) {
        set((state) => ({
          popularMovieList: [...state.popularMovieList, ...data.results],
        }));
      }
    } catch (error) {
      console.log(`error : `, error);
    } finally {
      set({ isLoading: false });
    }
  },
  getTopRatedMovieList: async (page) => {
    try {
      set({ isLoading: true });
      const { VITE_API_TOKEN } = import.meta.env;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${VITE_API_TOKEN}`,
        },
      };
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${page}`,
        options
      );
      const data = await res.json();
      if (res.ok) {
        set((state) => ({
          topRatedMovieList: [...state.topRatedMovieList, ...data.results],
        }));
      }
    } catch (error) {
      console.log(`error : `, error);
    } finally {
      set({ isLoading: false });
    }
  },
  getNowPlayingMovieList: async (page) => {
    try {
      set({ isLoading: true });
      const { VITE_API_TOKEN } = import.meta.env;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${VITE_API_TOKEN}`,
        },
      };
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${page}`,
        options
      );
      const data = await res.json();
      if (res.ok) {
        set((state) => ({
          nowPlayingMovieList: [...state.nowPlayingMovieList, ...data.results],
        }));
        return data;
      }
    } catch (error) {
      console.log(`error : `, error);
    } finally {
      set({ isLoading: false });
    }
  },
  getUpcomingMovieList: async (page) => {
    try {
      set({ isLoading: true });
      const { VITE_API_TOKEN } = import.meta.env;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${VITE_API_TOKEN}`,
        },
      };
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=${page}`,
        options
      );
      const data = await res.json();
      if (res.ok) {
        set((state) => ({
          upcomingMovieList: [...state.upcomingMovieList, ...data.results],
        }));
      }
    } catch (error) {
      console.log(`error : `, error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useMovieDetailDataStore = create((set) => ({
  movieDetailData: {},
  isLoading: false,
  getMovieDetailData: async (movieId) => {
    try {
      set({ isLoading: true });
      const { VITE_API_TOKEN } = import.meta.env;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${VITE_API_TOKEN}`,
        },
      };
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
        options
      );
      const data = await res.json();
      if (res.ok) {
        set({ movieDetailData: data });
      }
    } catch (error) {
      console.log(`error : `, error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useFavoriteMovieListStore = create((set) => ({
  favoriteMovieList: [],

  addToFavorites: (newMovie) => {
    set((state) => ({
      favoriteMovieList: [...state.favoriteMovieList, newMovie],
    }));
  },

  removeFromFavorites: (movie) => {
    set(
      (state) =>
        state.favoriteMovieList.indexOf(movie) !== -1 &&
        state.favoriteMovieList.splice(
          state.favoriteMovieList.indexOf(movie),
          1
        )
    );
  },
}));
