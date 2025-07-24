import React from "react";
import movie from "../data/movieDetailData.json"; // 영화 데이터 경로 지정
import "../styles/MovieDetail.css"; //css 경로 지정

function MovieDetail() {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    /* 영화 상세 페이지 전체 컨테이너 */
    <div className="detail-container">

      {/* 영화 포스터 이미지 부분 */}
      <img
        src={`${imageBaseUrl}${movie.poster_path}`}
        alt={movie.title}
        className="detail-poster" //css 스타일 지정
      />

      {/* 정보, 평점, 제목, 장르 등의 세부 내용 표시 부분 */}
      <div className="detail-info">
        <div className="detail-top">
          <h1>{movie.title}</h1>
          <p className="rating">⭐ {movie.vote_average}</p>
        </div>
        <p className="genres">장르: {movie.genres.map(g => g.name).join(", ")}</p>
        <div className="overview-section">
          <p><strong>줄거리:</strong> {movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;