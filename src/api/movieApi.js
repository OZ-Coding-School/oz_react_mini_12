import axios from 'axios';

// TMDB API 기본 URL 및 이미지 기본 URL
const API_KEY = 'b795f4c3cf84a1200c4028340fb3e537'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; 

// 인기 영화 목록 가져오기
export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: 'ko-KR', page: 1 }, 
    });
    return response.data.results; 
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// 특정 영화 상세 정보 가져오기
export const fetchMovieDetail = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: API_KEY, language: 'ko-KR' }, 
    });
    return response.data; 
  } catch (error) {
    console.error(`Error fetching movie detail for ID ${movieId}:`, error);
    throw error;
  }
};

// 이미지 URL 생성 헬퍼 함수
export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : 'https://placehold.co/500x750/cccccc/000000?text=No+Poster'; // 이미지가 없으면 대체 이미지
};
