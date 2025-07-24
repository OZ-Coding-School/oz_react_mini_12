import React from 'react';
// Swiper.js 라이브러리에서 필요한 모듈들을 가져옵니다.
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Swiper.js의 기본 스타일과 네비게이션, 페이지네이션 스타일을 가져옵니다.
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import MovieCard from './MovieCard';
import './MovieSlider.css'; // 슬라이더 커스텀 스타일

/**
 * 영화 목록을 슬라이드 형태로 보여주는 컴포넌트
 * @param {{movies: object[]}} props - 영화 목록 배열
 */
function MovieSlider({ movies }) {
  const navigate = useNavigate();

    const handleSwiperClick = (swiper) => {
    // 클릭된 슬라이드의 인덱스를 가져옵니다.
    const clickedIndex = swiper.clickedIndex;
    // 해당 인덱스의 영화 정보를 가져옵니다.
    const clickedMovie = movies[clickedIndex];
    // 영화 정보가 있으면 상세 페이지로 이동합니다.
    if (clickedMovie) {
      navigate(`/movie/${clickedMovie.id}`);
    }
  };
  return (
    <div className="movie-slider-container">
      <Swiper
        // Swiper 클릭 이벤트 핸들러
        onClick={handleSwiperClick}
        // Swiper 모듈 설정
        modules={[Navigation, Pagination]}
        spaceBetween={20} // 슬라이드 사이의 간격
        slidesPerView={4} // 한 번에 보여줄 슬라이드 개수
        slidesPerGroup={3} // 한 번에 3개씩 그룹으로 넘김
        navigation // 이전/다음 버튼
        pagination={{ clickable: true }} // 페이지네이션 (점) 클릭 가능
        grabCursor={true} // 마우스 커서를 잡는 모양으로 변경하고 드래그 가능하게 함
        // 반응형 설정
        breakpoints={{
          // 화면 너비가 1024px 이하일 때
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
          // 화면 너비가 768px 이하일 때
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          // 화면 너비가 480px 이하일 때
          480: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieSlider;
