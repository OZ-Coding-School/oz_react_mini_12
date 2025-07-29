// import data from '../assets/data/movieListData.json';
import { MovieCard } from './MovieCard';

function HomePage({movies}) {

    
    return (
        <>
        <div className='movie-list'>
        {movies.map((movie) => (

            <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        poster={movie.poster_path}
        rating={movie.vote_average}/>
        )
    )}
    </div>
        </>
    )
}

export default HomePage;