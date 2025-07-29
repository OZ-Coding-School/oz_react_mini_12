import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
  color: #fff;

  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); 
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); 
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr; 
  }
`;

export default function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); 
  //URL에서 query 값을 추출 => API를 호출하여 검색된 영화를 화면에 렌더링

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    } else {
      fetchMovies();
    }
  }, [query]);

  const fetchSearchResults = async (searchTerm) => {
    setLoading(true);
    setError(null);
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${encodeURIComponent(searchTerm)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
        setError('검색 결과가 없습니다.');
      }
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => { 
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
        },
      });
      const data = await response.json();
      const filtered = data.results.filter((movie) => !movie.adult);
      setMovies(filtered);
    } catch (error) {
      setError('영화 데이터 가져오기 실패');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Title>{query ? `🔍 "${query}" 검색 결과` : '인기 영화'}</Title>
      {loading && <p>로딩 중입니다...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
      {!loading && movies.length === 0 && !error && (
        <p>검색 결과가 없습니다.</p>
      )}
    </PageContainer>
  );
}
