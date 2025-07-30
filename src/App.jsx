import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import MovieCard from "./components/MovieCard";
import "./styles/App.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const sliderRef = useRef(null); // 슬라이더 ref

  // 영화 데이터를 불러오는 함수
  const fetchMovies = async (currentPage) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${currentPage}`;

    try {
      setIsFetching(true);
      const response = await fetch(url);
      const data = await response.json();

      const filtered = data.results.filter((movie) => movie.adult === false);

      if (filtered.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...filtered]);
      }
    } catch (error) {
      console.error("영화 로딩 오류:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // 슬라이더가 끝에 도달하면 다음 페이지 로딩
  const handleAfterChange = (currentIndex) => {
    const totalSlides = movies.length;
    if (hasMore && !isFetching && currentIndex >= totalSlides - 4) {
      setPage((prev) => prev + 1);
    }
  };

  // 맨 앞으로 이동하는 함수
  const handleGoToStart = () => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // 0번째 슬라이드로 이동
    }
  };

  // 슬라이더 설정
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    afterChange: handleAfterChange,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="app-container">
      <h1 className="app-title">영화 리스트</h1>

      {/* 슬라이더 */}
      <Slider ref={sliderRef} {...settings} className="movie-slider">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-slide">
            <Link to={`/details/${movie.id}`} className="movie-link">
              <MovieCard
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
              />
            </Link>
          </div>
        ))}
      </Slider>

      {/* 맨 앞으로 이동 버튼 */}
      <button className="go-to-start-btn" onClick={handleGoToStart}>
        맨 앞으로 이동
      </button>

      {/* 더 이상 영화가 없을 때 메시지 */}
      {!hasMore && (
        <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
          더 이상 영화가 없습니다.
        </p>
      )}
    </div>
  );
}

export default App;