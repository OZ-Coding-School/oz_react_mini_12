import './App.css';
import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      const filtered = data.results.filter((movie) => !movie.adult);
      setMovies(filtered);
    };

    fetchMovies();
  }, []);

  return (
    <main>
      <ul className="movie-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        ))}
      </ul>
    </main>
  );
}
