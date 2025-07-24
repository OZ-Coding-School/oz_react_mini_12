import React from 'react';

import './MovieCard.css';

/**
 * 영화 한 개의 정보를 표시하는 카드 컴포넌트
 * @param {{movie: object}} props - 표시할 영화 정보 객체
 */
function MovieCard({ movie }) {
  return (
        <div className="movie-card">
      {/* 클릭 이벤트는 부모인 SwiperSlide에서 처리합니다. */}
      {/*
        Swiper.js와의 충돌을 피하기 위해 Link 대신 div와 onClick 이벤트를 사용합니다.
        클릭 이벤트는 부모 컴포넌트(MovieSlider)에서 전달받은 함수를 실행합니다.
      */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">★ {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default MovieCard;
