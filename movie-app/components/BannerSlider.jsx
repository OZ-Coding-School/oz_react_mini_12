import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation,
    Pagination,
    Autoplay,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import movieList from '../data/movieListData.json';

const banners = movieList.results.slice(0, 3).map(movie => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    rating: movie.vote_average,
    image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
}));

export default function BannerSlider() {
    return (
        <Swiper
        modules={[Pagination, Autoplay]}
        grabCursor={true}
        slidesPerView={1}
        loop={true}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
        speed={700}
        pagination={{ clickable: true }}
        className="w-full max-w-[1024px] h-[500px] mx-auto relative"
        >
        {banners.map((banner) => (
            <SwiperSlide key={banner.id} className="relative">
            {/* 배경 이미지 */}
            <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
            />

            {/* 오버레이 텍스트 */}
            <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none bg-gradient-to-r from-black/80 via-black/50 to-black/0 p-8 flex flex-col justify-center text-white z-10">
                <h2 className="text-4xl font-bold mb-10 drop-shadow-lg">{banner.title}</h2>
                <p className="text-gold font-semibold mb-7 text-base">⭐ 평점: {banner.rating.toFixed(1)}</p>
                <p className="text-sm text-gray-100 line-clamp-3">{banner.overview}</p>
            </div>
            </SwiperSlide>
        ))}
        </Swiper>
    );
}
