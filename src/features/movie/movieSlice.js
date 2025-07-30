import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovie } from "./movieThunk";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    data: {
      results: [],
      page: 0,
      total_pages: 0,
      total_results: 0,
    },
    loading: true,
    error: null,
    currentPage: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPopularMovie.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg === 1) {
          // 첫 페이지 로드 시 데이터 초기화
          state.data = action.payload;
        } else {
          // 다음 페이지 로드 시 기존 데이터에 추가
          state.data.results = [
            ...state.data.results,
            ...action.payload.results,
          ];
          state.data.page = action.payload.page;
          state.data.total_pages = action.payload.total_pages;
          state.data.total_results = action.payload.total_results;
        }
        state.currentPage = action.payload.page;
      });
  },
});

export default movieSlice.reducer;
