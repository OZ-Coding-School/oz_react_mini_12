import data from '../assets/data/movieListData.json';
import { MovieCard } from './MovieCard';

function HomePage() {
    
    
    return (
        <>
        <div className='movie-list'>
        {data.results.map((movie) => (

            <MovieCard
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