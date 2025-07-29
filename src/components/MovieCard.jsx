import React from "react";
import "../styles/MovieCard.css"; // CSS 파일 import

function MovieCard({ title, poster_path, vote_average }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-card" style={{ cursor: "pointer" }}>
      <img
        src={`${imageBaseUrl}${poster_path}`}
        alt={title}
        className="movie-poster"
      />
      <h3 className="movie-title">{title}</h3>
      <p className="movie-rating">⭐ 평점: {vote_average}</p>
    </div>
  );
}

export default MovieCard;