import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ id, title, poster_path, vote_average }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${id}`); 
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        cursor: 'pointer',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        width: '200px',
        background: '#fafafa',
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        style={{ width: '100%', borderRadius: '10px' }}
      />
      <h3>{title}</h3> 
      <p>평점: {vote_average}</p>
    </div>
  );
};

export default MovieCard;