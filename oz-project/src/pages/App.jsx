import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import RecommendationSlider from '../components/RecommendationSlider';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

export default function App() {
  const [movies, setMovies] = useState([]);
  /*
  영상을 불러오는도중, adult 등록은 안되었는데 보기 민망할 정도의
  영상이 있어서, 추가로 필터링할 단어들을 등록하였습니다.
  */
  const blockedKeywords = ['성교육', 'ママ', 'ママ', '성인'];
  
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // 여기서, TMDB 내 adult로 등록된 컨텐츠와 위에 등록한 키워드를 같이 필터링하였습니다. 
        const filtered = (data.results || []).filter(
          (movie) =>
            !movie.adult &&
            !blockedKeywords.some((keyword) => movie.title.includes(keyword))
        )
        setMovies(filtered);
      })
      .catch((err) => console.error('영화 가져오기 실패:', err));
  }, []);


  return (
    <div className="p-4">
      {/* swiper */}
      <h2 className="text-white text-2xl mb-4">추천 영화</h2>
      <RecommendationSlider movies={movies.slice(0, 10)} />

      {/* moviecard */}
      <h2 className="text-white text-2xl mt-10 mb-4">전체 영화</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
