import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieList = ({
  fetchUrl,
  title,
  showRank,
  itemsPerPage = 4,
  rows = 1,
}) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(fetchUrl, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await res.json();
        const filtered = data.results.filter((movie) => !movie.adult);
        setMovies(filtered);
        setCurrentIndex(0);
      } catch (err) {
        console.error("영화 불러오기 실패", err);
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  const totalItems = itemsPerPage * rows;
  const maxIndex = Math.max(0, movies.length - totalItems);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const dotCount = Math.ceil(movies.length / itemsPerPage);

  return (
    <div className={`movie-list-container${title === "🎬 인기 영화" ? " popular" : ""}`}>
      {title && <h2 className="movie-list-title">{title}</h2>}

      <div className="movie-list-wrapper">
        <button className="slide-btn left" onClick={handlePrev}>
          <FaChevronLeft />
        </button>

        <div className="movie-list-track-wrapper">
          <div
            className="movie-list-track"
            style={{
              transform: `translateX(-${(100 / totalItems) * currentIndex}%)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
          >
            {movies.map((movie, index) => (
              <div className="movie-list-item" key={movie.id}>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                  rank={showRank ? index + 1 : undefined}
                />
              </div>
            ))}
          </div>
        </div>

        <button className="slide-btn right" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      <div className="dot-navigation">
        <button className="dot-nav-btn" onClick={handlePrev} disabled={currentIndex === 0}>
          &lt;
        </button>
        {[...Array(dotCount)].map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
        <button className="dot-nav-btn" onClick={handleNext} disabled={currentIndex === maxIndex}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieList;
