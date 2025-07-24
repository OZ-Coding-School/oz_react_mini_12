import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ id, poster_path, title, vote_average }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/details/${id}`)}>
      <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />
      <h3>{title}</h3>
      <p>⭐ {vote_average}</p>
    </div>
  );
};

export default MovieCard;
