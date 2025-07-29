// src/api/tmdb.js
import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  // baseURL: "/api/tmdb",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 인기 영화 목록 불러오기
export async function fetchPopularMovies(page = 1) {
  try {
    const res = await tmdb.get("/discover/movie", {
      params: {
        certification_country: "KR",
        "certification.lte": "15",
        sort_by: "popularity.desc",
        page: page,
        language: "ko-KR",
      },
    });

    // console.log("fetchPopularMovies:", res)

    return res.data.results;
  } catch (error) {
    console.error("TMDB API 오류:", error);
    throw error;
  }
}

// 이번주의 인기 영화 불러오기
export async function fetchTodayPopularMovies() {
  try {
    const res = await tmdb.get("/trending/movie/week", {
      params: {
        certification_country: "KR",
        "certification.lte": "15",
        sort_by: "popularity.desc",
        language: "ko-KR",
      },
    });

    console.log(res);

    return res.data.results;
  } catch (error) {
    console.error("TMDB API 오류:", error);
    throw error;
  }
}

// 요청받은 영화 하나만 불러오기
export async function fetchMovieById(id) {
  try {
    const res = await tmdb.get(`/movie/${id}`, {
      params: {
        language: "ko-KR",
      },
    });
    if (!res.data.overview) {
      const fallbackRes = await tmdb.get(`/movie/${id}`, {
        params: { language: "en-US" },
      });
      return { ...fallbackRes.data, ...res.data };
    }
    return res.data;
  } catch (error) {
    console.error("TMDB API 오류:", error);
    throw error;
  }
}

// 장르 목록 불러오기
export async function fetchGenres() {
  try {
    const res = await tmdb.get("/genre/movie/list", {
      params: {
        language: "ko-KR",
      },
    });

    // console.log("genreList : ",res)
    const genreMap = res.data.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});

    return genreMap;
  } catch (error) {
    console.error("TMDB 장르 API 오류:", error);
    throw error;
  }
}

// // 연령등급 불러오기
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export async function fetchCertification(movieId, country = "US") {
//   try {
//     await delay(250); // TMDB 요청 제한 회피

//     const res = await tmdb.get(`/movie/${movieId}/release_dates`);
//     const results = res.data.results;

//     const target = results.find((r) => r.iso_3166_1 === country);
//     if (!target) return null;

//     const cert = target.release_dates.find((r) => r.certification?.trim());
//     return cert?.certification || null;
//   } catch (error) {
//     console.error("Certification fetch error:", error);
//     return null;
//   }
// }

// 제목으로 검색
export async function searchMoviesByTitle(title) {
  try {
    const response = await tmdb.get(`/search/movie`, {
      params: {
        query: title,
        language: "ko",
      },
    });

    const movies = response.data.results;

    if (movies.length === 0) {
      return { message: "검색 결과가 없습니다." };
    }

    return movies;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error.message);
    return { error: "영화 검색 중 오류가 발생했습니다." };
  }
}

// 장르별 검색
export async function searchMoviesbyGenre(genre_id) {
  try {
    const res = await tmdb.get("/discover/movie", {
      params: {
        certification_country: "KR",
        "certification.lte": "15",
        sort_by: "popularity.desc",
        // page: page,
        language: "ko-KR",
        with_genres: genre_id,
      },
    });

    // console.log("searchMoviesbyGenre:", res)
    // console.log("genre_id type:", typeof(genre_id));

    return res.data.results;
  } catch (error) {
    console.error("TMDB API 오류:", error);
    throw error;
  }
}
