import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  cursor: pointer;
  background: #1e1e1e;
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
  width: 210px;
  margin: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);
  font-family: 'Orbit', sans-serif;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0,0,0,0.6);
  }

  /* 태블릿 */
  @media (max-width: 1024px) {
    width: 180px;
  }
  @media (max-width: 768px) {
    width: 150px;
  }
  /* 모바일 */
  @media (max-width: 480px) {
    width: 130px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: 1px solid rgba(255,255,255,0.1);

  @media (max-width: 1024px) {
    height: 190px;
  }
  @media (max-width: 768px) {
    height: 170px;
  }
  @media (max-width: 480px) {
    height: 150px;
  }
`;

const Info = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Rating = styled.p`
  font-size: 13px;
  color: #bbb;

  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const MovieCard = ({ movie }) => {  
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${movie.id}`);  
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/210x315?text=No+Image';

  return (
    <Card onClick={handleCardClick}>
      <Poster src={posterUrl} alt={movie.title} />
      <Info>
        <Title>{movie.title}</Title>
        <Rating>평점: {movie.vote_average}</Rating>
      </Info>
    </Card>
  );
};

export default MovieCard;
