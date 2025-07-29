import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      params: {
        language: 'ko-KR'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const fetchMovieDetail = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      params: {
        language: 'ko-KR'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie detail for ID ${movieId}:`, error);
    throw error;
  }
};

export const getImageUrl = (path) => {
  if (!path) {
    return 'https://placehold.co/500x750/cccccc/000000?text=No+Image';
  }
  return `${IMAGE_BASE_URL}${path}`;
};
