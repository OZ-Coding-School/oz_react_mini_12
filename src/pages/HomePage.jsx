import { useState } from "react";
import movieListData from "../data/movieListData.json";
import MovieCard from "../components/MovieCard.jsx";

function HomePage() {
  const [movies] = useState(movieListData.results);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          voteAverage={movie.vote_average}
        />
      ))}
    </div>
  );
}

export default HomePage;
