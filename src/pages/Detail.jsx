import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useEffect, useState } from "react";
import { fetchGenres, fetchMovieById } from "../api/tmbi";
import { useMovieStore } from "../store/movie_store.js";


export default function Detail() {
  const { getMovieById, genreMap } = useMovieStore();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  // console.log(movieId);

  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      setIsLoad(false);
      await fetchGenres();
      let movieData = getMovieById(Number(movieId));
      // console.log("movieData:", movieData);
      // console.log("genres:", movieData?.genres);

      if (!movieData) {
        try {
          movieData = await fetchMovieById(movieId);
          // console.log("movie:", movieData);
          setMovie(movieData);
        } catch (e) {
          console.error("error:", e);
        }
      } else {
        setMovie(movieData);
      }
      setIsLoad(true);
    };
    loadMovie();
  }, [movieId]);

  if (!isLoad || !movie) {
    return (
      <DetailSk>
        <div className="poster skeleton-box"></div>
        <div className="info">
          <div className="title skeleton-box"></div>
          <div className="vote skeleton-box"></div>
          <div className="genre skeleton-box"></div>
          <div className="overview skeleton-box"></div>
        </div>
      </DetailSk>
    );
  }

  console.log(movie);

  const {
    title,
    vote_average,
    poster_path,
    genre_ids,
    overview,
    release_date,
  } = movie;

  return (
    <DetailStyled>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title + " poster"}
        className="poster_front"
      />

      <div className="info">
        <div className="title">{title}</div>
        <div className="vote_average">평점 : ⭐{vote_average.toFixed(2)}</div>
        <div className="genre">
          {genre_ids?.map((el) => genreMap[el]).join(", ")}
        </div>
        <div className="overview">{overview}</div>
      </div>
    </DetailStyled>
  );
}

const DetailSk = styled.div`
  display: flex;
  width: 100%;
  height: 49rem;
  background-color: #ccc;
  padding: 1rem 3rem;
  gap: 2rem;

  .skeleton-box {
    background-color: #e0e0e0;
    border-radius: 0.5rem;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .poster {
    width: 300px;
    height: 100%;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .title {
      width: 70%;
      height: 3rem;
    }

    .vote {
      width: 30%;
      height: 1rem;
    }

    .genre {
      width: 50%;
      height: 1rem;
    }

    .overview {
      flex: 1;
      width: 100%;
      height: 10rem;
    }
  }

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f5f5f5;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

const DetailStyled = styled.div`
  display: flex;
  width: 100%;
  height: 49rem;
  background-color: #9e9e9e;
  padding: 1rem 3rem;
  gap: 2rem;

  img {
    height: 100%;
    border-radius: 0.7rem;
    box-shadow: 1px 2px 5px 3px #00000050;
  }

  .info {
    margin-left: 4rem;
    margin-top: 2rem;
    min-width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
    height: 100%;
    margin-right: 4rem;

    .title {
      font-family: "Gugi";
      font-size: 5rem;
      font-weight: 800;
    }
    .vote_average, .genre, .overview {
      font-size: 1.4rem;
    }

    .genre {
      height: 3rem;
    }
    .overview {
      overflow-y: auto;
      font-size: 1.2rem;
      word-break: keep-all;
    }
  }
`;
