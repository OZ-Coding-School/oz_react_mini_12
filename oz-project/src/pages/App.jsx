import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import RecommendationSlider from '../components/RecommendationSlider';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [recommended, setRecommended] = useState([]);
  /*
  영상을 불러오는도중, adult 등록은 안되었는데 보기 민망할 정도의
  영상이 있어서, 추가로 필터링할 단어들을 등록하였습니다.
  */
  const blockedKeywords = ['성교육', 'ママ', '성인'];

  const filterMovies = (movies) =>
    (movies || []).filter(
      (movie) => 
        !movie.adult &&
        !blockedKeywords.some((keyword) => movie.title.includes(keyword))
    );
    // 추천 영화
    useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
        const data = await res.json();
        setMovies(filterMovies(data.results));
      } catch (err) {
        console.error('인기 영화 가져오기 실패:', err);
      }
    }
    fetchPopularMovies();
  }, []);
    // 개봉예정영화 (한국기준)
    useEffect(() => {
    async function fetchUpcomingMovies() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=KR&page=1`);
        const data = await res.json();
        setRecommended(filterMovies(data.results));
      } catch (err) {
        console.error('개봉 예정 영화 가져오기 실패:', err);
      }
    }
    fetchUpcomingMovies();
  }, []);


  return (
    <div className="p-4">
      {/* swiper */}
      <h2 className="text-white text-2xl mb-4">개봉 예정 영화</h2>
      <RecommendationSlider movies={recommended.slice(0, 10)} />

      {/* moviecard */}
      <h2 className="text-white text-2xl mt-10 mb-4">추천 영화</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
