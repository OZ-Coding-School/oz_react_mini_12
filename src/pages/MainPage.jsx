import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/slices/movieSlice';
import MovieCard from '../components/MovieCard';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

function MainPage() {
  const dispatch = useDispatch();
  const { list: movies, loading, error } = useSelector((state) => state.movies);

  const [searchParams] = useSearchParams();
  const searchTermFromUrl = searchParams.get('query') || '';

  console.log(`[MainPage] searchTermFromUrl: "${searchTermFromUrl}"`);

  const debouncedSearchTerm = useDebounce(searchTermFromUrl, 500);

  console.log(`[MainPage] debouncedSearchTerm: "${debouncedSearchTerm}"`);

  useEffect(() => {
    console.log(`[MainPage] useEffect triggered. Dispatching fetchMovies with: "${debouncedSearchTerm}"`);
    dispatch(fetchMovies(debouncedSearchTerm));
  }, [dispatch, debouncedSearchTerm]);

  if (loading === 'pending') {
    return <div className="text-center p-8 text-lg font-semibold">영화 정보를 로드 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500 font-bold">오류 발생: {error}</div>;
  }

  if (debouncedSearchTerm && movies.length === 0 && loading === 'succeeded') {
    return <div className="text-center p-8 text-gray-600">"{debouncedSearchTerm}"(으)로 검색된 영화가 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {debouncedSearchTerm ? `'${debouncedSearchTerm}' 검색 결과` : '인기 영화'}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
