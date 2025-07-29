
// src/components/MovieDetail.jsx
import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

function MovieDetail() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        console.log("영화 상세 👉", data);
        setMovie(data);
      } catch (err) {
        console.error("상세 정보 가져오기 실패", err);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return <p>로딩 중...</p>;

  return (
    <div className="movie-detail">
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path || movie.poster_path})`,
        }}
      >
        <div className="overlay">
          <div className="poster-info">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="poster"
            />
            <div className="info">
              <h2>{movie.title}</h2>
              <div className="meta-row">
                <span className="vote-badge">
                  <span className="star">⭐</span> {movie.vote_average?.toFixed(1)}
                </span>
                <div className="genre-badges">
                  {movie.genres.map(g => (
                    <span className="genre-badge" key={g.id}>{g.name}</span>
                  ))}
                </div>
              </div>
              <div className="overview">
                <strong>줄거리:</strong>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;

