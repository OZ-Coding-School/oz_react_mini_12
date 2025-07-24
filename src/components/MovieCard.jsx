import React from "react";
import "../styles/MovieCard.css"; //css 경로 지정

/*props로 제목, 포스터 이미지 경로, 평점 내려받기*/
function MovieCard({ title, poster_path, vote_average }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  /*내부 내용*/
  return (
    <div className="movie-card">
      <img
        src={`${imageBaseUrl}${poster_path}`} //기본 이미지 url에 데이터 포스터 경로를 합쳐서 완성
        alt={title}
        className="movie-poster"
      />
      <h3 className="movie-title">{title}</h3>
      <p className="movie-rating">⭐ 평점: {vote_average}</p>
    </div>
  );
}

export default MovieCard;