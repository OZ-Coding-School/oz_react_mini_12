import React, { useState, useEffect } from 'react'; // React와 훅을 가져옴
import { fetchPopularMovies } from '../tmdb'; // 만든 API 함수 가져오기
import MovieCard from '../components/MovieCard'; //  MovieCard 컴포넌트 가져오기 

export default function MainPage() {
  const [movies, setMovies] = useState([]); 

  useEffect(() => {
    async function getMovies() {
      const data = await fetchPopularMovies();
      setMovies(data);
    }
    getMovies();
  }, []);

  if (movies.length === 0) {
    return <div>영화 목록을 불러오는 중...</div>;
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard 
          key={movie.id}
          id={movie.id}
          poster={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          title={movie.title}
          rating={movie.vote_average}
        />
      ))}
    </div>
  );// MovieCard에 필요한 데이터들을 정확히 props로 넘겨줌
        // poster는 TMDb 이미지 기본 경로랑 poster_path를 합쳐서 이미지를 보이게함
}