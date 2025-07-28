import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularMovies as apiFetchPopularMovies } from '../../api/movieApi';

// 비동기 액션: 인기 영화 목록 가져오기
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const movies = await apiFetchPopularMovies();
      return movies;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [], // 영화 목록
    loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
