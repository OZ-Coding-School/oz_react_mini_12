import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useMovieStore } from "../store/movies";
import { useEffect, useState } from "react";
import {  fetchGenres, fetchMovieById } from "../api/tmbi";

export default function Detail() {
  const { getMovieById, genreMap } = useMovieStore();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  // console.log(movieId);
  
  useEffect(() => {
    const loadMovie = async () => {
      let movieData = getMovieById(Number(movieId));
      // console.log("movieData:", movieData);
      // console.log("genres:", movieData?.genres);

      fetchGenres();

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
    };
    loadMovie();

  }, [movieId]);

  if (!movie) {
    return (
      <div style={{ color: "white", margin: "auto" }}>
        loading...
      </div>
    );
  }

  const { title, vote_average, poster_path, genre_ids, overview, release_date } =
    movie;

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
        <div className="genre">{genre_ids?.map((el) => genreMap[el]).join(", ")}</div>
        <div className="overview">{overview}</div>
      </div>
    </DetailStyled>
  );
}

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
      font-size: 4rem;
      font-weight: 800;
    }
    .vote_average {
      font-size: 1.2rem;
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
