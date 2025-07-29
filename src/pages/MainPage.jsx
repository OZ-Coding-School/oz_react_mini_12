import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/slices/movieSlice';
import MovieCard from '../components/MovieCard';

function MainPage() {
  const dispatch = useDispatch();
  const { list: movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (movies.length === 0 && loading === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, movies.length, loading]);

  if (loading === 'pending') {
    return <div className="text-center p-8 text-lg font-semibold">영화 정보를 로드 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500 font-bold">오류 발생: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">인기 영화</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
