import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import './MainPage.css';

const MainPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

      try {
        const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        console.error('영화 불러오기 실패:', err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="main-page">
      <h2>📌 인기순</h2>
      <div className="movie-grid">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
