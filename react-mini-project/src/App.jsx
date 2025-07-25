import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

function MovieListPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          },
        });

        const data = await response.json();
        const filtered = data.results.filter((movie) => movie.adult === false);
        setMovies(filtered);
      } catch (error) {
        console.error('영화 데이터 가져오기 실패:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={{ padding: 20 }}>
     <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}> 
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieListPage />} />
        <Route path="details/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}