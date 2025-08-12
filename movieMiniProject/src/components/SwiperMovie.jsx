import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import prevButton from "../assets/prevButtonBlack.png";
import nextButton from "../assets/nextButtonBlack.png";
import prevButtonLight from "../assets/prevButtonWhite.png";
import nextButtonLight from "../assets/nextButtonWhite.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useModeStore } from "../store/ModeStore";

const SwiperMovie = ({ moviesList }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [, setIsReady] = useState(false);
  const { isDark } = useModeStore();

  // 버튼 렌더 이후 Swiper 연결
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="relative">
      <div className="w-screen flex justify-between p-[0_30px] absolute top-17">
        <div ref={prevRef} className="size-13 z-10">
          {isDark && (
            <img
              src={prevButton}
              alt="이전버튼 다크모드"
              className="bg-white rounded-4xl opacity-80"
            />
          )}
          {!isDark && (
            <img
              src={prevButtonLight}
              alt="이전버튼 라이트모드"
              className="bg-white rounded-4xl opacity-50"
            />
          )}
        </div>
        <div ref={nextRef} className="size-13 z-10">
          {isDark && (
            <img
              src={nextButton}
              alt="다음버튼 다크모드"
              className="bg-white rounded-4xl opacity-80"
            />
          )}
          {!isDark && (
            <img
              src={nextButtonLight}
              alt="이전버튼 라이트모드"
              className="bg-white rounded-4xl opacity-50"
            />
          )}
        </div>
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={30}
        centeredSlides={true}
        centerInsufficientSlides={true}
        loop={true}
        loopAdditionalSlides={1}
        breakpoints={{
          // 반응형
          625: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 10,
          },
          857: {
            slidesPerView: 3,
            slidesPerGroup: 2,
            spaceBetween: 60,
          },
          1118: {
            slidesPerView: 4,
            slidesPerGroup: 3,
          },
        }}
        navigation={{
          enabled: true,
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[Navigation]}
        className={`${isDark ? `bg-black` : `bg-[rgb(253,250,248)]`} h-[250px]`}
      >
        <div
          className={`${
            isDark ? `bg-black` : `bg-[rgb(253,250,248)]`
          } mt-[30px]`}
        >
          {moviesList.map((movie) => (
            <SwiperSlide>
              <MovieCard key={movie.id} movie={movie} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};
export default SwiperMovie;
