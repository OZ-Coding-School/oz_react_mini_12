import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      console.log(import.meta.env)
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
          },
        });

        const data = await response.json();
        const filteredMovies = data.results.filter(movie => !movie.adult);
        setMovies(filteredMovies);
      } catch (error) {
        console.error('영화 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  )
};

export default Home;
