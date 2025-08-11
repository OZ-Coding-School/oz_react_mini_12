import { create } from "zustand";
import {
  fetchGenres,
  fetchPopularMovies,
  fetchTodayPopularMovies,
} from "../api/tmbi";

export const useMovieStore = create((set, get) => ({
  movies: [],
  slideMovies: [],
  loading: false,
  err: null,
  genreMap: {},
  page: 1,

  fetchInitialGenres: async () => {
    try {
      const genreMap = await fetchGenres();
      set({ genreMap: genreMap });
    } catch (e) {
      console.error("genre error:", e);
    }
  },

  fetchInitialMovies: async () => {
    set({ loading: true, err: null });

    try {
      const slideMovies = await fetchTodayPopularMovies();
      // let allMovies = [];

      // for (let page = 1; page <= pages; page++) {
      //   const res = await fetchPopularMovies(page);
      //   const tagged = res.map((movie) => ({
      //     ...movie,
      //     sourcePage: page,
      //   }));
      //   allMovies = allMovies.concat(tagged);
      // }

      // 확인용
      // console.log(allMovies);
      // console.log(slideMovies);

      const res = await fetchPopularMovies();
      // 일단 1페이지만 로드

      set({
        movies: res,
        slideMovies: slideMovies,
        loading: false,
      });
    } catch (e) {
      set({ err: e, loading: false });
    }
  },

  fetchMoreMovies: async () => {
    const currentPage = get().page;

    try {
      const res = await fetchPopularMovies(currentPage + 1);
      set((state) => ({
        movies: [...state.movies, ...res],
        page: currentPage + 1,
      }));
    } catch (e) {
      set({ err: e });
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

// 등급에 따라 필터링
// 필터링할 등급들
// const bannedRatings = ["R", "NC-17", "NR"];

// // 각 영화 등급 가져오기
// const enriched = await Promise.all(
//   allMovies.map(async (movie) => {
//     const certification = await fetchCertification(movie.id);
//     return {
//       ...movie,
//       certification,
//     };
//   })
// );

//
// const filtered = enriched.filter(
//   (m) => m.certification && !bannedRatings.includes(m.certification)
// );
