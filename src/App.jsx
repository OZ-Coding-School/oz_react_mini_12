import { useEffect, useState } from 'react';
import { getMovies } from './api';
import './App.css';
import MovieCard from './components/MovieCard/MovieCard';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  const handleLoad = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMovies(); //{ id: 1 }
      setMovies(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoad({});
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Someting was wrong</div>;
  }

  return (
    <ul className='container'>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}

export default App;
