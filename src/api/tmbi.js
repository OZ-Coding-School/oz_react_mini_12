// src/api/tmdb.js
import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 인기 영화 목록 불러오기
export async function fetchPopularMovies(page = 1) {
  try {
    const res = await tmdb.get("/movie/popular", {
      params: {
        sort_by: "popularity.desc",
        include_adult: false,
        page: page,
        language: "ko-KR",
      },
    });

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

// 장르 목록-id 맵 불러오기
export async function fetchGenres() {
  try {
    const res = await tmdb.get("/genre/movie/list", {
      params: {
        language: "ko-KR",
      },
    });

    const data = res.data; 
    let genreMap = data.genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});

    return genreMap;
  } catch (error) {
    console.error("TMDB 장르 API 오류:", error);
    throw error;
  }
}

// 연령등급 불러오기
export async function fetchCertification(movieId, country = "US") {
  try {
    const res = await tmdb.get(`/movie/${movieId}/release_dates`);
    const results = res.data.results;

    const target = results.find((r) => r.iso_3166_1 === country);
    if (!target) return null;

    const cert = target.release_dates.find((r) => r.certification?.trim());
    return cert?.certification || null;
  } catch (error) {
    console.error("Certification fetch error:", error);
    return null;
  }
}

