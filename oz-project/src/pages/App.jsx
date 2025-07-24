import React, { useState, useEffect } from 'react';
import movieListData from '../../data/movieListData.json';
import MovieCard from '../components/MovieCard';
import RecommendationSlider from '../components/RecommendationSlider';

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(movieListData.results || []);
  }, []);

  return (
    <div className="p-4">
      {/* swiper */}
      <h2 className="text-white text-2xl mb-4">추천 영화</h2>
      <RecommendationSlider movies={movies.slice(0, 10)} />

      {/* moviecard */}
      <h2 className="text-white text-2xl mt-10 mb-4">전체 영화</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
