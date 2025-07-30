import { useState } from "react";
import movieList from "../../data/movieListData.json"
import MovieCard from "../components/MovieCard";


export default function Home() {
    const [movies] = useState(movieList.results)

    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                key={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                />
            ))}
        </div>
    )
}
