// src/pages/MovieDetail.jsx
import React from 'react';
import movieDetailData from '../data/movieDetailData.json';
import './MovieDetail.css'; // 스타일링을 분리할 경우

const MovieDetail = () => {
  // 임시로 첫 번째 영화 정보만 가져오기 (정적 테스트용)
  const movie = movieDetailData[0];

  return (
    <div className="movie-detail">
      {/* 배경 이미지 또는 포스터 */}
      <div className="movie-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      {/* 정보 */}
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p className="rating">⭐ {movie.vote_average}</p>

        <div className="genres">
          {movie.genres.map((genre) => (
            <span key={genre.id} className="genre-tag">
              {genre.name}
            </span>
          ))}
        </div>

        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
