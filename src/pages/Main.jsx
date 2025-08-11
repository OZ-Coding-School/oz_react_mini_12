import styled from "styled-components";
import { MovieCard } from "../components/MovieCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import "../swiper.css";
import { useMovieStore } from "../store/movie_store.js";
import { useCallback, useState } from "react";

export function Main() {
  const { movies, slideMovies, loading, fetchMoreMovies } = useMovieStore();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const navigate = useNavigate();

  // console.log("movies:", movies);
  // console.log("slideMovies:", slideMovies);

  const lastCardObserver = useCallback(
    (node) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting && !isFetchingMore) {
            setIsFetchingMore(true);
            await fetchMoreMovies();
            setIsFetchingMore(false);
          }
        },
        { threshold: 1.0 }
      );

      observer.observe(node);
    },
    [isFetchingMore, fetchMoreMovies]
  );

  return (
    <MainStyled>
      <div className="swiper_description">이번 주 영화 TOP 20</div>
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
        {loading
          ? Array.from({ length: 10 }).map((_, idx) => (
              <SwiperSlide key={idx} className="SwiperSlide">
                <MovieCardSkeleton>
                  <div className="skeleton-img" />
                  <div className="skeleton-title" />
                  <div className="skeleton-vote" />
                </MovieCardSkeleton>
              </SwiperSlide>
            ))
          : slideMovies.map((movie) => (
              <SwiperSlide key={movie.id} className="SwiperSlide">
                <div className="slide_container">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="poster_swiper"
                    onClick={() => navigate(`/detail/${movie.id}`)}
                  ></img>
                  <div className="title">{movie.title}</div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      <MovieGrid>
        {loading
          ? Array.from({ length: 10 }).map((_, idx) => (
              <MovieCardSkeleton key={idx}>
                <div className="skeleton-img" />
                <div className="skeleton-title" />
                <div className="skeleton-vote" />
              </MovieCardSkeleton>
            ))
          : movies.map((movie, idx) => {
              const isLast = idx === movies.length - 1;
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  ref={isLast ? lastCardObserver : null}
                ></MovieCard>
              );
            })}
      </MovieGrid>
    </MainStyled>
  );
}

export const MovieCardSkeleton = styled.div`
  width: 20rem;
  height: 35rem;
  background-color: #444;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: pulse 1.5s infinite ease-in-out;

  .skeleton-img {
    width: 18rem;
    height: 27rem;
    background-color: #555;
    border-radius: 0.5rem;
  }

  .skeleton-title {
    width: 70%;
    height: 2rem;
    background-color: #555;
    border-radius: 0.3rem;
  }

  .skeleton-vote {
    width: 40%;
    height: 1.2rem;
    background-color: #555;
    border-radius: 0.3rem;
  }

  @keyframes pulse {
    0% {
      background-color: #555;
    }
    50% {
      background-color: #666;
    }
    100% {
      background-color: #555;
    }
  }
`;

const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .swiper_description {
    font-size: 1.8rem;
    position: absolute;
    top: 0.6rem;
    left: 12rem;
  }

  .swiper {
    height: 40rem;
    width: 110rem;
    margin: auto;
    padding: 0 3.5rem;

    .SwiperSlide {
      padding-bottom: 2rem;
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .slide_container {
        height: 35rem;
        width: 25rem;
        overflow: hidden;
        border-radius: 0.5rem;
        &:hover {
          img {
            transform: scale(1.07);
          }
          .title {
            background-color: #b3b3b3fb;
          }
        }

        img {
          cursor: pointer;
          height: 38rem;
          width: 25rem;
          padding-bottom: 1.4rem;
          position: relative;
          /* border-radius: 0.5rem; */
          transition: all 0.2s ease;
        }
        .title {
          background-color: #b3b3b3cf;
          transition: all 0.2s ease;
          position: absolute;
          bottom: 3.4rem;
          height: 4rem;
          width: 25rem;
          border-radius: 0 0 0.5rem 0.5rem;

          font-family: "Gugi";
          text-align: center;
          padding-top: 0.8rem;
          font-size: 1.5rem;
          font-weight: 700;
        }
      }
    }
  }
`;

export const MovieGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  margin: 0;
  gap: 1rem;
  padding: 4rem;
`;
