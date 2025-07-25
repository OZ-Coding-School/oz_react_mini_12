import MovieCard from '../components/MovieCard';
import movieList from '../data/movieListData.json';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {movieList.results.map((movie) => (
        <MovieCard
          key={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
          vote_average={movie.vote_average}
        />
      ))}
    </div>
  );
};

export default Home;
