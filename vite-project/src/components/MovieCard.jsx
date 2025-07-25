import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ poster_path, title, vote_average }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/details')} style={{ cursor: 'pointer' }}>
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} width="200" />
      <h3>{title}</h3>
      <p>평점: {vote_average}</p>
    </div>
  );
};

export default MovieCard;
