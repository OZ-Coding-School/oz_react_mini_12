import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; //설치한 슬라이더 라이브러리의 컴포넌트
import MovieCard from "./components/MovieCard";
import "./styles/App.css"; //css 경로 지정

/*슬리이더를 위한 기본 및 테마 css 불러오기*/
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [movies, setMovies] = useState([]);

  //추가: 영화 API 요청 및 성인 영화 필터링
  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY; //환경변수에서 키 받아오기
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;

      try {
        const response = await fetch(url); //api 요청
        const data = await response.json(); //json 응답 처리

        //성인 영화(adult: true) 제외
        const filtered = data.results.filter((movie) => movie.adult === false);
        setMovies(filtered);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovies();
  }, []);

  //슬라이더 객체 설정
  const settings = {
    dots: true, //하단에 점
    infinite: true, //무한 루프
    speed: 500, //전환 속도
    slidesToShow: 4, //기본 표시 갯수
    slidesToScroll: 1, //한번에 넘어가는 슬라이드 갯수

    /*반응형 화면 너비 설정*/
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="app-container">
      <h1 className="app-title">영화 리스트</h1>
      {/*슬라이드 적용 부분*/}
      <Slider {...settings} className="movie-slider">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-slide">
            {/* 각 영화 카드를 클릭하면 해당 영화의 상세 페이지로 이동 */}
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
    </div>
  );
}

export default App;