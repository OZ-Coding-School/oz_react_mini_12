import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie, rating }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-date">개봉일: {movie.release_date}</p>
          <p className="movie-rating">평점: ⭐ {movie.vote_average}</p>
          {rating && <p className="movie-rating">등급: {rating}</p>}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
