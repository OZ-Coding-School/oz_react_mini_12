import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ id, title, poster_path, vote_average, rank }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card" onClick={handleClick}>
      {rank && <span className="movie-rank">#{rank}</span>}
      <img src={imageUrl} alt={title} className="movie-poster" />
      <h3 className="movie-title" title={title}>{title}</h3>
      <span className="movie-score">⭐ {vote_average?.toFixed(1)}</span>
    </div>
  );
};

export default MovieCard;
