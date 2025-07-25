import styled from "styled-components";
import movieList from "../mission1_data/data/movieListData.json";
import { MovieCard } from "../components/movieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import "../swiper.css";

export default function Main() {
  const navigate = useNavigate();
  return (
    <MainStyled>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        direction="horizontal"
        loop={true}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="swiper"
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={40}
      >
        {movieList.results.map((movie) => (
          <SwiperSlide key={movie.id} className="SwiperSlide">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="poster_swiper"
              onClick={() => navigate(`/detail/${movie.id}`)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="general_movies">
        {movieList.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
    </MainStyled>
  );
}

const MainStyled = styled.div`
  display: flex;
  flex-direction: column;

  .swiper {
    height: 40rem;
    width: 110rem;
    margin: auto;
    padding: 0 3.5rem;

    .SwiperSlide {
      padding-bottom:2rem;
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        cursor: pointer;
        height: 100%;
        padding-bottom:1.4rem;
      }
    }
  }
  .general_movies {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    margin: 0;
    gap: 1rem;
    padding: 4rem;
  }
`;
