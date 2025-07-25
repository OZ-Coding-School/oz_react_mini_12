import React from 'react';
import detail from '../data/movieDetailData.json';

const MovieDetail = () => {
  const { backdrop_path, title, vote_average, genres, overview, poster_path } = detail;

  return (
    <div style={{ padding: '20px' }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`}
        alt={title}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
      />
      <h2>{title}</h2>
      <p>평점: {vote_average}</p>
      <p>장르: {genres.map((g) => g.name).join(', ')}</p>
      <p>{overview}</p>
    </div>
  );
};

export default MovieDetail;
