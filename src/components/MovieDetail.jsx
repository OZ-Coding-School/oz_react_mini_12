import React from 'react';
import { useParams } from 'react-router-dom';
import './MovieList.css';
import movieListData from '../../data/movieListData.json';
import './MovieDetail.css';

const MovieDetail = ( ) => {
  const movies = movieListData.results;
  const { id } = useParams();
  const movie = movies.find(m => m.id.toString() === id);

  if (!movie) return <p>영화를 찾을 수 없습니다.</p>;

  return (
    <div className="movie-detail-container">
      <img
        className="movie-detail-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-detail-info">
        <h1>{movie.title}</h1>
        <p><strong>개봉일:</strong> {movie.release_date}</p>
        <p><strong>평점:</strong> ⭐ {movie.vote_average}</p>
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
console.log('MovieDetail:', MovieDetail);
