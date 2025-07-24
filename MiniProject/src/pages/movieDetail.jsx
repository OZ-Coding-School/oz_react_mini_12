import React from 'react';
import { useParams } from 'react-router-dom';
import movieListData from '../assets/data/movieListData.json';

function MovieDetail() {
  const { id } = useParams();

  // id는 문자열이므로 숫자로 변환 후 비교
  const movie = movieListData.results.find(
    (movie) => movie.id === parseInt(id, 10)
  );

  if (!movie) {
    return <div>영화를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        style={{ width: '100%', maxWidth: 600, borderRadius: 10 }}
      />
      <p><strong>평점:</strong> {movie.vote_average}</p>
      <p><strong>장르 ID 목록:</strong> {movie.genre_ids.join(', ')}</p>
      <p><strong>줄거리:</strong> {movie.overview}</p>
    </div>
  );
}

export default MovieDetail;
