// src/pages/SearchResult.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./SearchResult.css";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

function SearchResult() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko-KR`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        const filtered = data.results.filter((movie) => !movie.adult);
        setMovies(filtered);
        setMovies(filtered);
      } catch (err) {
        console.error("검색 실패 😢", err);
      }
    };

    if (query) {
      fetchSearchedMovies();
    }
  }, [query]);

  return (
    <div className="search-result">
      <h2 style={{ color: "white" }}>🔍 검색 결과: "{query}"</h2>
      <div className="result-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          ))
        ) : (
          <p style={{ color: "white" }}>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
