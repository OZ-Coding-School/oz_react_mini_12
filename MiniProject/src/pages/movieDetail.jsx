import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error('영화 데이터를 가져오는 중 오류 발생');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!movie) return <div>영화를 찾을 수 없습니다.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        style={{ width: '100%', maxWidth: 600, borderRadius: 10 }}
      />
      <p><strong>평점:</strong> {movie.vote_average}</p>
      <p><strong>장르 목록:</strong> {movie.genres.map((g) => g.name).join(', ')}</p>
      <p><strong>줄거리:</strong> {movie.overview}</p>
    </div>
  );
}

export default MovieDetail;
