import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {  
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${movie.id}`);  
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        cursor: 'pointer',
        border: '1px solid #e3e3e3',
        padding: '20px',
        borderRadius: '2px',
        width: '210px',
        background: '#fafafa',
        margin: '10px', 
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title} 
        style={{ width: '100%', borderRadius: '10px' }}
      />
      <h3>{movie.title}</h3> 
      <p>평점: {movie.vote_average}</p> 
    </div>
  );
};
export default MovieCard;