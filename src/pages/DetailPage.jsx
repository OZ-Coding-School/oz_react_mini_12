import React from 'react';
import movie from '../movieDetailData.json'; // 임시로 단일 상세 정보 파일 사용
import './DetailPage.css';

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

/**
 * URL 파라미터에서 영화 ID를 가져와 해당 영화의 상세 정보를 표시하는 페이지
 */
function DetailPage() {
  // 임시 조치: URL의 movieId와 상관없이 항상 movieDetailData.json의 정보를 사용합니다.

  if (!movie) {
    return <div className="not-found">요청하신 영화 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="movie-detail-container">
      {/* 배경 이미지가 있는 경우에만 표시 */}
      {movie.backdrop_path && (
        <img 
          className="backdrop-image"
          src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`} 
          alt={`${movie.title} 배경`} 
        />
      )}
      <div className="movie-detail-content">
        <img 
          className="detail-poster"
          src={`${POSTER_BASE_URL}${movie.poster_path}`} 
          alt={`${movie.title} 포스터`}
        />
        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>
          <div className="detail-meta">
            <span>평점: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
            <span>개봉일: {movie.release_date || '정보 없음'}</span>
            {/* 상영시간, 장르 이름 정보는 movieListData에 없으므로 생략 */}
          </div>
          <h3 className="overview-title">줄거리</h3>
          <p className="detail-overview">{movie.overview || '줄거리 정보가 없습니다.'}</p>
          {movie.tagline && <p className="detail-tagline">"{movie.tagline}"</p>}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
