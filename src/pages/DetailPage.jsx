import React from 'react';
import './DetailPage.css';
import movie from '../data/movieDetailData.json'; // 단일 객체로 import

const DetailPage = () => {
  return (
    <div className="detail-container">
      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="info">
        <h2>{movie.title}</h2>
        <p>⭐ {movie.vote_average}</p>
        <div className="genres">
          {movie.genres?.map((g) => (
            <span key={g.id}>{g.name}</span>
          ))}
        </div>
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default DetailPage;
