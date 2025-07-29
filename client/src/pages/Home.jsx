// src/pages/Home.jsx
import React from "react";
import MovieList from "../components/MovieList";

const API_BASE = "https://api.themoviedb.org/3";
const LANG = "language=ko-KR";

function Home() {
  return (
    <div>
      <MovieList
        title="🎬 인기 영화"
        fetchUrl={`${API_BASE}/movie/popular?${LANG}`}
        showRank={true}
        itemsPerPage={4}  // 여기 4로 변경
        rows={1}
      />
      <MovieList
        title="📽️ 현재 상영 중"
        fetchUrl={`${API_BASE}/movie/now_playing?${LANG}&region=KR`}
        itemsPerPage={6}
        rows={1}
      />
      <MovieList
        title="🔥 이번 주 트렌딩 영화"
        fetchUrl={`${API_BASE}/trending/movie/week?${LANG}`}
        itemsPerPage={6}
        rows={2}
      />
    </div>
  );
}

export default Home;
