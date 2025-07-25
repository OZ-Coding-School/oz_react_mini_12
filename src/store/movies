import { create } from "zustand";
import {
  fetchCertification,
  fetchGenres,
  fetchPopularMovies,
} from "../api/tmbi";

export const useMovieStore = create((set, get) => ({
  movies: [],
  slideMovies: [],
  loading: false,
  err: null,
  genreMap: {},

  fetchInitialGenres: async () => {
    try {
      const genres = await fetchGenres();
      set({ genreMap: genres });
    } catch (e) {
      console.error("genre error:", e);
    }
  },

  fetchInitialMovies: async (pages = 10) => {
    set({ loading: true, err: null });

    try {
      let allMovies = [];
      for (let page = 1; page <= pages; page++) {
        const res = await fetchPopularMovies(page);
        const tagged = res.map((movie) => ({
          ...movie,
          sourcePage: page,
        }));
        allMovies = allMovies.concat(tagged);
      }

      // 각 영화 등급 가져오기
      const enriched = await Promise.all(
        allMovies.map(async (movie) => {
          const certification = await fetchCertification(movie.id);
          return {
            ...movie,
            certification,
          };
        })
      );

      // 등급에 따라 필터링
      const filtered = enriched.filter(
        (m) => m.certification && !bannedRatings.includes(m.certification)
      );

      // console.log("allMovies:", allMovies);
      console.log("allMovies length:", allMovies.length);
      // console.log("filtered:", filtered);
      console.log("filtered length:", filtered.length);

      //   const safeMovies = allMovies.filter((m) => !m.adult && isSafe(m));
      //   set({ movies: safeMovies, loading: false });

      set({ movies: filtered, loading: false });
      set({ slideMovies: get().movies.filter((m) => m.sourcePage === 1) });
    } catch (e) {
      set({ err: e, loading: false });
    }
  },

  sortMoviesBy: (key) => {
    set((state) => ({
      movies: [...state.movies].sort((a, b) => b[key] - a[key]),
    }));
  },

  getMovieById: (id) => {
    if (!id) {
      console.log("id error");
    }
    if (!Array.isArray(get().movies)) {
      console.log("movies store is empty");
      return null;
    }
    return get().movies.find((el) => el.id === id);
  },
}));

// 필터링할 등급들
const bannedRatings = ["R", "NC-17", "NR"];

// 키워드에 따른 필터링 => 사용x
// const bannedKeywords = [
//   "sex",
//   "mistress",
//   "erotic",
//   "porno",
//   "nudity",
//   "nude",
//   "orgy",
//   "playboy",
// ];
// function isSafe(movie) {
//   const text = `${movie.title} ${movie.overview}`.toLowerCase();
//   return !bannedKeywords.some((keyword) => text.includes(keyword));
// }
