import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice'; // 영화 슬라이스 임포트

export const store = configureStore({
  reducer: {
    movies: movieReducer, // 'movies'라는 이름으로 movieReducer 연결
  },
});
