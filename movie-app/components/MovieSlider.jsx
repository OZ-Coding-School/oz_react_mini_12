import * as SwiperAll from 'swiper';
console.log('Swiper export:', SwiperAll);
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper'; // ✅ v10은 여기서!

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import MovieCard from './MovieCard';
import data from '../data/movieListData.json';

export default function MovieSlider() {
    return (
        <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}           // 카드 사이 간격
        slidesPerView={4}           // 한 화면에 보일 카드 개수
        navigation                  // 좌우 네비게이션 버튼
        pagination={{ clickable: true }} // 페이지네이션 점 클릭 가능
        loop={true}                 // 무한 루프 슬라이드
        >
        {data.results.map((movie) => (
            <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} />
            </SwiperSlide>
        ))}
        </Swiper>
    );
}
