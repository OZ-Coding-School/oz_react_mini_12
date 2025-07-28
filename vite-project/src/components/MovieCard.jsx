import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/details/${movie.id}`)} style={{ cursor: 'pointer' }}>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} width="200" />
      <h3>{movie.title}</h3>
      <p>평점: {movie.vote_average}</p>
    </div>
  );
};

export default MovieCard;
