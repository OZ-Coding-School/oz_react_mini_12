import React from 'react';
import MovieCard from './MovieCard';
import movieListData from '../../data/movieListData.json';
import './MovieList.css';

const MovieList = () => {
  const movies = movieListData.results;

  return (
    <div className="movie-list-container">
      <h1 className="main-title">우미관</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
