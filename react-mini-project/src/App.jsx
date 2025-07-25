import React, { useState, useEffect } from 'react';
import movieListData from './data/movieListData.json';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

function MovieListPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(movieListData.results);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎬 MOVIE LIST</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id} 
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
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