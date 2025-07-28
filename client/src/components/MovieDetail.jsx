// src/components/MovieDetail.jsx
import React from "react";
import movieDetailData from "../data/movieDetailData.json";
import "./MovieDetail.css" // 스타일 따로 분리

function MovieDetail() {
  console.log("✅ MovieDetail 컴포넌트 렌더링됨");

  const {
    backdrop_path,
    poster_path,
    title,
    vote_average,
    genres,
    overview,
  } = movieDetailData;

  console.log("✅ MovieDetail 컴포넌트 실행됨");

  return (
    <div className="movie-detail">
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path || poster_path})`,
        }}
      >
        <div className="overlay">
          <div className="poster-info">
            <img
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={title}
              className="poster"
            />
            <div className="info">
              <h2>{title}</h2>
              <p><strong>평점:</strong> {vote_average}</p>
              <p><strong>장르:</strong> {genres.join(", ")}</p>
              <p><strong>줄거리:</strong> {overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
