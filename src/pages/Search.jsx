import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import MovieCard from "../components/MovieCard";
import './Search.css';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const debouncedQuery = useDebounce(query, 500);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${debouncedQuery}&language=ko-KR&page=1&include_adult=false`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.error("❌ API 오류", data.status_message);
          setMovies([]);
          return;
        }

        setMovies(data.results || []);
      } catch (error) {
        console.error("🔥 TMDb API 호출 실패:", error);
        setMovies([]);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="search-results">
      <h2>🔍 '{query}' 검색 결과</h2>
      <div className="movie-list">
        {Array.isArray(movies) && movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
}
