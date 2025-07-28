import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieList.css';
import './MovieDetail.css';

const API_TOKEN = import.meta.env.VITE_REACT_APP_API_TOKEN;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingRating, setLoadingRating] = useState(true);

  // 영화 정보 불러오기
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: 'application/json',
            },
          }
        );
        const data = await res.json();
        setMovie(data);
      } catch {
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // 등급 정보 불러오기
  useEffect(() => {
    const fetchRating = async () => {
      if (!id) return;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/release_dates`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: 'application/json',
            },
          }
        );
        const data = await res.json();
        const krRelease = data.results.find(r => r.iso_3166_1 === 'KR');
        const cert = krRelease?.release_dates?.[0]?.certification || '정보 없음';
        setRating(cert);
      } catch {
        setRating('정보 없음');
      } finally {
        setLoadingRating(false);
      }
    };

    fetchRating();
  }, [id]);

  if (loading) return <p>영화 정보를 불러오는 중...</p>;
  if (!movie) return <p>영화를 찾을 수 없습니다.</p>;

  return (
    <div className="movie-detail-container">
      <img
        className="movie-detail-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-detail-info">
        <h1>{movie.title}</h1>
        <p><strong>개봉일:</strong> {movie.release_date}</p>
        <p><strong>평점:</strong> ⭐ {movie.vote_average}</p>
        <p><strong>등급:</strong> {loadingRating ? '로딩 중...' : rating}</p>
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
