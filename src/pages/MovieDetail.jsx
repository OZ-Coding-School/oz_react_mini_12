import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const [isFavorite, setIsFavorite] = useState(false); // 찜 여부 상태

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;

      const response = await fetch(url);
      const data = await response.json();
      setMovie(data);

      // localStorage에 있는 찜 목록 확인
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const exists = favorites.some((fav) => fav.id === data.id);
      setIsFavorite(exists);
    };

    fetchMovieDetail();
  }, [id]);

  // 찜 토글 함수
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // 찜 해제
      const updated = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      // 찜 추가
      const updated = [...favorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(true);
    }
  };

  if (!movie) return null;

  return (
    <div className="detail-container">
      <img
        src={`${imageBaseUrl}${movie.poster_path}`}
        alt={movie.title}
        className="detail-poster"
      />

      <div className="detail-info">
        <div className="detail-top">
          <h1>{movie.title}</h1>
          <p className="rating">⭐ {movie.vote_average}</p>
        </div>
        <p className="genres">장르: {movie.genres.map(g => g.name).join(", ")}</p>
        <div className="overview-section">
          <p><strong>줄거리:</strong> {movie.overview}</p>
        </div>

        {/* 찜 버튼 추가 */}
        <button className="favorite-btn" onClick={toggleFavorite}>
          {isFavorite ? "💔 찜 취소" : "❤️ 찜 추가"}
        </button>
      </div>
    </div>
  );
}

export default MovieDetail;