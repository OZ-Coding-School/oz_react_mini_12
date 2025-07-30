import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularMovies, searchMovies } from '../../api/movieApi';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (searchKeyword, { rejectWithValue }) => {
    try {
      let data;
      if (searchKeyword) {
        data = await searchMovies(searchKeyword);
      } else {
        data = await fetchPopularMovies();
      }

      const filteredMovies = data.results.filter(movie => !movie.adult);
      return filteredMovies;
    } catch (error) {
      return rejectWithValue(error.response?.data?.status_message || error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    loading: 'idle',
    error: null,
  },
  reducers: {
  },
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
        state.list = [];
      });
  },
});

export default movieSlice.reducer;
