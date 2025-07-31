import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilteredMovieCard from './FilteredMovieCard';
import './MovieList.css';
import './MovieDetail.css';

const API_TOKEN = import.meta.env.VITE_REACT_APP_API_TOKEN;

const MovieListAndDetail = () => {
  const { id } = useParams(); // id가 있으면 상세페이지, 없으면 리스트 페이지
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 상세 관련 상태
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState('');
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isLoadingRating, setIsLoadingRating] = useState(false);

  // --- 영화 리스트 fetch ---
  const fetchMovies = async (pageToFetch = 1) => {
    setIsLoadingList(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageToFetch}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovies(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          const newUniqueMovies = data.results.filter(m => !existingIds.has(m.id));
          return [...prev, ...newUniqueMovies];
        });
        setHasMore(data.page < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    if (!id) {
      fetchMovies(page);
    }
  }, [page, id]);

  // 무한 스크롤 이벤트 (리스트일 때만)
  useEffect(() => {
    if (id) return; // 상세 모드일 때는 무한 스크롤 비활성

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 300 &&
        hasMore &&
        !isLoadingList
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoadingList, id]);

  // --- 상세 영화 정보 fetch ---
  useEffect(() => {
    if (!id) {
      setMovie(null);
      return;
    }

    const fetchMovieDetail = async () => {
      setIsLoadingDetail(true);
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
        setIsLoadingDetail(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  // --- 상세 등급 정보 fetch ---
  useEffect(() => {
    if (!id) return;

    const fetchRating = async () => {
      setIsLoadingRating(true);
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
        setIsLoadingRating(false);
      }
    };

    fetchRating();
  }, [id]);

  // --- 렌더 ---

  // 상세페이지 렌더
  if (id) {
    if (isLoadingDetail) return <p>영화 정보를 불러오는 중...</p>;
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
          <p><strong>등급:</strong> {isLoadingRating ? '로딩 중...' : rating}</p>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>
    );
  }

  // 리스트페이지 렌더
  return (
    <div className="movie-list-container">
      <h1 className="main-title">우미관</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <FilteredMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {isLoadingList && <p>불러오는 중...</p>}
    </div>
  );
};

export default MovieListAndDetail;
