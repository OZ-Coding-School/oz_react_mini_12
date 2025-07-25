import React from 'react';
import MovieCard from '../components/MovieCard';
import movieData from '../data/movieListData.json';
import './MainPage.css';

const MainPage = () => {
  const movieList = movieData.results;

  return (
    <div className="main-page">
      <h2>📌 인기순</h2>
      <div className="movie-grid">
        {movieList.map((movie) => (
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
