import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailPage.css';

const DetailPage = () => {
  const { id } = useParams(); // URL에서 영화 ID 추출
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
              accept: 'application/json',
            },
          }
        );

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('영화 상세 정보 요청 실패:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return <div>로딩 중...</div>;

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
