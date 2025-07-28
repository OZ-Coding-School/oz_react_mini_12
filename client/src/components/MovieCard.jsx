// client/src/components/MovieCard.jsx
import React from "react";
import './MovieCard.css';
import { useNavigate } from "react-router-dom";

function MovieCard({ id, poster_path, title, vote_average }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={`https://image.tmdb.org/t/p/w300${poster_path}`}
        alt={title}
      />
      <h2>{title}</h2>
      <p>평점: {vote_average}</p>
    </div>
  );
}


export default MovieCard;
