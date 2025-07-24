import React from 'react';
import movieListData from '../movieListData.json';
import MovieSlider from '../components/MovieSlider'; 

/**
 * 영화 목록을 보여주는 메인 페이지 컴포넌트
 */
function MainPage() {
  // 영화 목록을 평점(vote_average) 기준으로 내림차순 정렬합니다.
  const sortedMovies = movieListData.results.slice().sort((a, b) => b.vote_average - a.vote_average);

  return (
    <div>
      <header className="main-page-header">
        <h2>인기순</h2>
      </header>
      {/* MovieSlider 컴포넌트에 정렬된 영화 목록을 전달합니다. */}
      <MovieSlider movies={sortedMovies} />
    </div>
  );
}

export default MainPage;
