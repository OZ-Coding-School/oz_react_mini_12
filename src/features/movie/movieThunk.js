import { createAsyncThunk } from "@reduxjs/toolkit";
import { popularMovies } from "../../api/movieList";

export const fetchPopularMovie = createAsyncThunk(
  "movie/fetchPopularMovie",
  async (page, { rejectWithValue }) => {
    try {
      const response = await popularMovies(page);
      const nonAdultPopularMovies = response.results.filter(
        (movie) => movie.adult === false
      );
      return { ...response, results: nonAdultPopularMovies };
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);
