import React from "react";
import movieListData from "../data/movieListData.json";
import MovieCard from "../components/MovieCard";
import "./MainPage.css";

export default function MainPage() {
  const movies = movieListData.results; // ✅ 핵심 수정

  return (
    <div className="main-page">
      <h2>🎬 전체 영화 목록</h2>
      <div className="movie-grid">
        {Array.isArray(movies) &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          ))}
      </div>
    </div>
  );
}
