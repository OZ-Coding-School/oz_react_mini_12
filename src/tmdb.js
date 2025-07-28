// src/api/tmdb.js

// .env 파일에 저장한 API 키를 가져옴
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
// TMDb API의 기본 URL.
const BASE_URL = 'https://api.themoviedb.org/3'; 

/**
 * 인기 영화 목록을 가져오는 함수
 * adult가 false(성인 영화 아님)인 영화만 필터링해서 반환함.
 */
export async function fetchPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
    if (!response.ok) { // 응답이 성공적이지 않으면 에러 처리
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // adult가 false인 영화만 필터링해서 반환 (성인 영화 제외)
    const filtered = data.results.filter(movie => movie.adult === false);
    return filtered;
  } catch (error) {
    console.error("인기 영화 목록을 가져오는 중 오류 발생:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

/**
 * 특정 영화의 상세 정보를 가져오는 함수
 * @param {string} id - 영화의 ID
 */
export async function fetchMovieDetail(id) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`);
    if (!response.ok) { // 응답이 성공적이지 않으면 에러 처리
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`영화 상세 정보 (ID: ${id})를 가져오는 중 오류 발생:`, error);
    return null; // 에러 발생 시 null 반환
  }
}