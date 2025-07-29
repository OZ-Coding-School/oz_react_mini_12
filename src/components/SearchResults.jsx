import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './MovieDetail';
import './FilteredMovieCard';

const API_TOKEN = import.meta.env.VITE_REACT_APP_API_TOKEN;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const debouncedQuery = useDebounce(query, 300); // ✅ 쿼리 디바운스

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(debouncedQuery)}&language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: 'application/json',
            },
          }
        );
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('검색 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]); // ✅ 디바운스된 쿼리 기준으로 fetch

  return (
    <div style={{ width: '100%', maxWidth: '960px' }}>
      <h2>검색 결과: "{query}"</h2>
      {loading ? (
        <p>불러오는 중...</p>
      ) : results.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className="movie-grid">
          {results.map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-date">{movie.release_date}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
