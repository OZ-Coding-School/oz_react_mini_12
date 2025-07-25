import React from 'react';
import './MovieList.css';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <img 
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
          alt={movie.title} 
          className="movie-poster"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-date">📅 {movie.release_date}</p>
          <p className="movie-rating">⭐ {movie.vote_average}</p>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
