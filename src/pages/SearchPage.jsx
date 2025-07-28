import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../styles/SearchPage.css";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${encodeURIComponent(query)}&page=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setResults(data.results.filter(movie => !movie.adult));
      } catch (err) {
        console.error("검색 오류:", err);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-results">
      <h2>“{query}” 검색 결과</h2>
      <div className="search-grid">
        {results.map(movie => (
        <a href={`/details/${movie.id}`}>
            <MovieCard
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
        </a>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;