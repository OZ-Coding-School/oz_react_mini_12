import React from 'react';
import movieDetailData from '../data/movieDetailData.json';

const MovieDetail = () => {
  const movie = movieDetailData; 
  

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: '1' }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ flex: '2', paddingLeft: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>{movie.title}</h2>
          <span>⭐ {movie.vote_average}</span>
        </div>

        <div>
          <strong>장르:</strong>{' '}
          {movie.genres.map((genre) => genre.name).join(', ')}
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4>줄거리</h4>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
