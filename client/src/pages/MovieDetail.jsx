// client/src/pages/MovieDetail.jsx

import React from "react";
import movieDetailData from "../data/movieDetailData.json";
import "./MovieDetail.css";

function MovieDetail() {
  const {
    title,
    vote_average,
    overview,
    poster_path,
    genres,
  } = movieDetailData;

  return (
    <div className="movie-detail">
      {/* 포스터 */}
      <div className="poster">
        <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />
      </div>

      {/* 오른쪽 정보 영역 */}
      <div className="info">
        <div className="title-vote">
          <h1>{title}</h1>
          <span>⭐ {vote_average}</span>
        </div>

        <div className="genres">
          <strong>장르</strong>
          <ul>
            {genres.map((g, index) => (
              <li key={index}>{g.name}</li>
            ))}
          </ul>
        </div>

        <div className="overview">
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
