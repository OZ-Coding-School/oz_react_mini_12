import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Search() {
    const [params] = useSearchParams();
    const query = params.get("query") || "";
    const debouncedQuery = useDebounce(query, 500);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
            return;
        }

        async function fetchSearch() {
            setLoading(true);
            try {
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${debouncedQuery}&language=ko-KR`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    }
                });

                const data = await res.json();
                const filtered = data.results.filter(movie => movie.adult === false);
                setResults(filtered);
            } catch (error) {
                console.error("검색 실패:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchSearch();
    }, [debouncedQuery]);

    return (
        <div className="movie-grid">
            {loading ? (
                [...Array(6)].map((_, idx) => <SkeletonCard key={idx} />)
            ) : (
                results.map(movie => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        vote_average={movie.vote_average}
                    />
                ))
            )}
        </div>
    );
}