import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';

export default function RecommendationSlider({ movies }) {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          {/* recommened 포스터 클릭시 상세페이지로 이동하게 */}
          <Link to={`/details/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}