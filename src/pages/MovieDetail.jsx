import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; //영화 ID를 URL에서 추출
import "../styles/MovieDetail.css"; //css 경로 지정

function MovieDetail() {
  const { id } = useParams(); //URL에서 영화 ID 추출
  const [movie, setMovie] = useState(null); //영화 상세 정보 상태
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  /*컴포넌트 마운트 시 API 호출*/
  useEffect(() => {
    const fetchMovieDetail = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;

      const response = await fetch(url);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return null;  //영화 데이터가 없을 경우 아무것도 렌더링하지 않음

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