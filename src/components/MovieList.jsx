import React, { useEffect, useState } from 'react';
import FilteredMovieCard from './FilteredMovieCard';
import './MovieList.css';

const API_TOKEN = import.meta.env.VITE_REACT_APP_API_TOKEN;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageToFetch = 1) => {
    setIsLoading(true);
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
        setMovies(prev => [...prev, ...data.results]);
        setHasMore(data.page < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="movie-list-container">
      <h1 className="main-title">우미관</h1>
      <div className="movie-grid">
        {movies.map(movie => {
          return <FilteredMovieCard key={movie.id} movie={movie} />; // 필터링된 카드만 렌더
        })}
      </div>
      {hasMore && (
        <div className="load-more-container">
          <button
            onClick={handleLoadMore}
            className="load-more-button"
            disabled={isLoading}
          >
            {isLoading ? '불러오는 중...' : '더보기'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
